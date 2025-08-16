import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';
import { UserRole } from '../common/enums/user-role.enum';
import { User } from '../users/entities/user.entity'; // Import User entity
import { Car } from '../cars/entities/car.entity'; // Import Car entity

interface CurrentUser {
  id: number;
  role: UserRole;
}

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async create(createRatingDto: CreateRatingDto, userId: number) {
    const { carId, rating, review } = createRatingDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const car = await this.carRepository.findOne({ where: { id: carId } });
    if (!car) {
      throw new NotFoundException(`Car with ID ${carId} not found`);
    }

    const newRating = this.ratingRepository.create({
      user,
      car,
      rating,
      review
    });

    return this.ratingRepository.save(newRating);
  }

  findAll() {
    return this.ratingRepository.find({
      relations: ['user', 'car'],
    });
  }

  findOne(id: number) {
    return this.ratingRepository.findOne({
      where: { id },
      relations: ['user', 'car'],
    });
  }

  async update(id: number, updateRatingDto: UpdateRatingDto, currentUser: CurrentUser) {
    const rating = await this.ratingRepository.findOne({ where: { id } });
    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }

    const isOwner = rating.userId === currentUser.id;

    if (!isOwner) {
      throw new ForbiddenException('You are not allowed to change this rating')
    }

    await this.ratingRepository.update(id, updateRatingDto)
    return this.findOne(id)
  }

  async remove(id: number, currentUser: CurrentUser) {
    const rating = await this.ratingRepository.findOne({ where: { id } });
    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`)
    }

    const isAdmin = currentUser.role === UserRole.ADMIN || currentUser.role === UserRole.SUPER_ADMIN;
    const isOwner = rating.userId === currentUser.id

    if (!isAdmin && !isOwner) {
      throw new ForbiddenException('You are not allowed to delete this rating');
    }

    return this.ratingRepository.delete(id)
  }
}

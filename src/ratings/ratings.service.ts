import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';
import { UserRole } from '../common/enums/user-role.enum';

interface CurrentUser {
  id: number;
  role: UserRole;
}

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}

  create(createRatingDto: CreateRatingDto) {
    const rating = this.ratingRepository.create(createRatingDto);
    return this.ratingRepository.save(rating);
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

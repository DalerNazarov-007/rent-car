import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../common/enums/user-role.enum';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

async create(createCarDto: CreateCarDto, currentUser: User) {
  if (currentUser.role !== UserRole.ARENDATOR) {
    throw new ForbiddenException('Only users with ARENDATOR role can create cars')
  }

  const car = this.carRepository.create({
    ...createCarDto,
    owner: currentUser
  });

  return this.carRepository.save(car);
}


  findAll() {
    return this.carRepository.find({
      relations: ['category', 'owner', 'rentalHistories', 'ratings'],
    });
  }

  findOne(id: number) {
    return this.carRepository.findOne({
      where: { id },
      relations: ['category', 'owner', 'rentalHistories', 'ratings'],
    });
  }

 async update(id: number, updateCarDto: UpdateCarDto, currentUser: User) {
  const car = await this.carRepository.findOne({ where: { id }, relations: ['owner'] });

  if (!car) {
    throw new NotFoundException(`Car with ID ${id} not found`)
  }

  if (car.owner.id !== currentUser.id) {
    throw new ForbiddenException('You are not allowed to update this car');
  }

  Object.assign(car, updateCarDto);
  return this.carRepository.save(car);
}


  async remove(id: number, currentUser: User) {
  const car = await this.carRepository.findOne({ where: { id }, relations: ['owner'] });

  if (!car) {
    throw new NotFoundException(`Car with ID ${id} not found`);
  }

  const isOwner = car.owner.id === currentUser.id;
  const isAdmin = currentUser.role === UserRole.ADMIN || currentUser.role === UserRole.SUPER_ADMIN;

  if (!isOwner && !isAdmin) {
    throw new ForbiddenException('You are not allowed to delete this car')
  }

  await this.carRepository.remove(car);
  return { message: 'Car deleted successfully' }
}
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Car } from './entities/car.entity';
import { Category } from '../categories/entities/category.entity';
import { Rating } from '../ratings/entities/rating.entity';
import { User } from '../users/entities/user.entity';
import { RentalHistory } from 'src/rental-history/entities/rental-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Category, RentalHistory, Rating, User])],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}

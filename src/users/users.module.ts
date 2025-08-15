import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Rating } from '../ratings/entities/rating.entity';
import { RentalHistory } from 'src/rental-history/entities/rental-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, RentalHistory, Rating])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

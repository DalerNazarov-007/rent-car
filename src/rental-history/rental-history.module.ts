import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalHistory } from './entities/rental-history.entity';
import { RentalHistoryService } from './rental-history.service';
import { RentalHistoryController } from './rental-history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RentalHistory])],
  controllers: [RentalHistoryController],
  providers: [RentalHistoryService],
})
export class RentalHistoryModule {}

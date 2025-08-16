import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RentalHistory } from './entities/rental-history.entity';
import { CreateRentalHistoryDto } from './dto/create-rental-history.dto';
import { UpdateRentalHistoryDto } from './dto/update-rental-history.dto';

@Injectable()
export class RentalHistoryService {
  constructor(
    @InjectRepository(RentalHistory)
    private readonly rentalHistoryRepo: Repository<RentalHistory>,
  ) {}

  async create(createDto: CreateRentalHistoryDto) {
    const rental = this.rentalHistoryRepo.create(createDto);
    return await this.rentalHistoryRepo.save(rental);
  }

  async findAll() {
    return await this.rentalHistoryRepo.find({
      relations: ['user', 'car'],
    });
  }

  async update(id: number, updateDto: UpdateRentalHistoryDto) {
    const rental = await this.rentalHistoryRepo.findOne({ where: { id } });
    if (!rental) throw new NotFoundException('Rental history not found');

    Object.assign(rental, updateDto);
    return await this.rentalHistoryRepo.save(rental);
  }

  async remove(id: number) {
    const rental = await this.rentalHistoryRepo.findOne({ where: { id } });
    if (!rental) throw new NotFoundException('Rental history not found');

    await this.rentalHistoryRepo.remove(rental);
    return { message: 'Rental history deleted successfully' };
  }
}

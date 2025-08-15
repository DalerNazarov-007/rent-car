import { PartialType } from '@nestjs/swagger';
import { CreateRentalHistoryDto } from './create-rental-history.dto';

export class UpdateRentalHistoryDto extends PartialType(CreateRentalHistoryDto) {}

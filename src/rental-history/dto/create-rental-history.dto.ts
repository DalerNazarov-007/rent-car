import { IsNotEmpty, IsDateString, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRentalHistoryDto {
  @ApiProperty({ description: 'The ID of the car.', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  carId: number;
  
  @ApiProperty({ description: 'The ID of the user who is renting the car.', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  userId: number;

  @ApiProperty({ description: 'The start date of the rental period.', example: '2023-10-26' })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: 'The end date of the rental period.', example: '2023-10-29' })
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @ApiProperty({ description: 'The total price', example: 150.00 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;
}
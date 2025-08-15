import { IsString, IsNumber, IsOptional, IsBoolean, Min, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty({ description: 'Car brand', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  brand: string;

  @ApiProperty({ description: 'Car model', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  model: string;

  @ApiProperty({ description: 'Car year', maxLength: 20 })
  @IsString()
  @MaxLength(20)
  year: string;

  @ApiProperty({ description: 'License plate', maxLength: 20 })
  @IsString()
  @MaxLength(20)
  licensePlate: string;

  @ApiProperty({ description: 'Daily rental rate' })
  @IsNumber()
  @Min(0)
  dailyRate: number;

  @ApiProperty({ description: 'Car description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Car availability status', default: true })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiProperty({ description: 'Car color', required: false, maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  color?: string;

  @ApiProperty({ description: 'Fuel type', required: false, maxLength: 20 })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  fuelType?: string;

  @ApiProperty({ description: 'Car mileage', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  mileage?: number;

  @ApiProperty({ description: 'Category ID' })
  @IsNumber()
  categoryId: number;

  @ApiProperty({ description: 'Owner ID (User ID)' })
  @IsNumber()
  ownerId: number;
}

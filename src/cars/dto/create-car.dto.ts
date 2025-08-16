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

  @ApiProperty({ description: 'Car renting price per day' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Car description'})
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Car availability status', default: true })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiProperty({ description: 'Car color'})
  @IsOptional()
  @IsString()
  @MaxLength(50)
  color?: string;

  @ApiProperty({ description: 'Fuel type'})
  @IsOptional()
  @IsString()
  @MaxLength(20)
  fuelType?: string;

  @ApiProperty({ description: 'Car mileage'})
  @IsOptional()
  @IsNumber()
  @Min(0)
  mileage?: number;

  @ApiProperty({ description: 'Category ID' })
  @IsNumber()
  categoryId: number;
}

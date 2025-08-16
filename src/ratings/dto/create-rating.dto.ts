import { IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRatingDto {
  @ApiProperty({ description: 'Rating value (1-5)', minimum: 1, maximum: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ description: 'Review text'})
  @IsOptional()
  @IsString()
  review?: string;

  @ApiProperty({ description: 'Car ID' })
  @IsNumber()
  carId: number;
}

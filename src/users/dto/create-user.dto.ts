import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User first name', minLength: 2 })
  @IsString()
  @MinLength(2)
  firstname: string;

  @ApiProperty({ description: 'User last name', minLength: 2 })
  @IsString()
  @MinLength(2)
  lastname: string;

  @ApiProperty({ description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { UserRole } from 'src/common/enums/user-role.enum';

interface RequestWithUser {
  user: { id: number; role: UserRole };
}

@ApiTags('Ratings')
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}
  @ApiBearerAuth('access-token')
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: RequestWithUser, @Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.create(createRatingDto, req.user.id)
  }

  @Get()
  findAll() {
    return this.ratingsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingsService.findOne(+id)
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto, @Req() req: RequestWithUser) {
    return this.ratingsService.update(+id, updateRatingDto, req.user);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.ratingsService.remove(+id, req.user)
  }
}

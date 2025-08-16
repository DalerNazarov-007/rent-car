import { Controller, Get, Post, Body, UseGuards, Param, Patch, Delete } from '@nestjs/common';
import { RentalHistoryService } from './rental-history.service';
import { CreateRentalHistoryDto } from './dto/create-rental-history.dto';
import { UpdateRentalHistoryDto } from './dto/update-rental-history.dto';
import { UserRole } from 'src/common/enums/user-role.enum';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/decorators/role.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('rental-history')
export class RentalHistoryController {
  constructor(private readonly rentalHistoryService: RentalHistoryService) {}

  @ApiBearerAuth('access-token')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDto: CreateRentalHistoryDto) {
    return this.rentalHistoryService.create(createDto);
  }

  @ApiBearerAuth('access-token')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.rentalHistoryService.findAll();
  }

  @ApiBearerAuth('access-token')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateRentalHistoryDto,
  ) {
    return this.rentalHistoryService.update(+id, updateDto);
  }

  @ApiBearerAuth('access-token',)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentalHistoryService.remove(+id);
  }
}

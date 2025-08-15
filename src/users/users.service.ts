import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { UserRole } from 'src/common/enums/user-role.enum';

interface JwtUser {
  id: number;
  role: UserRole;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto){
    const user = this.userRepository.create(dto);
    user.password = await hash(user.password, 10);
    return this.userRepository.save(user);
  }

  async createArendator(dto: CreateUserDto){
    const user = this.userRepository.create({
      ...dto,
      role: UserRole.ARENDATOR,
    });
    user.password = await hash(user.password, 10);
    return this.userRepository.save(user);
  }

  async createAdmin(createUserDto: CreateUserDto) {
    const hashedPassword = await hash(createUserDto.password, 10);

    const newAdmin = this.userRepository.create({
      ...createUserDto,
      role: UserRole.ADMIN,
      password: hashedPassword,
    })

    return this.userRepository.save(newAdmin);
  }

  async findAll() {
    return this.userRepository.find({
      relations: ['cars', 'ratings', 'rentalHistories'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['cars', 'ratings', 'rentalHistories'],
    })
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } })
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.userRepository.delete(id)
  }
}

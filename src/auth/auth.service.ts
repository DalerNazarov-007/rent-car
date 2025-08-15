import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import type { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { UserRole } from 'src/common/enums/user-role.enum';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CurrentUser } from './types/current-user';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not Found!');
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return { id: user.id, email: user.email };
  }

  login(userId: number, userRole: UserRole) {
    const payload: AuthJwtPayload = { sub: userId, role: userRole };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig);

    return {
      accessToken: token,
      refreshToken,
      userId: userId,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already in use!');
    }
    const newUser = await this.userService.create(createUserDto);
    return this.login(newUser.id, newUser.role);
  }

  async registerArendator(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already in use!');
    }
    const newUser = await this.userService.createArendator(createUserDto);
    return this.login(newUser.id, newUser.role);
  }

  refreshToken(userId: number, userRole: UserRole) {
    const payload: AuthJwtPayload = { sub: userId, role: userRole };
    const token = this.jwtService.sign(payload);

    return {
      userId: userId,
      accessToken: token,
    };
  }

  async validateJwtUser(userId: number) {
    console.log('AuthService - Validating JWT user with ID:', userId); // Debug log
    const user = await this.userService.findOne(userId);
    if (!user) {
      console.log('AuthService - User not found for ID:', userId); // Debug log
      throw new UnauthorizedException('User not found');
    }
    console.log('AuthService - User found:', { id: user.id, role: user.role }); // Debug log
    const currentUser: CurrentUser = { id: user.id, role: user.role };
    return currentUser;
  }
}

import { Body, Controller, HttpCode, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole } from 'src/common/enums/user-role.enum';
import { LoginDto } from './dto/login.dto';


interface RequestWithUser extends Request {
  user: { id: number; role: UserRole };
}

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('register-arendator')
  async registerArendator(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerArendator(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(LocalAuthGuard)
  login(@Body() loginDto: LoginDto, @Request() req: RequestWithUser) {
  const user = req.user;
  return this.authService.login(user.id, user.role);
  }


  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Req() req: RequestWithUser) {
    const user = req.user;
    return this.authService.refreshToken(user.id, user.role);
  }
}

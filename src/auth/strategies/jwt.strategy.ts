import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { AuthService } from '../auth.service';
import { AuthJwtPayload } from '../types/auth-jwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwtconfig: ConfigType<typeof jwtConfig>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtconfig.secret,
      ignoreExpiration: false,
    });

    if (!jwtconfig.secret) {
      throw new Error('JWT secret is not defined');
    }
  }

  async validate(payload: AuthJwtPayload) {
    console.log('JWT Strategy - Payload received:', payload); // Debug log
    const userId = payload.sub;
    const user = await this.authService.validateJwtUser(userId);
    console.log('JWT Strategy - User validated:', user); // Debug log
    return user;
  }
}

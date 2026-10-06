import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: any) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: any) {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  refreshToken(@Body('refreshTokenId') refreshTokenId: number) {
    return this.authService.refreshToken(refreshTokenId);
  }
}

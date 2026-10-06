import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'my-super-secret-key',
      signOptions: { expiresIn: '15m' }, // Short lived access token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

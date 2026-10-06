import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(data: any) {
    if (!data.username || !data.password || !data.email) {
      throw new BadRequestException('Username, email, and password are required.');
    }

    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });

    if (existingUser) {
      throw new BadRequestException('Username or email already exists.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
    });

    return { message: 'User registered successfully', userId: user.id };
  }

  async login(data: any) {
    const user: any = await this.prisma.user.findUnique({
      where: { username: data.username },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);

    // Generate refresh token string
    const refreshTokenString = crypto.randomBytes(64).toString('hex');
    
    // Set expiration to 7 days
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const refreshToken: any = await (this.prisma as any).refreshToken.create({
      data: {
        token: refreshTokenString,
        userId: user.id,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshTokenId: refreshToken.id,
    };
  }

  async refreshToken(refreshTokenId: number) {
    const refreshTokenRecord: any = await (this.prisma as any).refreshToken.findUnique({
      where: { id: refreshTokenId },
      include: { user: true },
    });

    if (!refreshTokenRecord) {
      throw new UnauthorizedException('Invalid refresh token id');
    }

    if (new Date() > refreshTokenRecord.expiresAt) {
      // Clean up expired token
      await (this.prisma as any).refreshToken.delete({ where: { id: refreshTokenId } });
      throw new UnauthorizedException('Refresh token has expired');
    }

    // Generate new access token
    const payload = { sub: refreshTokenRecord.userId, username: refreshTokenRecord.user.username };
    const newAccessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken: newAccessToken,
    };
  }
}

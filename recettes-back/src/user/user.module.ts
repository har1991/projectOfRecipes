import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Basic } from './passport/passport-basic.strategy';
import { JwtStrategy } from './strategy/passport-jwt.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import * as dotenv from 'dotenv';
dotenv.config()


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule.register({ defaultStrategy: 'basic' }),
  JwtModule.register({
    secret: process.env.SECRET,
    signOptions: { expiresIn: '3600s' },

  })],
  controllers: [UserController],
  providers: [UserService, Basic, JwtStrategy],
  
})
export class UserModule { }

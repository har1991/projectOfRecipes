
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm/dist';
import { UserEntity } from '../entities/user.entity';
import { Payloads } from '../interfaces/payloads';
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      private configService : ConfigService,
      @InjectRepository(UserEntity)
      private user_repositry : Repository<UserEntity> ) {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET'),
      
    });
    //console.log('hello strategy');
  }

  async validate(payload: Payloads ) {
    
      const user = await  this.user_repositry.findOne({name:payload.name })
      
    if (user) {
      //console.log("user strategy name :",user.name);
        const {password , ...result} = user;

        return  result ;
        }
        else {
          //console.log("sorry you have no permission")
            throw new UnauthorizedException() ;
    
  }
}
}
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy } from 'passport-http';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';


@Injectable()
export class Basic extends PassportStrategy(BasicStrategy) {
    constructor(private user_service: UserService) {
        super({ session: false });
    }
    async validate(name: string, password: string) {
        const user = await this.user_service.validate_user(name, password);
        console.log(user);
        return user;
    }
}
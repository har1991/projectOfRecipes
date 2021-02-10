import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './userDto';

import { AddUserDto } from './addUserDto';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private user_repositry: Repository<UserEntity>,
        private jwtService: JwtService,
    ) { }

    async get_users(): Promise<UserEntity[]> {
        return await this.user_repositry.find({relations:["role"]})
    }

    async get_user_by_id(id: number): Promise<UserEntity> {
        const user = await this.user_repositry.findOne(id,{ relations: ["role"] })
        if (!user) {
            throw new NotFoundException(`Sorry  user with  id :${id}  is not exist`);
        }
        return user;
    }

    async add_user( add_user :  AddUserDto) {
        console.log(add_user)
        add_user.password = await hash(add_user.password, 10);
        return await this.user_repositry.save(add_user);
        

       
    }

    async validate_user(validate_name, valiate_password) {
        const user = await this.user_repositry.findOne({ name: validate_name });
        if (!user || !(await compare(valiate_password, user.password))) {
            throw new UnauthorizedException();
        }
        return user

    }
    async login(user) {
        const payload = { name: user.name, id: user.id, email: user.email };
        const jwt = await this.jwtService.sign(payload)

        return {
            "access_token": jwt
        };
    }

    async delete_user(id: number) {
        const user = await this.get_user_by_id(id);
        return await this.user_repositry.remove(user);
    }

    async update_user(id: number, user: UserDto) {
        const update_user = await this.user_repositry.preload({
            id,
            ...user
        })
        if (!update_user) {
            throw new NotFoundException(`User with id  :${id} is not exist `);
        }
        else {
            update_user.password = await hash(update_user.password, 10)

            return await this.user_repositry.save(update_user);

        }

    }


}

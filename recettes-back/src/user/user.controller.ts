import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/role/role-guarde';
import { Roles } from 'src/role/role.decorator';
import { AddUserDto } from './addUserDto';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-user.guards';

import { BasicUserGuard } from './passport/passport-basic.guards';

import { ReqUser } from './user.decorator';
import { UserService } from './user.service';
import { UserDto } from './userDto';

@Controller('user')
export class UserController {
    constructor(private user_service: UserService) { }

    @UseGuards(BasicUserGuard)
    @Get('login')
    async login(@ReqUser() user) {
        return this.user_service.login(user);
    }
    
    //@UseGuards(JwtAuthGuard ,RolesGuard)
    //@Roles('admin')
    @Get()
    async get_users(): Promise<UserEntity[]> {
        return this.user_service.get_users();
    }
    @Get(':id')
    async get_user_by_id(
        @Param('id', ParseIntPipe)id:number) :Promise<UserEntity>{
        return await this.user_service.get_user_by_id(id)   
    }

  
    @Post('register')
    subscribe(@Body() user :AddUserDto) {
        console.log(user)
        return this.user_service.add_user(user);
        
    }

    @Delete(':id')
    delete_user(@Param('id', ParseIntPipe) id: number) {
        return this.user_service.delete_user(id);
    }

    @Patch(':id')
    async update_user(
        @Body() update_user: UserDto,
        @Param('id', ParseIntPipe) id: number) {
            console.log(update_user)
        return await this.user_service.update_user(id, update_user);
    }
}

import {IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
import { RoleEntity } from 'src/role/entities/role.entity';
import { Transform } from "class-transformer";
import { FavoriteEntity } from 'src/favorite/entities/favorite.entity';

export class AddUserDto{
  
    name: string;

    password : string ;

 
    email: string;

    role : Partial<RoleEntity>;
    
    @IsOptional()
    @Transform(favoriteIds=>favoriteIds.map(id => ({
        id 
    })))
    favorite :FavoriteEntity[];

    
}
import {IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
import { RoleEntity } from 'src/role/entities/role.entity';
import { Transform } from "class-transformer";
import { FavoriteEntity } from 'src/favorite/entities/favorite.entity';
import { StarsEntity } from 'src/stars/entities/stars.entity';
export class UserDto{
    id: number ; 

    @IsNotEmpty()
    @IsString()
   
    name: string;

    @IsNotEmpty()
    @IsString()
    
    password : string ;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    role: Partial<RoleEntity>;
    
    @IsOptional()
    @Transform(favoriteIds=>favoriteIds.map(id => ({
        id 
    })))
    favorite :FavoriteEntity[];

    recipes_id : number[] ;
}
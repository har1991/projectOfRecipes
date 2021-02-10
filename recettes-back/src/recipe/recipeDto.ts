import {IsDate, IsNotEmpty,  IsNumber,  IsOptional,  IsString } from 'class-validator';
import { RecipeEnumDifficulty } from 'src/enums/difficulty-enum';
import { FavoriteEntity } from 'src/favorite/entities/favorite.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export class RecipeDto{
    
    id: number ; 

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    time_preparation: number;

    @IsNotEmpty()
    @IsNumber()
    time_cocking: number;

    difficulty: RecipeEnumDifficulty;

    private: boolean;

    waiting_for_validation: boolean;

    published : boolean ;


    primary_photo_id : number ; 
    @IsOptional()
    user_id : Partial<UserEntity>
    image_ids : number[] ;
    like_count : number ; 
    favorite :FavoriteEntity[];

    
}
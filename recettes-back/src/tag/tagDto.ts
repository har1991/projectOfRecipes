import {IsDate, IsNotEmpty, IsString } from 'class-validator';
import { RecipeEntity } from 'src/recipe/entities/recipe.entity';
export class TagDto{
    id: number ; 

    @IsNotEmpty()
    @IsString()
    name : string ; 
    
    recipe : RecipeEntity[];
}
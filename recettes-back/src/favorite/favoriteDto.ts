import { RecipeEntity } from "src/recipe/entities/recipe.entity";
import { RecipeDto } from "src/recipe/recipeDto";
import { UserEntity } from "src/user/entities/user.entity";
import { Column } from "typeorm";

export class FavoriteDto{
    id: number ; 
    time ?: Date  ; 
    recipes: RecipeEntity;
    user_id : number ;
    
    
}
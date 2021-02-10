import { RecipeEntity } from "src/recipe/entities/recipe.entity";
import { RecipeDto } from "src/recipe/recipeDto";
import { UserEntity } from "src/user/entities/user.entity";

export class AddFavoriteDto{
    id: number ; 
    time ?: Date  ; 
    recipe_id: Partial<RecipeEntity>;
    user_id : Partial<UserEntity>
    
    
}
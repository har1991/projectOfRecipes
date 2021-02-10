import { Recipe } from '../recipes-list/recipeDto/recipe';
import { RecipeDto } from '../recipes-list/recipeDto/recipeDto';
import { UserDto } from '../userDto/userDto';

export interface GetFavoriteDto {
    id: number ; 
    time ?: Date  ; 
    recipe_id: Recipe;
    user_id : UserDto
}
import { Recipe } from '../recipes-list/recipeDto/recipe';
import { RecipeDto } from '../recipes-list/recipeDto/recipeDto';

export interface TagDto {
    id : number ,
    name : string ;
    recipe: Recipe[]

   

}
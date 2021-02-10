import { Recipe } from '../recipes-list/recipeDto/recipe';

export interface TagGetDtoRecipes {
    id : number
    name : string ;
    recipe: Recipe[]; 

}
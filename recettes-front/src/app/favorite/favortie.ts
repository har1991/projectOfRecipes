import { Time } from '@angular/common';
import { Recipe } from '../recipes-list/recipeDto/recipe';
import { RecipeDto } from '../recipes-list/recipeDto/recipeDto';
import { AddFavoriteDto } from './AddFavoriteDto';
import { GetFavoriteDto } from './getFavoriteDto';

export class Favorite {

    constructor(
        public id : number,
        public recipes : Recipe,
        public user_id : number,
        public time ? : Date){
 
    }
/* toDto() : FavoriteDto{
     return {
         id : this.id ,
         time : this.time ,
         recipe_id : this.recipes.map((recipe)=>recipe.id) ,
         user_id :this.user_id 
     }
 }*/
 static fromDb(resultDto: GetFavoriteDto) : Favorite {
     return new Favorite(resultDto.id ,resultDto.recipe_id, resultDto.user_id.id , resultDto.time );
 }
 
 }
import {Pipe , PipeTransform} from '@angular/core'
import { Recipe } from '../recipes-list/recipeDto/recipe';

@Pipe ({
    name : 'search' 
})
export class SearchPipe implements PipeTransform {
    transform(recipes: Recipe[], name:string , result:string): any {
       
        if(!result)
         
         return recipes.filter( str => {
            return str[name].toLowerCase().includes(result.toLowerCase());
          });
     }
      }

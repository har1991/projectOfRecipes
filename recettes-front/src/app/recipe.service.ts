import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './recipes-list/recipeDto/recipe';
import { RecipeDto } from './recipes-list/recipeDto/recipeDto';
import { map } from 'rxjs/operators';
import { RecipeGetDto } from './recipes-list/recipeDto/recipeGetDto';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) {}




  get_recipes():Observable<Recipe[]>{
    return this.http.get<RecipeGetDto[]>(`http://localhost:9999/recipe`).pipe(
      map((recipeDto:RecipeGetDto[])=>{
        return recipeDto.map((recipeDto:RecipeGetDto)=> Recipe.fromDb(recipeDto));
      }), 
    )
  }
  get_recipes_by_name(name : string ):Observable <Recipe[]>{
    return this.http.get<RecipeGetDto[]>(`http://localhost:9999/recipe/byname?recipename=${name}`).pipe(
      map((recipe_dto:RecipeGetDto[])=>{
        return recipe_dto.map((recipeDto:RecipeGetDto)=>Recipe.fromDb(recipeDto))
      })
    )
  }
  get_recipes_by_page(current_page : number):Observable<{recipes:Recipe[],total:number}>{
    console.log(current_page);
    return this.http.get<{data:RecipeGetDto[],total : number}>(`http://localhost:9999/recipe/perpage/${current_page}`).pipe(
      map(({data:recipeDto ,total})=>{
        return {
          recipes: recipeDto.map((recipeDto:RecipeGetDto)=> Recipe.fromDb(recipeDto)),
        total
        };
      }), 
    )
  }
  get_recipe_id(id:number) : Observable<Recipe>{
    return this.http.get<RecipeGetDto>(`http://localhost:9999/recipe/${id}`).pipe(
      map((recipe_dto : RecipeGetDto)=>{
        
        return Recipe.fromDb(recipe_dto)
      })
    )
  }
  add_recipe(recipe:RecipeDto): Observable<Recipe> {
    return this.http.post<RecipeGetDto>(`http://localhost:9999/recipe`,recipe).pipe(
      map((recipe_dto:RecipeGetDto)=>{
        return Recipe.fromDb(recipe_dto);
      })
    )
  }
  delete_recipe(recipe : Recipe):Observable<{}>{
    return this.http.delete<{}>(`http://localhost:9999/recipe/${recipe.id}`);
  }

  update_recipe(recipe : RecipeDto) : Observable<Recipe>{
    return this.http.patch<RecipeDto>(`http://localhost:9999/recipe/${recipe.id}`,recipe).pipe(
      map((recipe_get_dto:RecipeGetDto)=>{
        return Recipe.fromDb(recipe_get_dto)
      })
    )
  }
}

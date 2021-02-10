import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, flatMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AddFavoriteDto } from '../favorite/AddFavoriteDto';
import { Favorite } from '../favorite/favortie';
import { FavoritesService } from '../favorites.service';
import { LoginService } from '../login.service';
import { RecipeService } from '../recipe.service';
import { Recipe } from './recipeDto/recipe';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  public data :string;
  public current_page : number ;
  public total_recipes : number ;
  public recipes_per_page: number = 12 ;
  public number_of_pages : number = 0; 
  public recipes : Recipe[];
  public user_id : string ;
  public favorite :  AddFavoriteDto ;  
  public favorite_ids : number[] = [];
  public favorites_recipes : Favorite[];
  public recipes_by_name : Recipe[] ;
  public search_input = new FormControl("") ; 


  constructor( private recipe_service : RecipeService,
    public login_service : LoginService ,
    public favorite_service : FavoritesService,
    private route_activate : ActivatedRoute,
    private router: Router ,
    ){ 
      this.initialize_search_bar();
      this.route_activate.paramMap.pipe(
        map( (params: Params) => {
          if (params.get("id")){
            this.current_page= params.get("id");
          }
          else {
            this.current_page = 1 ;
          }
          return this.current_page ;
        }),
        mergeMap((current_page : number)=>{
          return this.get_recipes(current_page)
        })
      ).subscribe(console.log);
      this.user_id =this.login_service.get_user_id();
      this.favorite_service.get_my_favorites(Number(this.user_id)).subscribe((favorites)=>{
        this.favorites_recipes = favorites 
      });
        
    }

    ngOnInit(): void {}

    click_on_page(current_page :number){
      this.router.navigate(["recipesList/",current_page]) ;
    }

    private get_recipes(recipe_page : number){
      return this.recipe_service.get_recipes_by_page(recipe_page).pipe(
        tap(({recipes, total}) => {
          this.recipes = recipes ;
          this.total_recipes= total;
          this.number_of_pages = Math.ceil(total/this.recipes_per_page);
        })
      )
    }
    
    like(recipe: Recipe){
      const {id : recipe_id , favorites} = recipe ; 
      let user_favorite = this.user_favorite(favorites)
      
        if (user_favorite){
          this.favorite_service.delete_favorite(user_favorite.id).subscribe(()=>{
            recipe.favorites = favorites.filter((f)=>
            f.id != user_favorite.id 
            )
          });
         
        }
        else {
          let favorite : AddFavoriteDto = {
            id : 0 ,
            recipe_id ,
            user_id : Number(this.user_id)
          };
          
          this.favorite_service.add_favorite(favorite).subscribe((favorite)=> {
         
          recipe.favorites.push(favorite);
          console.log(recipe)
          console.log(favorite);
        })
        }
    }
    user_favorite(favorites : Favorite[]){
      return favorites.find((fav)=>
      fav.user_id == Number(this.user_id))
    }
    
    initialize_search_bar(){
      console.log("name",name)
      this.search_input.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((search_term )=>
          this.recipe_service.get_recipes_by_name(search_term)
        )
      ).subscribe((found_recipes)=>
          this.recipes_by_name = found_recipes
        )
    }

    logout(){
      this.login_service.logout();
      this.router.navigate([""]);
    }
    logoutGoole(){
      this.login_service.logout();
      
    }
    is_logged(){
      this.login_service.isLogged()
    }
    
       
}

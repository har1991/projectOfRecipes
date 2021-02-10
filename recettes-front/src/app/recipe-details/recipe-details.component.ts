import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes-list/recipeDto/recipe';
import { RecipeDto } from '../recipes-list/recipeDto/recipeDto';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
recipe_id : number ;
recipe : Recipe ;
active = 0 ;
recipes_by_tag :Recipe[] ;
@Input()recipe_details : Recipe ;
  constructor(public router :Router,  
    public recipe_service : RecipeService ,
    public tags_service : TagService,
    private route_activate : ActivatedRoute) {
      this.route_activate.paramMap.pipe(mergeMap((params)=>{
        this.recipe_id = Number(params.get('id'));
        this.recipe_service.get_recipe_id(this.recipe_id).subscribe((data)=>
         this.recipe = data);
        return "hello";
      })).subscribe()}
     

  ngOnInit(): void {
  }
  show(){
    
    console.log(this.recipe.name)
    console.log(this.recipe.id)
    console.log(this.recipe)
  }

  set_active(to : string){
    if (to =='previous'){
      console.log("this active before",this.active)

      this.active = this.active == 0 ? this.recipe.images.length -1 : this.active-1 ;
      
      console.log("this active after ",this.active)
    }
    else if (to =='next'){
      console.log("this active before",this.active)
      console.log("recipe image length",this.recipe.images.length)

      this.active= (this.active+1)% this.recipe.images.length ;

      console.log("this active now",this.active)
    }
  }

  show_tag_recipes(tag_id){
    this.tags_service.get_tag_by_id(tag_id).subscribe((tag)=>
      this.recipes_by_tag = tag.recipe)
  }

}

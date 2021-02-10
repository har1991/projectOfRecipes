import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRecipeOrUpdateComponent } from './create-recipe-or-update/create-recipe-or-update.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { LoginGuard } from './guards/login.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { SingupComponent } from './singup/singup.component';
import { TagsByDetailsComponent } from './tags-by-details/tags-by-details.component';
import { TagsComponent } from './tags/tags.component';


const routes: Routes = [
  {path : "" , component :HomepageComponent },
  {path : "signup" , component :SingupComponent },
  {path : "recipesList" , component :RecipesListComponent , canActivate :[LoginGuard]},
  {path : "recipesList/:id" , component :RecipesListComponent , canActivate :[LoginGuard]},
  {path : "createrecipeorupdate" , component :CreateRecipeOrUpdateComponent , canActivate :[LoginGuard]},
  {path : "recipedetails/:id" , component :RecipeDetailsComponent , canActivate :[LoginGuard]},
  {path : "favoritecomponent" , component :FavoriteComponent , canActivate :[LoginGuard]},
  {path : "tagscomponent" , component :TagsComponent , canActivate :[LoginGuard]},
  {path : "tagsByDetailsComponent/:id" , component :TagsByDetailsComponent , canActivate :[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
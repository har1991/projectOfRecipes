import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SingupComponent } from './singup/singup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { CreateRecipeOrUpdateComponent } from './create-recipe-or-update/create-recipe-or-update.component';
import { MeasuresComponent } from './measures/measures.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { LoginGuard } from './guards/login.guard';

import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from './create-recipe-or-update/search.pipe';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { TagsComponent } from './tags/tags.component';
import { TagsByDetailsComponent } from './tags-by-details/tags-by-details.component';


//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    SingupComponent,
    HomepageComponent,
    RecipesListComponent,
    CreateRecipeOrUpdateComponent,
    MeasuresComponent,
    RecipeDetailsComponent,
    FavoriteComponent ,
    SearchPipe,
    FavoriteListComponent,
    TagsComponent,
    TagsByDetailsComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    NgxPaginationModule
   
    
  ],
  providers: [LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

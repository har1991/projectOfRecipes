import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../favorites.service';
import { LoginService } from '../login.service';
import { Favorite } from './favortie';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  user_id : string ;
  public favorites_recipes : Favorite[];
 

  constructor(
    private login_service : LoginService ,
    private favorite_service : FavoritesService
  ) { 
    this.user_id = this.login_service.get_user_id();
    this.favorite_service.get_my_favorites(Number(this.user_id)).subscribe((favorites)=>{
      this.favorites_recipes = favorites 
    });
  }

  ngOnInit(): void {
  }
 
}

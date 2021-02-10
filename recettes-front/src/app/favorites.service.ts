import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddFavoriteDto } from './favorite/AddFavoriteDto';
import { Favorite } from './favorite/favortie';
import { GetFavoriteDto } from './favorite/getFavoriteDto';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http : HttpClient) {}

  get_my_favorites(user_id:number):Observable<Favorite[]>{
    
    return this.http.get<GetFavoriteDto[]>(`http://localhost:9999/favorite/my/${user_id}`).pipe(
      map((favorite_dto:GetFavoriteDto[])=>{
        
        return favorite_dto.map((favorite_dto:GetFavoriteDto)=> Favorite.fromDb(favorite_dto));
      }), 
    )
  }
  add_favorite(favorite:AddFavoriteDto): Observable<Favorite> {
    console.log(favorite)
    return this.http.post<GetFavoriteDto>(`http://localhost:9999/favorite`,favorite).pipe(
      map((favorite_dto:GetFavoriteDto)=>{
        console.log("in service",favorite_dto)
        return Favorite.fromDb(favorite_dto);
      })
    )
  }

  delete_favorite(favorite_id : number):Observable<{}>{
    console.log(favorite_id)
    return this.http.delete<{}>(`http://localhost:9999/favorite/${favorite_id}`);
  }
  
   
}

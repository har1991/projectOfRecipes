import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './userDto/user';
import { UserDto } from './userDto/userDto';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  get_users():Observable<User[]>{
    return this.http.get<UserDto[]>(`http://localhost:9999/user`).pipe(
      map((user_dto:UserDto[])=>{
        return user_dto.map((user_dto:UserDto)=> User.fromDb(user_dto));
      }), 
    )
  }
   
  get_user_by_id(id:number) : Observable<User>{
    return this.http.get<UserDto>(`http://localhost:9999/user/${id}`).pipe(
      map((user_dto : UserDto)=>{
        return User.fromDb(user_dto)
      })
    )
  }
  add_user(user:UserDto): Observable<User> {
    console.log(user)
    return this.http.post<UserDto>(`http://localhost:9999/user/register`,user).pipe(
      map((user_dto:UserDto)=>{
        return User.fromDb(user_dto);
      })
    )
  }
  delete_user(user : User):Observable<{}>{
    return this.http.delete<{}>(`http://localhost:9999/user/${user.id}`);
  }
}

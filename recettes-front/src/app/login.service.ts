import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserLoginDto } from './userDto/userLoginDto';
import { JwtHelperService } from "@auth0/angular-jwt";
import { encode } from 'js-base64';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  token
    : {
      name: string;
      role: string;
      email: string;
      id: string
    }
  tokenNotDecoded: string;

  constructor(private http: HttpClient) { }


  login(credentials: UserLoginDto) {
    const helper = new JwtHelperService();

    let send = encode(credentials.name + ":" + credentials.password);
    console.log("name",credentials.name ,"password",credentials.password )
    return this.http.get<{ username: string, access_token: string }>(`http://localhost:9999/user/login`, { headers: { Authorization: 'Basic ' + send } }).pipe(
      tap(user => {
        const decodedToken = helper.decodeToken(user.access_token);
        this.token = decodedToken;
        localStorage.setItem('token', user.access_token)
        localStorage.setItem('role', this.token.role),
        localStorage.setItem('name' ,this.token.name),
        localStorage.setItem('id',this.token.id)
      
      })
    )
  }
  get_user_id(){
    return   localStorage.getItem('id');
  }
  isLogged(){
    
    return !! localStorage.getItem('token');
  }
  logout(){
    return localStorage.removeItem('token')
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recettes-front';
  constructor(public login_service : LoginService,
    private router : Router){
      
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

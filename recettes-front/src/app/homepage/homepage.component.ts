import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public loginForm: FormGroup;
  public showErrorMessage: boolean = false;
  current_page = 1 
  constructor(public login_service:LoginService,
    private formBuilder: FormBuilder, 
    private routeur: Router) { 
      this.loginForm = formBuilder.group({
        name : formBuilder.control(''),
        password : formBuilder.control('')
    })
  }

  ngOnInit(): void {
  }
  onSubmitForm(){
    let login_to_send = {
      name: this.loginForm.controls.name.value,
      password: this.loginForm.controls.password.value
    }
  this.login_service.login(login_to_send).subscribe(
    answer => this.routeur.navigate(["recipesList/",1]) , 
    error => {this.showErrorMessage = true
    console.log("Il y a une erreur")}
    );
}

logout(){
  this.login_service.logout();
}

}

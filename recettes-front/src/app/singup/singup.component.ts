import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserDto } from '../userDto/userDto';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  public userForm: FormGroup ;
  public user  : UserDto;
  public idUser: number ;
  constructor(public user_service : UserService ,public router :Router, private form_builder: FormBuilder , 
    private route_activate : ActivatedRoute) {
      this.userForm= this.form_builder.group({
        name : form_builder.control('',[Validators.required]),
        password : form_builder.control('',[Validators.required]),
        email : form_builder.control('',[Validators.required])
     })
    }

  ngOnInit(): void {
  }
  add_user(){
    console.log("Event is here" , this.userForm.value) ;
      if(this.userForm.valid){
        console.log("valide");
        this.user = {...this.userForm.value, id:0}
        
        this.user_service.add_user(this.user).subscribe();
        
        
      }
      else{
        console.log("pas valide")
  
      }
  }

}

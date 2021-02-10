import {  UserDto } from './userDto';


export class User {

   constructor(
        public id : number,
        public name : string ,
        public email : string,
        public password : string,
        public role : number){

   }
toDto() : UserDto{
    return {
        id : this.id ,
        name : this.name ,
        email : this.email ,
        password :this.password ,
        role : this.role

    }
}
static fromDb(resultDto: {id : number ,name:string ,email : string ,password: string , role ?:number}) : User {
    return new User(resultDto.id,resultDto.name ,resultDto.email, resultDto.password , resultDto.role );
}

}
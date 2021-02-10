import {IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class starsDto{
    id: number ; 

    @IsNotEmpty()
    @IsNumber()
    amount : number 
}
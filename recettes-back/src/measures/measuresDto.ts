import { IsNotEmpty, IsString } from 'class-validator';

export class MeasuresDto{
    
    id: number ; 
    
    @IsNotEmpty()
    @IsString()
    name : string ; 
}
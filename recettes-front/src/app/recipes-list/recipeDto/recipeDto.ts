import { GetFavoriteDto } from 'src/app/favorite/getFavoriteDto';
import { TagDto } from 'src/app/tagDto/tagDto';


export interface RecipeDto {
    
    id : number ,
    name : string ;
    description: string;
    time_preparation: number;
    time_cocking: number;
    difficulty : string ;
    privateOrNot: boolean;
    waiting_for_validation: boolean;
    published : boolean ;
    primary_photo_id : number ; 
    user_id : number
    image_ids ?: number[]; 
    like_count ?: number ;
    tags:TagDto[]
    

}
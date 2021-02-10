import { GetFavoriteDto } from 'src/app/favorite/getFavoriteDto';
import { ImageDto } from 'src/app/imageDto';
import { TagDto } from 'src/app/tagDto/tagDto';

export interface RecipeGetDto {
    id : number
    name : string ;
    description: string;
    time_preparation: number;
    time_cocking: number;
    difficulty : string ;
    privateOrNot: boolean;
    waiting_for_validation: boolean;
    published : boolean ;
    primary_photo_id : number ; 
    user_id : number ;
    tags : TagDto[]
    images : ImageDto[]; 
    like_count ?: number ;
    favorites : GetFavoriteDto []

}
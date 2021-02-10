import { Favorite } from 'src/app/favorite/favortie';
import { ImageDto } from 'src/app/imageDto';
import { TagDto } from 'src/app/tagDto/tagDto';
import { RecipeDto } from './recipeDto';
import { RecipeGetDto } from './recipeGetDto';


export class Recipe {

    constructor(public id: number,
        public name: string,
        public description: string,
        public time_preparation: number,
        public time_cocking: number,
        public difficulty: string,
        public privateOrNot: boolean,
        public waiting_for_validation: boolean,
        public published: boolean,
        public primary_photo_id : number , 
        public user_id : number ,
        public tags : TagDto[],
        public images ? : ImageDto[],
        public like_count ?: number ,
        public favorites ?: Favorite[],
        
    ) {

    }
    toDto(): RecipeDto {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            time_preparation: this.time_preparation,
            time_cocking: this.time_cocking,
            difficulty: this.difficulty,
            privateOrNot: this.privateOrNot,
            waiting_for_validation: this.waiting_for_validation,
            published: this.published,
            primary_photo_id : this.primary_photo_id ,
            user_id : this.user_id,
            tags :this.tags,
            image_ids  : this.images.map((image)=>image.id),
            like_count : this.like_count ,
            




        }
    }
    static fromDb(resultDto: RecipeGetDto): Recipe {
        return new Recipe(
            resultDto.id,
            resultDto.name,
            resultDto.description,
            resultDto.time_preparation,
            resultDto.time_cocking,
            resultDto.difficulty,
            resultDto.privateOrNot,
            resultDto.waiting_for_validation,
            resultDto.published,
            resultDto.primary_photo_id ,
            resultDto.user_id ,
            resultDto.tags,
            resultDto.images ,
            resultDto.like_count ,
            resultDto.favorites?resultDto.favorites.map((favorite)=> Favorite.fromDb(favorite)):[]
           


            //resultDto.tags.map((tagDto:TagsDto) => Tag.fromDto(tagDto))
        );
    }

}
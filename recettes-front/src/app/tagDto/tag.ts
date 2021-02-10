import { Recipe } from '../recipes-list/recipeDto/recipe';
import { RecipeDto } from '../recipes-list/recipeDto/recipeDto';
import { TagDto } from './tagDto';
import { TagGetDto } from './TagGetDto';

export class Tag {

    constructor(
        public id: number,
        public name: string,
        public recipe: Recipe[],
         
    ) {

    }
    // toDto(): TagDto {
    //     return {
    //         id: this.id,
    //         name: this.name,
    //         recipe: this.recipe,
    //     }
    // }
    static fromDb(resultDto: TagGetDto): Tag {
        return new Tag(
            resultDto.id,
            resultDto.name,
            resultDto.recipe 
            //resultDto.tags.map((tagDto:TagsDto) => Tag.fromDto(tagDto))
);
    }
 
}
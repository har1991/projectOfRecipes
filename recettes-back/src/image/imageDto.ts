import { RecipeEntity } from "src/recipe/entities/recipe.entity";


export class ImageDto{
    id: number ; 
    recipe : Partial<RecipeEntity>; 
    name : string ; 
}
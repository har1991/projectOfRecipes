import { RecipeEntity } from "src/recipe/entities/recipe.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('recipe_book')
export class RecipeBookEntity {
    @PrimaryGeneratedColumn()
    id : number ;
    @ManyToOne(
        type => RecipeEntity,
        (recipe) => recipe.recipe_book)
        @JoinColumn()
    recipe: RecipeEntity;

    @ManyToOne(
        type => UserEntity,
        (users) => users.recipe_book)
        @JoinColumn()
    user: UserEntity;
    
}

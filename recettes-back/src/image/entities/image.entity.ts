import { RecipeEntity } from "src/recipe/entities/recipe.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('image')
export class ImageEntity {
    @PrimaryGeneratedColumn()
    id : number ;
    @Column()
    name : string;

    @ManyToOne(
        type => RecipeEntity,
        (recipe) => recipe.images, {
            onDelete : "CASCADE" 
        }
        )
        @JoinColumn()
    recipe: RecipeEntity;
/*
    @OneToOne(
        type => RecipeEntity,
        (recipe) => recipe.image,

        )

        recipe_image : RecipeEntity;
        */

}

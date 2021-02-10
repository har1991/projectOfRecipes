import { RecipeEntity } from "src/recipe/entities/recipe.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tag')
export class TagEntity {
    @PrimaryGeneratedColumn()
    id : number ;
    @Column()
    name : string ;
    @ManyToMany(type => RecipeEntity,recipe=> recipe.tags)     
    @JoinTable()
    recipe : RecipeEntity[] ;
}

import { LineIngredientEntity } from "src/line-ingredient/entities/line-ingredient.entity";
import { RecipeEntity } from "src/recipe/entities/recipe.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('ingredient')
export class IngredientEntity {
    @PrimaryGeneratedColumn()
    id : number ;

    @Column({length : 50})
    name : string ;
    
    @Column()
    validated : boolean ;

    @Column()
    lipids : number ;

    @Column()
    calories : number ;

    @Column()
    protens: number

    @Column()
    carbohydrates : number;


    @OneToMany(type => LineIngredientEntity,
        (line_ingerdient) => line_ingerdient)

    line_ingerdient: LineIngredientEntity;

}

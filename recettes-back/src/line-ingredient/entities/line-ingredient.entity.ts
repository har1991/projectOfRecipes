import { IngredientEntity } from "src/ingredient/entities/ingredient.entity";
import { MeasuresEntity } from "src/measures/entities/measures.entity";
import { RecipeEntity } from "src/recipe/entities/recipe.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('line_ingredient')
export class LineIngredientEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    quantity: number;

    @ManyToOne(
        type => RecipeEntity,
        (recipe) => recipe.line_engriedient)
    @JoinColumn()
    recipe: RecipeEntity;

    @ManyToOne(
        type => IngredientEntity,
        (ingredient) => ingredient.line_ingerdient)
    @JoinColumn()
    ingredient: IngredientEntity;


    @ManyToOne(
        type => MeasuresEntity,
        (measures) => measures.line_ingredient)
    @JoinColumn()
    measures: MeasuresEntity;
}

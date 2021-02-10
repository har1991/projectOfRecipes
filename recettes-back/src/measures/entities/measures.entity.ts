import { LineIngredientEntity } from "src/line-ingredient/entities/line-ingredient.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('measures')
export class MeasuresEntity {
    @PrimaryGeneratedColumn()
    id : number ;
    @Column()
    name : string ; 

    @OneToMany(type => LineIngredientEntity,
        (line_ingredient) => line_ingredient.measures)

    line_ingredient: LineIngredientEntity;
}

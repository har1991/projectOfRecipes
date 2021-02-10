import { RecipeEntity } from "src/recipe/entities/recipe.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('stars')
export class StarsEntity {
    @PrimaryGeneratedColumn()
    id : number ;
    @Column()
    amount : number ; 
    @ManyToOne(
        type => UserEntity,
        (users) => users.stars)
        @JoinColumn()
    users: UserEntity;
    @ManyToOne(
        type => RecipeEntity,
        (recipes) => recipes.stars)
        @JoinColumn()
        recipes: RecipeEntity; 

}

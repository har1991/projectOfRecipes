import { RecipeEntity } from "src/recipe/entities/recipe.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('favorite')
export class FavoriteEntity {
    @PrimaryGeneratedColumn()
    id : number ;
    
    @Column({nullable : true})
    time : Date  ; 
   
        
    
    @ManyToOne(
        type => RecipeEntity,
        (recipe) => recipe.favorites,
        {
            eager : true,
            onDelete : "CASCADE" 
        })
        @JoinColumn()
        recipe_id: RecipeEntity;

    @ManyToOne(
        type => UserEntity,
        (users) => users.favorites,{
            eager : true
        })
        @JoinColumn()
        user_id: UserEntity;


}

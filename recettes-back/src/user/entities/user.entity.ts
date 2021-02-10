import { FavoriteEntity } from "src/favorite/entities/favorite.entity";
import { RecipeBookEntity } from "src/recipe-book/entities/recipe-book.entity";
import { RecipeEntity } from "src/recipe/entities/recipe.entity";
import { RoleEntity } from "src/role/entities/role.entity";
import { StarsEntity } from "src/stars/entities/stars.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({length :50})
    name: string;
    @Column()
    password: string;
    @Column()
    email: string;
    @ManyToOne( 
        type => RoleEntity,
        (role) => role.users,{
            eager:true ,
        
        
        })
    @JoinColumn()
    role: RoleEntity;

    @OneToMany(type => RecipeEntity,
        (recipes) => recipes.user_id,
        
        
        {
            eager: true , 
            cascade : true ,
            
        })

    recipes: RecipeEntity;

    @OneToMany(type => StarsEntity,
        (stars) => stars.users)

    stars: StarsEntity;

    @OneToMany(type => FavoriteEntity,
        (favorites) => favorites.user_id)

    favorites: FavoriteEntity;

    @OneToMany(type => RecipeBookEntity,
        (recipe_book) => recipe_book)

    recipe_book: RecipeBookEntity;
}

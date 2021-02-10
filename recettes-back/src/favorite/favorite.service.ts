import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddFavoriteDto } from './addFavoriteDto';
import { FavoriteEntity } from './entities/favorite.entity';
//import { FavoriteDto } from './favoriteDto';

@Injectable()
export class FavoriteService {
    constructor(
    @InjectRepository(FavoriteEntity)
        private favorite_repositry: Repository<FavoriteEntity>) { }

        async get_favorites(): Promise<FavoriteEntity[]> {
            return await this.favorite_repositry.query("select  *  from favorite")
                //{ select: ["id", "time" ,"recipe_id"] , relations : ["recipe_id"]})
        }
        async get_favorites_by_user(user_id:number): Promise<FavoriteEntity[]> {
            console.log(await this.favorite_repositry.find({user_id: { id : user_id}}))
            return await this.favorite_repositry.find({user_id: { id : user_id}})
            
          
        }
        async get_favorite_by_id(favorite_id: number): Promise<FavoriteEntity> {
            const favorite = await this.favorite_repositry.findOne(favorite_id)
            console.log(favorite)
            if (!favorite) {
                console.log('there is no recipe')
                throw new NotFoundException(`Sorry favorite with id :${favorite_id} is not exist `);
                
            }
            else {
                console.log('there is a  favorite', favorite)
                return favorite
            }
        }
        async add_favorite(favorite: AddFavoriteDto) {
            console.log('we are in service back',favorite);
            //console.log('our object ',{...recipe, images:[{id:recipe.image_ids}]})
             await this.favorite_repositry.save(favorite);
             return this.favorite_repositry.findOne(favorite.id)
        }
       
        async delete_favorite(favorite_id:number){
            const favorite = await this.get_favorite_by_id(favorite_id);
            return this.favorite_repositry.remove(favorite);
        }

        
}

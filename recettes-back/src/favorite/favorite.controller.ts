import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ReqUser } from 'src/user/user.decorator';
import { AddFavoriteDto } from './addFavoriteDto';

import { FavoriteEntity } from './entities/favorite.entity';
import { FavoriteService } from './favorite.service';
import { FavoriteDto } from './favoriteDto';

@Controller('favorite')
export class FavoriteController {
    constructor(private favorite_service: FavoriteService) { }

    @Get()
    async get_all_favorites(): Promise<FavoriteEntity[]> {
        return this.favorite_service.get_favorites();
    }
    
    @Get("my/:id")
    async get_all_favorites_by_user(@Param('id', ParseIntPipe)id:number): Promise<FavoriteEntity[]> {
        console.log("controller",id)
        
        return this.favorite_service.get_favorites_by_user(id);
    }


    @Get(':id')
    async get_favorite_by_id(
        @Param('id', ParseIntPipe) id: number): Promise<FavoriteEntity> {
        console.log(id)
        return await this.favorite_service.get_favorite_by_id(id)
    }




    @Post()
    async add_favorite(@Body() favorite_dto: AddFavoriteDto): Promise<FavoriteEntity> {
        //console.log(recipe_dto.user_id)
        console.log("we are in the back" , favorite_dto)
        return await this.favorite_service.add_favorite(favorite_dto);


    }

    @Delete(':id')
    delete_favorite(@Param('id', ParseIntPipe) id: number) {
        return this.favorite_service.delete_favorite(id);
    }
}

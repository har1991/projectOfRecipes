import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { RecipeEntity } from './entities/recipe.entity';
import { RecipeService } from './recipe.service';
import { RecipeDto } from './recipeDto';

@Controller('recipe')
export class RecipeController {
    constructor(private recipe_service: RecipeService) { }

  
    @Get('perpage/:pagenumber')
    get_per_page(
        @Param('pagenumber', ParseIntPipe) pagenumber:number)  {
            console.log(pagenumber)
        return this.recipe_service.find_with_page_number(pagenumber);
    }
    
    @Get('byname')
    Index(
        //@Query('pagenumber') pagenumber:number ,
        @Query ('recipename') recipename : string ){
            console.log(recipename)
            console.log("hello")
         return this.recipe_service.get_recipes_by_name(recipename)
        }

    @Get(':id')
    async get_recipe_by_id(
        @Param('id', ParseIntPipe) id: number): Promise<RecipeEntity> {
        console.log(id)
        return await this.recipe_service.get_recipe_by_id(id);
    }


    @Delete(':id')
    delete_recipe(@Param('id', ParseIntPipe) id: number) {
        return this.recipe_service.delete_recipe(id);
    }

    @Post()

    async add_recipe(@Body() recipe_dto:RecipeDto): Promise<RecipeEntity> {
       console.log(recipe_dto.user_id)
        return await this.recipe_service.add_recipe(recipe_dto);
    }

    @Patch(':id')
    async update_recipe(
    @Body() update_recipe:RecipeDto,
    @Param('id',ParseIntPipe)id:number){
        return await this.recipe_service.update_recipe(id ,update_recipe );
    }

    /* 
      @Get()
    async get_all_recipes(query) {
        return this.recipe_service.findAll({
            take:3 ,
            skip : 0
        });

    }
    @Get('page')
    get(@Query(){ take, skip }) {
        return this.recipe_service.findAllPagination(take, skip);
    }*/

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeBookEntity } from 'src/recipe-book/entities/recipe-book.entity';
import { Repository } from 'typeorm';
import { RecipeEntity } from './entities/recipe.entity';
import { RecipeDto } from './recipeDto';

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(RecipeEntity)
        private recipe_repositry: Repository<RecipeEntity>) { }

        async get_recipes_by_name(name:string): Promise<RecipeEntity[]> {
            return await this.recipe_repositry.find({name: name})
        }
        
        async find_with_page_number(page_number:number ):Promise<{data:RecipeEntity[] , total:number}>  {
            //let skip = (page_number- 1) * 2
            //let take =  page_number *2 ;
            let skip = (page_number- 1) * 12
            let take =  12 ;
            console.log(skip,take)
            const [data, total] = await this.recipe_repositry.findAndCount({relations:["favorites"],
                take,
                skip });
            return { data, total };
          }
          
         /* async get_recipes(): Promise<RecipeEntity[]> {
            return await this.recipe_repositry.find()
        }
        async findAllPagination(take: number = 5, skip: number = 0)  {
            const [data, total] = await this.recipe_repositry.findAndCount({ take, skip });
            return { data, total };
          }
        async findAll(query) {
            const take :number = query.take 
            const skip :number = query.skip || 0
            const keyword = query.keyword || ''
        
            const [result, total] = await this.recipe_repositry.findAndCount(
                {
                    
                    take: take,
                    skip: skip
                }
            );
        
            return {
                data: result,
                count: total
            }
        }
        */
        async get_recipe_by_id(recipe_id: number): Promise<RecipeEntity> {
            const recipe = await this.recipe_repositry.findOne(recipe_id)
            console.log(recipe)
            if (!recipe) {
                console.log('there is no recipe')
                throw new NotFoundException(`Sorry recipe with id :${recipe_id} is not exist `);
                
            }
            else {
                console.log('there is a  recipe', recipe)
                return recipe
            }
        }
        async add_recipe(recipe: RecipeDto) {
            
            console.log('our object ',{...recipe, images:[{id:recipe.image_ids}]})
            return await this.recipe_repositry.save({...recipe, images:recipe.image_ids.map((id)=>({
                id}))});
        }
        async delete_recipe(recipe_id: number) {
            const recipe = await this.get_recipe_by_id(recipe_id);
            return await this.recipe_repositry.remove(recipe);
        }
        async update_recipe(id: number, recipe: RecipeDto) {
            const update_recipe = await this.recipe_repositry.preload({  // With (preload) We will get the recipe using it's id and then update  it  
                id,
                ...recipe
            })//verifying whether the recipe we are targeting exist or not
            if (!update_recipe) {
                throw new NotFoundException(`Sorry recipe with id :${id} is not exist `);
            }
            return await this.recipe_repositry.save(update_recipe);
        }
}

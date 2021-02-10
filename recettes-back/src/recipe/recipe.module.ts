import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from './entities/recipe.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  imports : [TypeOrmModule.forFeature([RecipeEntity])],
  controllers: [RecipeController],
  providers: [RecipeService]
})
export class RecipeModule {}

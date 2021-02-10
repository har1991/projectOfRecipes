import { Module } from '@nestjs/common';
import { RecipeBookController } from './recipe-book.controller';
import { RecipeBookService } from './recipe-book.service';

@Module({
  controllers: [RecipeBookController],
  providers: [RecipeBookService]
})
export class RecipeBookModule {}

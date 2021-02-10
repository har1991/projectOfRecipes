import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './role/role.module';
import { RecipeModule } from './recipe/recipe.module';
import { UserModule } from './user/user.module';
import { StarsModule } from './stars/stars.module';
import { TagModule } from './tag/tag.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { ImageModule } from './image/image.module';
import { FavoriteModule } from './favorite/favorite.module';
import { RecipeBookModule } from './recipe-book/recipe-book.module';
import { MeasuresModule } from './measures/measures.module';
import { PermissionModule } from './permission/permission.module';
import * as dotenv from 'dotenv' ;


dotenv.config();

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal : true 
  }),
  
  TypeOrmModule.forRoot({
    type: 'postgres',
       host: process.env.DB_HOST,
       port: parseInt(process.env.DB_PORT) ,
       username: process.env.DB_USERNAME,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_NAME,
       entities: ["dist/**/*.entity{.ts,.js}"],
       synchronize: true,
 }),
  RoleModule,
  RecipeModule,
  UserModule,
  StarsModule,
  TagModule,
  IngredientModule,
  ImageModule,
  FavoriteModule,
  RecipeBookModule,
  MeasuresModule,
  PermissionModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

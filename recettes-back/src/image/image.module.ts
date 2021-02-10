import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer/multer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';


@Module({
  imports:[TypeOrmModule.forFeature([ImageEntity]),MulterModule.register({
    dest: './files',
  })],
  controllers: [ImageController],
  providers: [ImageService]
})
export class ImageModule {}

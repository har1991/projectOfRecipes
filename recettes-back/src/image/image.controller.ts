import { Controller, Delete, Get, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Body, Param, Res, UploadedFiles } from '@nestjs/common/decorators/http/route-params.decorator';
import { AnyFilesInterceptor } from '@nestjs/platform-express/multer/interceptors/any-files.interceptor';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';

import { ImageEntity } from './entities/image.entity';
import { ImageService } from './image.service';
import { ImageDto } from './imageDto';
import { diskStorage } from 'multer';

import { v4 as uuidv4 } from 'uuid';

import * as path from 'path';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';


//import { AnyFilesInterceptor } from '@nestjs/platform-express/multer/interceptors/any-files.interceptor';
//import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';

@Controller('image')
export class ImageController {
    constructor(private readonly image_service: ImageService) { }

    /*  @Post('upload')
      @UseInterceptors(FileInterceptor('image'))
      uploadFile(@UploadedFile() image) {
          console.log('hello all');
        console.log(image);
      }
  */
    /*
        @Post('uploads')
        @UseInterceptors(FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]))
    uploadFiles(@UploadedFiles() files) {
      console.log(files);
    }
    */
    /*
        @Post('upload')
        @UseInterceptors(FileInterceptor('image'))
        uploadFile(@UploadedFiles() file) {
    
            console.log(file);
    
        }
    */
    @Get(':imgpath')
    seeUpoadedFile(@Param('imgpath') image,
        @Res() res) {
        return res.sendFile(image, { root: 'files' });
    }


    @Get(':id')
    async get_image_by_id(
        @Param('id', ParseIntPipe) id: number): Promise<ImageEntity> {
            console.log(id)
        return await this.image_service.get_image_by_id(id)
    }
    @Get()
    async get_all_images(): Promise<ImageEntity[]> {
        return this.image_service.get_images();

    }
    @Post('uploadimage')
    @UseInterceptors(
        FilesInterceptor('file',
        10,
        {
            storage: diskStorage({
            destination: './files',
            filename: (req, file, cb) => {
                console.log(file.originalname);
                console.log(uuidv4());
                const filename: string = path.parse(file.originalname).name
                    .replace(/\s/g, '') + uuidv4();
                const extintion  : string = path.parse(file.originalname).ext ;
                cb(null , `${filename}${extintion}`);
            }

        })}))
    async uploadedFiles(@UploadedFiles() files) {
        
        console.log("files",files)
       /* const response = {
            originalname: files.originalname,
            filename: files.map((filename)=>),
            destination: files.destination
        };
        */
        //return await this.image_service.add_image(files.filename);
        return Promise.all(files.map((file)=> this.image_service.add_image(file.filename)))
    }
    
    @Delete(':id')
    async delete_image(@Param('id', ParseIntPipe)id : number){
        return this.image_service.delete_image(id) ;   
    }
    /*
 

    @Patch(':id')
    async update_image(
        @Body() update_image: ImageDto,
        @Param('id', ParseIntPipe) id: number) {
        console.log('ImageUpdateDto', id, update_image)
        return await this.image_service.update_image(id, update_image);
    }
    /*@Post('uploadimage')
    @UseInterceptors(
        FileInterceptor('file'))
    async uploadedFile(@UploadedFile() file): Promise<ImageEntity> {
        storage: diskStorage({
            destination: './files',
            filename: (req, file, cb) => {
                const filename: string = path.parse(file.originalname).name
                    .replace(/\s/g, '') + uuidv4();
                const extintion  : string = path.parse(file.originalname).ext ;
                cb(null , `${filename}${extintion}`);
            }

        })
        
        const response = {
            originalname: file.originalname,
            filename: file.filename,
            destination: file.destination
        };
        
        return await this.image_service.add_image(file.filename);
    }*/
   /*
    @Post('uploadall')
    @UseInterceptors(FilesInterceptor('file'))
    uploadFile(@UploadedFiles() file) {
      console.log(file);
    }
    
    */
        

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity } from './entities/image.entity';
import { ImageDto } from './imageDto';
import { ImageUpdateDto } from './imageUpdateDto';

@Injectable()
export class ImageService {

    constructor(
        @InjectRepository(ImageEntity)
        private image_repositry: Repository<ImageEntity>) { }

        async get_images(): Promise<ImageEntity[]> {
            return await this.image_repositry.find()
        }
        async get_image_by_id(image_id: number): Promise<ImageEntity> {
            const image = await this.image_repositry.findOne(image_id,{ relations: ["recipe"] })
            if (!image) {
                console.log('there is no Image')
                throw new NotFoundException(`Sorry Imgae with id :${image_id} is not exist `);
                
            }
            else {
                console.log('there is a  image', image)
                return image
            }
        }
        async add_image(name: string) {
            // we user  create because the sva take just entity 
            const name_image = await this.image_repositry.create({name})
            return await this.image_repositry.save(name_image);
        }
        async delete_image(image_id: number) {
            const image = await this.get_image_by_id(image_id);
            return await this.image_repositry.remove(image);
        }

        async update_image(id: number, image: ImageDto) {
            console.log("image in service",image)
        const update_image = await this.image_repositry.preload({  // With (preload) We will get the role using it's id and then update  it  
            id,
            ...image
        })//verifying whether the role we are targeting exist or not
        console.log('update image in service ',update_image)
        if (!update_image) {
            throw new NotFoundException(`Sorry image with id :${id} is not exist `);
        }
        return await this.image_repositry.save(update_image);
    }

}

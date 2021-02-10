import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from './entities/tag.entity';
import { TagDto } from './tagDto';

@Injectable()
export class TagService {
    constructor(
    @InjectRepository(TagEntity)
        private tag_repositry: Repository<TagEntity>) { }
        
        async get_tags(): Promise<TagEntity[]> {
            console.log(await this.tag_repositry.find({relations:["recipe"]}))
            return await this.tag_repositry.find({relations:["recipe"]})
        }
        async get_tag_by_id(tag_id: number): Promise<TagEntity> {
            const tag = await this.tag_repositry.findOne(tag_id,{relations:["recipe"]})
            if (!tag) {
                console.log('there is no tag')
                throw new NotFoundException(`Sorry tag with id :${tag_id} is not exist `);
                
            }
            else {
                console.log('there is a  tag', tag)
                return tag
            }
        }
        async add_tag(tag: TagDto) {
    
            return await this.tag_repositry.save(tag);
        }
        async delete_tag(tag_id: number) {
            const tag = await this.get_tag_by_id(tag_id);
            return await this.tag_repositry.remove(tag);
        }
        async update_tag(id: number, tag: TagDto) {
            const update_tag = await this.tag_repositry.preload({  // With (preload) We will get the tag using it's id and then update  it  
                id,
                ...tag
            })//verifying whether the tag we are targeting exist or not
            if (!update_tag) {
                throw new NotFoundException(`Sorry tag with id :${id} is not exist `);
            }
            return await this.tag_repositry.save(update_tag);
        }
}

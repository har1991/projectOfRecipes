import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TagEntity } from './entities/tag.entity';
import { TagService } from './tag.service';
import { TagDto } from './tagDto';

@Controller('tag')
export class TagController {
    
    constructor(private tag_service: TagService) { }

    @Get()
    async get_all_tags(): Promise<TagDto[]> {
        return this.tag_service.get_tags();

    }


    @Get(':id')
    async get_tag_by_id(
        @Param('id', ParseIntPipe) id: number): Promise<TagEntity> {
        console.log(id)
        return await this.tag_service.get_tag_by_id(id);
    }


    @Delete(':id')
    delete_tag(@Param('id', ParseIntPipe) id: number) {
        return this.tag_service.delete_tag(id);
    }

    @Post()

    async add_tag(@Body() tag_dto: TagDto): Promise<TagEntity> {

        return await this.tag_service.add_tag(tag_dto);
    }

    @Patch(':id')
    async update_tag(
    @Body() update_tag:TagDto,
    @Param('id',ParseIntPipe)id:number){
        return await this.tag_service.update_tag(id ,update_tag );
    }

}

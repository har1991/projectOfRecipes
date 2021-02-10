import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { MeasuresEntity } from './entities/measures.entity';
import { MeasuresService } from './measures.service';
import { MeasuresDto } from './measuresDto';

@Controller('measures')
export class MeasuresController {

    constructor(private measures_service: MeasuresService) { }

    @Get()
    async get_all_measures(): Promise<MeasuresEntity[]> {
        return this.measures_service.get_measures();

    }


    @Get(':id')
    async get_measures_by_id(
        @Param('id', ParseIntPipe) id: number): Promise<MeasuresEntity> {
        console.log(id)
        return await this.measures_service.get_measure_by_id(id);
    }


    @Delete(':id')
    delete_measure(@Param('id', ParseIntPipe) id: number) {
        return this.measures_service.delete_measure(id);
    }

    @Post()

    async add_measure(@Body() measure_dto: MeasuresDto): Promise<MeasuresEntity> {

        return await this.measures_service.add_measure(measure_dto);
    }

    @Patch(':id')
    async update_measure(
    @Body() update_measure:MeasuresDto,
    @Param('id',ParseIntPipe)id:number){
        return await this.measures_service.update_measure(id ,update_measure );
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeasuresEntity } from './entities/measures.entity';
import { MeasuresDto } from './measuresDto';

@Injectable()
export class MeasuresService {
    constructor(
        @InjectRepository(MeasuresEntity)
        private Measures_repositry: Repository<MeasuresEntity>) { }

        async get_measures(): Promise<MeasuresEntity[]> {
            return await this.Measures_repositry.find()
        }
        async get_measure_by_id(measure_id: number): Promise<MeasuresEntity> {
            const measure = await this.Measures_repositry.findOne(measure_id)
            if (!measure) {
                throw new NotFoundException(`Sorry measure with id :${measure_id} is not exist `);
                
            }
            else {
                
                return measure
            }
        }
        async add_measure(measure: MeasuresDto) {
    
            return await this.Measures_repositry.save(measure);
        }
        async delete_measure(measure_id: number) {
            const measure = await this.get_measure_by_id(measure_id);
            return await this.Measures_repositry.remove(measure);
        }
        async update_measure(id: number, measure: MeasuresDto) {
            const update_measure = await this.Measures_repositry.preload({  // With (preload) We will get the measure using it's id and then update  it  
                id,
                ...measure
            })//verifying whether the measure we are targeting exist or not
            if (!update_measure) {
                throw new NotFoundException(`Sorry measure with id :${id} is not exist `);
            }
            return await this.Measures_repositry.save(update_measure);
        }
}

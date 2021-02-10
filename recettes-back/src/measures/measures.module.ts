import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasuresEntity } from './entities/measures.entity';
import { MeasuresController } from './measures.controller';
import { MeasuresService } from './measures.service';

@Module({
  imports : [TypeOrmModule.forFeature([MeasuresEntity])],
  controllers: [MeasuresController],
  providers: [MeasuresService]
})
export class MeasuresModule {}

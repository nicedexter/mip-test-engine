import { Module } from '@nestjs/common';
import { FeaturesService } from 'src/features/features.service'
import { AlgorithmsController } from './algorithms.controller';
import { AlgorithmsService } from './algorithms.service';

@Module({
  controllers: [AlgorithmsController],
  providers: [AlgorithmsService, FeaturesService]
})
export class AlgorithmsModule {}

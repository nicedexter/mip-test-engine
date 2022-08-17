import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeaturesModule } from './features/features.module';
import { AlgorithmsModule } from './algorithms/algorithms.module';

@Module({
  imports: [FeaturesModule, AlgorithmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

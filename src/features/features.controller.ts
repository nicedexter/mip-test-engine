import { Controller, Get } from '@nestjs/common';
import { FeaturesService } from './features.service';

@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Get('/metadata')
  async getFeatures() {
    const data = await this.featuresService.getFeatures();
    
    return data
      .split('\n')[0]
      .split(',')
      .map((h) => h.trim());
  }
}

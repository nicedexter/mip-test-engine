import { Controller, Get } from '@nestjs/common';
import { FeaturesService } from './features.service';

@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Get('/metadata')
  async getFeatures() {
    const { header } = await this.featuresService.getFeatures();

    return header;
  }
}

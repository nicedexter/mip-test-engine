import { Controller, Get, Param } from '@nestjs/common';
import { AlgorithmsService } from './algorithms.service';

@Controller('algorithms')
export class AlgorithmsController {
  constructor(private readonly algorithmsService: AlgorithmsService) {}

  @Get()
  getAlgorithms() {
    return [
      {
        id: 'MULTIPLE_HISTOGRAMS',
        label: 'Histograms',
      },
      {
        id: 'Analytics',
        label: 'Analytics',
      },
      {
        id: 'Linear Regression',
        label: 'Linear Regression',
      },
    ];
  }

  @Get('/histogram/:featureId/:numberOfBins ')
  getHistogram(
    @Param('featureId') featureId: string,
    @Param('numberOfBins') numberOfBins: string,
  ) {
    return this.algorithmsService.getHistogram(featureId, parseInt(numberOfBins, 10));
  }
}

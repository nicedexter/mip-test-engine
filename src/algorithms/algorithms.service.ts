import { Injectable } from '@nestjs/common';
import { FeaturesService } from 'src/features/features.service';
const csv = require('csvtojson');
import * as stats from 'simple-statistics';

@Injectable()
export class AlgorithmsService {
  constructor(private readonly featuresService: FeaturesService) {}

  descriptiveStats(data: any[]) {
    console.log('descriptiveStats of ' + data.length + ' rows');
    console.log('Min: ', stats.min(data));
    console.log('Max: ', stats.max(data));
    console.log('Mean : ', stats.mean(data));
    console.log('Median: ', stats.median(data));
    console.log('Mode: ', stats.mode(data));
    console.log('standardDeviation: ', stats.standardDeviation(data));
  }
  
  round2(n: number) {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }

  histogram(data: any[], numberOfBins: number) {
    const max = stats.max(data);
    const min = stats.min(data);
    const binRange = (max - min) / numberOfBins;

    const bins = new Array(numberOfBins).fill(0);
    data.forEach((x) => {
      // Math.min: put upper bound value in last bin
      bins[Math.min(Math.floor((x - min) / binRange), numberOfBins - 1)]++;
    });

    const categories = bins.map(
      (_x, i) =>
        `${this.round2(min + i * binRange)}-${this.round2(
          min + (i + 1) * binRange,
        )}`,
    );

    return [bins, categories];
  }

  async getHistogram(featureId: string, numberOfBins: number) {
    const features = await this.featuresService.getFeatures();

    return new Promise((resolve, reject) => {
      let statsData: any[] = [];
      csv()
        .fromString(features)
        .on('error', (err: any) => {
          reject(err);
        })
        .on('data', (data: any) => {
          const jsonStr = data.toString('utf8');
          const json = JSON.parse(jsonStr);
          const n = parseFloat(json[featureId]);
          if (!isNaN(n)) {
            statsData.push(n);
          }
        })
        .on('done', (error: any) => {
          const h = this.histogram(statsData, numberOfBins);

          if (h.length > 0) {
            resolve(h);
          } else {
            reject('No data found');
          }
        });
    });
  }
}

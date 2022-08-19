import { Injectable } from '@nestjs/common';
import { FeaturesService } from 'src/features/features.service';
import * as stats from 'simple-statistics';

@Injectable()
export class AlgorithmsService {
  constructor(private readonly featuresService: FeaturesService) {}

  private descriptiveStats(data: any[]) {
    const nextData = data
      .filter((element: any) => !isNaN(parseFloat(element)))
      .map((element: any) => parseFloat(element));

    return nextData.length > 0
      ? {
          count: data.length,
          mean: this.round2(stats.mean(nextData)),
          median: this.round2(stats.median(nextData)),
          mode: this.round2(stats.mode(nextData)),
          variance: this.round2(stats.variance(nextData)),
          standardDeviation: this.round2(stats.standardDeviation(nextData)),
          min: this.round2(stats.min(nextData)),
          max: this.round2(stats.max(nextData)),
        }
      : {
          count: data.length,
        };
  }

  private round2(n: number) {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }

  private histogram(data: any[], numberOfBins: number) {
    if (data.length === 0) {
      return [];
    }

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

  async getDescriptiveStats(featureIds: string[]) {
    const { data } = await this.featuresService.getFeatures();

    return Promise.resolve(
      featureIds.map((featureId) =>
        this.descriptiveStats(data.map((element: any) => element[featureId])),
      ),
    );
  }

  async getHistogram(featureId: string, numberOfBins: number) {
    const { data } = await this.featuresService.getFeatures();

    return new Promise((resolve, reject) => {
      const statsData = data
        .filter((element: any) => !isNaN(parseFloat(element[featureId])))
        .map((element: any) => parseFloat(element[featureId]));

      resolve(this.histogram(statsData, numberOfBins));
    });
  }

  // https://blog.oliverjumpertz.dev/simple-linear-regression-theory-math-and-implementation-in-javascript
  linearRegression(inputArray: any[], xLabel: string, yLabel: string) {
    const x = inputArray.map((element) => element[xLabel]);
    const y = inputArray.map((element) => element[yLabel]);
    const sumX = x.reduce((prev, curr) => prev + curr, 0);
    const avgX = sumX / x.length;
    const xDifferencesToAverage = x.map((value) => avgX - value);
    const xDifferencesToAverageSquared = xDifferencesToAverage.map(
      (value) => value ** 2,
    );
    const SSxx = xDifferencesToAverageSquared.reduce(
      (prev, curr) => prev + curr,
      0,
    );
    const sumY = y.reduce((prev, curr) => prev + curr, 0);
    const avgY = sumY / y.length;
    const yDifferencesToAverage = y.map((value) => avgY - value);
    const xAndYDifferencesMultiplied = xDifferencesToAverage.map(
      (curr, index) => curr * yDifferencesToAverage[index],
    );
    const SSxy = xAndYDifferencesMultiplied.reduce(
      (prev, curr) => prev + curr,
      0,
    );
    const slope = SSxy / SSxx;
    const intercept = avgY - slope * avgX;

    return (x: number) => intercept + slope * x;
  }

  getLinearRegression() {
    const inputArray = [
      {
        squareMeters: 200,
        priceInDollars: 190000,
      },
      {
        squareMeters: 100,
        priceInDollars: 90000,
      },
      {
        squareMeters: 115,
        priceInDollars: 120000,
      },
      {
        squareMeters: 150,
        priceInDollars: 140000,
      },
      {
        squareMeters: 140,
        priceInDollars: 125000,
      },
    ];

    const linReg = this.linearRegression(
      inputArray,
      'squareMeters',
      'priceInDollars',
    );
    console.log(linReg(100)); // => 94666.38513513515
  }
}

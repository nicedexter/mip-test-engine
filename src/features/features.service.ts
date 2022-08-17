import { Injectable } from '@nestjs/common';
import { readFile } from 'fs';
import { resolve } from 'path';

@Injectable()
export class FeaturesService {
  filePath: string;

  constructor() {
    this.filePath = resolve(
      __dirname,
      './../../shared/assets/LifeExpectancyData.csv',
    );
  }

  async getFeatures(): Promise<string> {

    return new Promise((resolv, reject) => {
      readFile(this.filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        }

        resolv(data);
      });
    });
  }
}

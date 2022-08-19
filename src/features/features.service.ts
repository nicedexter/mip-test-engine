import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import * as csv from 'csvtojson';
@Injectable()
export class FeaturesService {
  filePath: string;

  constructor() {
    this.filePath = resolve(
      __dirname,
      './../../shared/assets/LifeExpectancyData.csv',
    );
  }

  async getFeatures(): Promise<{
    header: string[];
    data: Record<string, string>[];
  }> {
    return new Promise((resolv, reject) => {
      let header: any;
      csv()
        .fromFile(this.filePath)
        .on('header', (headerArr: any) => {
          header = headerArr;
        })
        .on('error', (err: any) => {
          console.log(err);
          reject(err);
        })
        .then((jsonObj: any) => {
          resolv({ header, data: jsonObj });
        });
    });
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { AlgorithmsService } from './algorithms.service';

describe('AlgorithmsService', () => {
  let service: AlgorithmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlgorithmsService],
    }).compile();

    service = module.get<AlgorithmsService>(AlgorithmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

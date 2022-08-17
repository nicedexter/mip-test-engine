import { Test, TestingModule } from '@nestjs/testing';
import { AlgorithmsController } from './algorithms.controller';

describe('AlgorithmsController', () => {
  let controller: AlgorithmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlgorithmsController],
    }).compile();

    controller = module.get<AlgorithmsController>(AlgorithmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SWAPIService } from './films.service';

describe('FilmsService', () => {
  let service: SWAPIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SWAPIService],
    }).compile();

    service = module.get<SWAPIService>(SWAPIService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

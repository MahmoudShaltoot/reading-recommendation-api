import { Test, TestingModule } from '@nestjs/testing';
import { UsersReadBookService } from './users-read-book.service';

describe('UsersReadBookService', () => {
  let service: UsersReadBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersReadBookService],
    }).compile();

    service = module.get<UsersReadBookService>(UsersReadBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsersReadBookController } from './users-read-book.controller';
import { UsersReadBookService } from './users-read-book.service';

describe('UsersReadBookController', () => {
  let controller: UsersReadBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersReadBookController],
      providers: [UsersReadBookService],
    }).compile();

    controller = module.get<UsersReadBookController>(UsersReadBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

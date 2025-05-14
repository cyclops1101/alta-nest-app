import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserFactory } from '@/user/user.factory';
import { createPrismaResourceMock } from '../../test/utils/prisma.mock';

const userFactory = new UserFactory();
const mockUsers = userFactory.createMany(5);
const mockUser = mockUsers[0];

const db = createPrismaResourceMock(mockUsers);

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: db,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

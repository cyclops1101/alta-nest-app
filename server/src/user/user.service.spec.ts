import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '@/prisma.service';
import { User } from '@/generated-client';
import { UserFactory } from '@/user/user.factory';
import { createPrismaResourceMock } from '../../test/utils/prisma.mock';

const userFactory = new UserFactory();
const mockUsers: User[] = userFactory.createMany(5);

const mockPrisma = createPrismaResourceMock(mockUsers);

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

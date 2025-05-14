import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { mockBcrypt } from '../../test/utils/brcypt.mock';
import { User } from '@/generated-client';
import { UserFactory } from '@/user/user.factory';

describe('AuthService', () => {
  const userFactory = new UserFactory();
  let service: AuthService;
  let userService: Partial<UserService>;
  let jwtService: Partial<JwtService>;
  let mockUser: User;

  beforeEach(async () => {
    mockUser = userFactory.create({
      password: await bcrypt.hash('hashed-password', 12),
    });
    userService = {
      findByEmail: jest.fn(),
    };
    jwtService = {
      signAsync: jest.fn(),
    };

    mockBcrypt({});
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('returns access token for valid credentials', async () => {
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue('mockToken');

    const result = await service.login(mockUser.email!, 'hashed-password');

    expect(result).toEqual({ access_token: 'mockToken' });
    expect(userService.findByEmail).toHaveBeenCalledWith(mockUser.email!);
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: mockUser.id,
      username: mockUser.email,
    });
  });

  it('throws UnauthorizedException if user is not found', async () => {
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);

    await expect(service.login('test@example.com', 'password')).rejects.toThrow(
      UnauthorizedException,
    );
    expect(userService.findByEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('throws UnauthorizedException if password is not set', async () => {
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser);

    await expect(service.login('test@example.com', 'password')).rejects.toThrow(
      UnauthorizedException,
    );
    expect(userService.findByEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('throws UnauthorizedException for invalid password', async () => {
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser);
    mockBcrypt({ compare: false });

    await expect(
      service.login('test@example.com', 'wrongPassword'),
    ).rejects.toThrow(UnauthorizedException);
    expect(userService.findByEmail).toHaveBeenCalledWith('test@example.com');
  });
});

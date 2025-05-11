import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let userService: Partial<UserService>;
  let jwtService: Partial<JwtService>;
  const mockUser = {
    id: 1,
    email: 'test@example.com',
    password: 'hashedPassword',
    name: 'Test User',
    created_at: new Date(),
    updated_at: new Date(),
  };
  beforeEach(async () => {
    userService = {
      findByEmail: jest.fn(),
    };
    jwtService = {
      signAsync: jest.fn(),
    };

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

    const result = await service.login('test@example.com', 'password');

    expect(result).toEqual({ access_token: 'mockToken' });
    expect(userService.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword');
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: 1,
      username: 'test@example.com',
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

    await expect(
      service.login('test@example.com', 'wrongPassword'),
    ).rejects.toThrow(UnauthorizedException);
    expect(userService.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(bcrypt.compare).toHaveBeenCalledWith(
      'wrongPassword',
      'hashedPassword',
    );
  });
});

import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    authService = {
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('returns access token for valid login credentials', async () => {
    const mockToken = { access_token: 'mockToken' };
    jest.spyOn(authService, 'login').mockResolvedValue(mockToken);

    const result = await controller.login({
      email: 'test@example.com',
      password: 'password',
    });

    expect(result).toEqual(mockToken);
    expect(authService.login).toHaveBeenCalledWith(
      'test@example.com',
      'password',
    );
  });

  it('throws UnauthorizedException for invalid login credentials', async () => {
    jest
      .spyOn(authService, 'login')
      .mockRejectedValue(new UnauthorizedException());

    await expect(
      controller.login({
        email: 'invalid@example.com',
        password: 'wrongPassword',
      }),
    ).rejects.toThrow(UnauthorizedException);
    expect(authService.login).toHaveBeenCalledWith(
      'invalid@example.com',
      'wrongPassword',
    );
  });
});

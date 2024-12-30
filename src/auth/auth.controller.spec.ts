import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    const createUserDto: CreateUserDto = { username: 'testuser', password: 'testpass' };
    const result = { id: 1, ...createUserDto };
    jest.spyOn(service, 'register').mockResolvedValue(result);

    expect(await controller.register(createUserDto)).toEqual(result);
  });

  it('should login a user', async () => {
    const loginUserDto: LoginUserDto = { username: 'testuser', password: 'testpass' };
    const result = { access_token: 'someAccessToken' };
    jest.spyOn(service, 'login').mockResolvedValue(result);

    expect(await controller.login(loginUserDto)).toEqual(result);
  });

  it('should handle registration errors', async () => {
    const createUserDto: CreateUserDto = { username: 'testuser', password: 'testpass' };
    const error = new Error('Registration failed');
    jest.spyOn(service, 'register').mockRejectedValue(error);

    await expect(controller.register(createUserDto)).rejects.toThrow('Registration failed');
  });

  it('should handle login errors', async () => {
    const loginUserDto: LoginUserDto = { username: 'testuser', password: 'testpass' };
    const error = new Error('Login failed');
    jest.spyOn(service, 'login').mockRejectedValue(error);

    await expect(controller.login(loginUserDto)).rejects.toThrow('Login failed');
  });

  it('should return null if login credentials are invalid', async () => {
    const loginUserDto: LoginUserDto = { username: 'invaliduser', password: 'invalidpass' };
    jest.spyOn(service, 'login').mockResolvedValue({ access_token: '' });

    expect(await controller.login(loginUserDto)).toBeNull();
  });

  it('should use LoginUserDto correctly in login method', async () => {
    const loginUserDto: LoginUserDto = { username: 'testuser', password: 'testpass' };
    const result = { access_token: 'someAccessToken' };
    jest.spyOn(service, 'login').mockResolvedValue(result);

    const response = await controller.login(loginUserDto);
    expect(response).toEqual(result);
    expect(service.login).toHaveBeenCalledWith(loginUserDto);
  });

  // ...additional tests for login method...
});

// ...existing code...

beforeEach(async () => {
  // ...existing setup code...
});

// ...existing code...

import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { User } from '../users/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user', async () => {
    const createUserDto: CreateUserDto = { username: 'testuser', password: 'testpass' };
    const result: User = { id: 1, ...createUserDto };
    jest.spyOn(usersService, 'create').mockResolvedValue(result);

    expect(await service.register(createUserDto)).toEqual(result);
  });

  it('should login a user', async () => {
    const loginUserDto: LoginUserDto = { username: 'testuser', password: 'testpass' };
    const user: User = { id: 1, username: 'testuser', password: 'testpass' };
    const token = 'testtoken';

    jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
    jest.spyOn(jwtService, 'sign').mockReturnValue(token);

    expect(await service.login(loginUserDto)).toEqual({ access_token: token });
  });

  it('should validate a user', async () => {
    const loginUserDto: LoginUserDto = { username: 'testuser', password: 'testpass' };
    const user: User = { id: 1, username: 'testuser', password: 'testpass' };

    jest.spyOn(usersService, 'findOne').mockResolvedValue(user);

    expect(await service.validateUser(loginUserDto)).toEqual({ id: 1, username: 'testuser' });
  });

  it('should return null if user validation fails', async () => {
    const loginUserDto: LoginUserDto = { username: 'testuser', password: 'wrongpass' };
    const user: User = { id: 1, username: 'testuser', password: 'testpass' };

    jest.spyOn(usersService, 'findOne').mockResolvedValue(user);

    expect(await service.validateUser(loginUserDto)).toBeNull();
  });

  // ...additional tests for validateUser and login methods...
});
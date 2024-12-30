import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully registered.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @ApiOperation({ summary: 'Login a user' })
    @ApiResponse({ status: 200, description: 'The user has been successfully logged in.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }
}
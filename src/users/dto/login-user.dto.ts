import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    password: string;
}

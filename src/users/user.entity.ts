import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
    id: number;

    @Column()
    @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
    username: string;

    @Column()
    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    password: string;
}

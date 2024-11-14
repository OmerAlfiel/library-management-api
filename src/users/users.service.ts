import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.usersRepository.findOne({ 
            where: { username: createUserDto.username } 
        });

        if (existingUser) {
            throw new ConflictException('User with the same username already exists');
        }

        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }

    async findOne(username: string): Promise<User | undefined> {
        const user = await this.usersRepository.findOne({ where: { username } });
        return user ?? undefined;
    }

    async findOneById(id: number): Promise<User | undefined> {
        const user = await this.usersRepository.findOne({ where: { id } });
        return user ?? undefined;
    }
}


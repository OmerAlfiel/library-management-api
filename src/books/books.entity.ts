import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The auto-generated id of the book' })
    id: number;

    @Column({ unique: true })
    @ApiProperty({ description: 'The title of the book' })
    title: string;

    @Column({ unique: true })
    @ApiProperty({ description: 'The author of the book' })
    author: string;

    @Column()
    @ApiProperty({ description: 'The description of the book' })
    description: string;

    @Column()
    @ApiProperty({ description: 'The publication date of the book' })
    publicationDate: Date;

    @Column()
    @ApiProperty({ description: 'The category of the book' })
    category: string;
}


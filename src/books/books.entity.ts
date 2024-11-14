import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    title: string;

    @Column({ unique: true })
    author: string;

    @Column()
    description: string;

    @Column()
    publicationDate: Date;

    @Column()
    category: string;
}


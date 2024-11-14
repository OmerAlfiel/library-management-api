import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Book } from './books.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const existingBook = await this.booksRepository.findOne({ 
      where: { 
        title: createBookDto.title, 
        author: createBookDto.author 
      } 
    });

    if (existingBook) {
      throw new ConflictException('Book with the same title and author already exists');
    }

    const book = this.booksRepository.create(createBookDto);
    return this.booksRepository.save(book);
  }

  async findAll(page: number = 1, limit: number = 10, category?: string, author?: string): Promise<Book[]> {
    const options: FindManyOptions<Book> = {
      skip: (page - 1) * limit,
      take: limit,
      where: {},
    };

    if (category) {
      options.where = { ...options.where, category };
    }

    if (author) {
      options.where = { ...options.where, author };
    }

    return this.booksRepository.find(options);
  }

  async findByTitle(title: string): Promise<Book[]> {
    return this.booksRepository.find({ where: { title } });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    await this.booksRepository.update(id, updateBookDto);
    const updatedBook = await this.booksRepository.findOneBy({ id });
    if (!updatedBook) {
      throw new NotFoundException('Book not found');
    }
    return updatedBook;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.booksRepository.delete(id);
  }
}

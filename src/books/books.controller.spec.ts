import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './books.entity';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a book', async () => {
    const createBookDto: CreateBookDto = { title: 'Test Book', author: 'Test Author', description: 'Test Description', publicationDate: new Date(), category: 'Test Category' };
    const result: Book = { id: 1, ...createBookDto };
    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(createBookDto)).toEqual(result);
  });

  it('should update a book', async () => {
    const updateBookDto: UpdateBookDto = { title: 'Updated Test Book', author: 'Updated Test Author', description: 'Updated Test Description', publicationDate: new Date(), category: 'Updated Test Category' };
    const result: Book = { id: 1, title: updateBookDto.title!, author: updateBookDto.author!, description: updateBookDto.description!, publicationDate: updateBookDto.publicationDate!, category: updateBookDto.category! };
    jest.spyOn(service, 'update').mockResolvedValue(result);

    expect(await controller.update(1, updateBookDto)).toEqual(result);
  });

  it('should find all books', async () => {
    const result: Book[] = [{ id: 1, title: 'Test Book', author: 'Test Author', description: 'Test Description', publicationDate: new Date(), category: 'Test Category' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll(1, 10)).toEqual(result);
  });

  it('should find one book by id', async () => {
    const result: Book = { id: 1, title: 'Test Book', author: 'Test Author', description: 'Test Description', publicationDate: new Date(), category: 'Test Category' };
    jest.spyOn(service, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne(1)).toEqual(result);
  });

  it('should remove a book', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove(1)).toBeUndefined();
  });

  // ...additional tests for findAll, findOne, update, and remove methods...
});
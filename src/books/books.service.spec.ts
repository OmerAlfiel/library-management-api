import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksService } from './books.service';
import { Book } from './books.entity';
import { CreateBookDto } from './dto/create-book.dto';


describe('BooksService', () => {
  let service: BooksService;
  let repository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repository = module.get<Repository<Book>>(getRepositoryToken(Book));

    jest.spyOn(repository, 'create').mockImplementation((entity) => ({ id: Date.now(), ...entity } as Book));
    jest.spyOn(repository, 'update').mockImplementation(() => Promise.resolve({ affected: 1, raw: [], generatedMaps: [] }));
    jest.spyOn(repository, 'findOneBy').mockImplementation(() => Promise.resolve({ id: 1, title: 'Test Book', author: 'Test Author', description: 'Test Description', publicationDate: new Date(), category: 'Test Category' } as Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a book', async () => {
    const createBookDto: CreateBookDto = { title: 'Test Book', author: 'Test Author', description: 'Test Description', publicationDate: new Date(), category: 'Test Category' };
    const savedBook: Book = { id: 1, ...createBookDto };

    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    jest.spyOn(repository, 'save').mockResolvedValue(savedBook);

    expect(await service.create(createBookDto)).toEqual(savedBook);
  });

  it('should update a book', async () => {
    const updateBookDto = { title: 'Updated Test Book', author: 'Updated Test Author', category: 'Updated Test Category', description: 'Updated Test Description' };
    const updatedBook = { id: 1, ...updateBookDto, publicationDate: new Date() };

    jest.spyOn(repository, 'save').mockImplementation((book) => Promise.resolve({ ...book, ...updateBookDto } as Book));

    expect(await service.update(1, updateBookDto)).toEqual(updatedBook);
  });

  it('should find all books', async () => {
    const books: Book[] = [
      { id: 1, title: 'Test Book 1', author: 'Test Author 1', description: 'Test Description 1', publicationDate: new Date(), category: 'Test Category 1' },
      { id: 2, title: 'Test Book 2', author: 'Test Author 2', description: 'Test Description 2', publicationDate: new Date(), category: 'Test Category 2' },
    ];

    jest.spyOn(repository, 'find').mockResolvedValue(books);

    expect(await service.findAll()).toEqual(books);
  });

  it('should find one book by id', async () => {
    const book: Book = { id: 1, title: 'Test Book', author: 'Test Author', description: 'Test Description', publicationDate: new Date(), category: 'Test Category' };

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(book);

    expect(await service.findOne(1)).toEqual(book);
  });

  it('should remove a book by id', async () => {
    const book: Book = { id: 1, title: 'Test Book', author: 'Test Author', description: 'Test Description', publicationDate: new Date(), category: 'Test Category' };

    jest.spyOn(service, 'findOne').mockResolvedValue(book);
    jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1, raw: [] });

    await service.remove(1);

    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });

 
});
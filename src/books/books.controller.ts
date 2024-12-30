import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, NotFoundException, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './books.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'The book has been successfully created.', type: Book })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @ApiOperation({ summary: 'Get a list of books' })
  @ApiResponse({ status: 200, description: 'Return all books.', type: [Book] })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'author', required: false, type: String })
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('category') category?: string,
    @Query('author') author?: string,
  ): Promise<Book[]> {
    return this.booksService.findAll(page, limit, category, author);
  }

  @ApiOperation({ summary: 'Get a single book by ID' })
  @ApiResponse({ status: 200, description: 'Return the book.', type: Book })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Book> {
    const book = await this.booksService.findOne(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a book' })
  @ApiResponse({ status: 200, description: 'The book has been successfully updated.', type: Book })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
    return this.booksService.update(id, updateBookDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a book' })
  @ApiResponse({ status: 200, description: 'The book has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.booksService.remove(id);
  }
}

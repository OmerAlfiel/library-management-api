import { IsString, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ description: 'The title of the book' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The author of the book' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ description: 'The description of the book', required: false })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The publication date of the book' })
  @IsDate()
  @Type(() => Date)
  publicationDate: Date;

  @ApiProperty({ description: 'The category of the book', required: false })
  @IsString()
  category: string;
}

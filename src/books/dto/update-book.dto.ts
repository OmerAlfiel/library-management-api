import { IsString, IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiPropertyOptional({ description: 'The title of the book' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'The author of the book' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  author?: string;

  @ApiPropertyOptional({ description: 'The description of the book' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'The publication date of the book' })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  publicationDate?: Date;

  @ApiPropertyOptional({ description: 'The category of the book' })
  @IsString()
  @IsOptional()
  category?: string;
}

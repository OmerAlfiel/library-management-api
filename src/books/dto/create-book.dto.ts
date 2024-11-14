import { IsString, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  description: string;

  @IsDate()
  @Type(() => Date)
  publicationDate: Date;

  @IsString()
  category: string;
}

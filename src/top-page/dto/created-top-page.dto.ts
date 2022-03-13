import { TopLevelCategory } from '../top-page.model';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
class CreateTopPageHh {
  @IsNumber()
  count: number;
  @IsNumber()
  juniorSalary: number;
  @IsNumber()
  middleSalary: number;
  @IsNumber()
  seniorSalary: number;
}
class CreateTopPageAdvantages {
  @IsString()
  title: string;
  @IsString()
  description: string;
}
export class CreatedTopPageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;
  @IsString()
  secondCategory: string;
  @IsString()
  title: string;
  @IsString()
  category: string;
  @IsOptional()
  @Type(() => CreateTopPageHh)
  hh?: CreateTopPageHh;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTopPageAdvantages)
  advantages: CreateTopPageAdvantages[];
  @IsString()
  seoText: string;
  @IsString()
  tagsTitle: string;
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}

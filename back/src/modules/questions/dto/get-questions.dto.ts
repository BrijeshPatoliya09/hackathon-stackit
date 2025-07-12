import { IsArray, IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from 'src/general-dto/page-option.dto';

export class GetQuestionsFilterDto extends PageOptionsDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  created_by?: string;

  @IsOptional()
  @IsString()
  orderBy?: string;

  @IsOptional()
  noLimit?: boolean;
}

import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@ArgsType()
export class FindCursosArgs extends PaginationDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    nombre?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsUUID()
    categoriaId?: string;
}

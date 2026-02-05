import { ArgsType, Field } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@ArgsType()
export class FindCursosArgs extends PaginationDto {
    @ApiPropertyOptional({ description: 'Filtrar por nombre del curso' })
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    nombre?: string;

    @ApiPropertyOptional({ description: 'Filtrar por ID de categoría' })
    @Field({ nullable: true })
    @IsOptional()
    @IsUUID()
    categoriaId?: string;
}

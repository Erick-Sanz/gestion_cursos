import { ArgsType, Field } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@ArgsType()
export class FindCursosArgs extends PaginationDto {
    @ApiPropertyOptional({ description: 'Filtrar por nombre del curso', example: 'Matematicas' })
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    nombre?: string;

    @ApiPropertyOptional({ description: 'Filtrar por ID de categoría', example: '123e4567-e89b-12d3-a456-426614174000' })
    @Field({ nullable: true })
    @IsOptional()
    @IsUUID()
    categoriaId?: string;
}

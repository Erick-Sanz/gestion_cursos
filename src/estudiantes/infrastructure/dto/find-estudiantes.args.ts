import { ArgsType, Field } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@ArgsType()
export class FindEstudiantesArgs extends PaginationDto {
    @ApiPropertyOptional({ description: 'Filtrar por nombre del estudiante', example: 'Juan' })
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    nombre?: string;

    @ApiPropertyOptional({ description: 'Filtrar por apellido del estudiante', example: 'Perez' })
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    apellido?: string;
}

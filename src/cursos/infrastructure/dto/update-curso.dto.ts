import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCursoDto } from './create-curso.dto';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class UpdateCursoDto extends PartialType(CreateCursoDto) {
    @ApiPropertyOptional({ description: 'Nombre del curso', example: 'Matemáticas' })
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    nombre?: string;

    @ApiPropertyOptional({ description: 'ID de la categoria', example: '123e4567-e89b-12d3-a456-426614174000' })
    @Field({ nullable: true })
    @IsOptional()
    @IsUUID()
    @IsNotEmpty()
    categoriaId?: string;
}

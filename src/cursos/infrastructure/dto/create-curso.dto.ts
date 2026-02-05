import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ICurso } from '../../domain/interfaces/curso.interface';

@InputType()
export class CreateCursoDto implements Omit<ICurso, 'id' | 'estudiantes'> {
    @ApiProperty({ description: 'Nombre del curso', example: 'Matemáticas' })
    @Field()
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ description: 'ID de la categoria', example: '123e4567-e89b-12d3-a456-426614174000' })
    @Field()
    @IsUUID()
    @IsNotEmpty()
    categoriaId: string;
}

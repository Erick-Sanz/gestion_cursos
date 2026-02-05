import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { ICurso } from '../../domain/interfaces/curso.interface';

@InputType()
export class CreateCursoDto implements Omit<ICurso, 'id' | 'estudiantes'> {
    @ApiProperty({ description: 'Nombre del curso', example: 'Matemáticas' })
    @Field()
    @IsString()
    @IsNotEmpty()
    nombre: string;
}

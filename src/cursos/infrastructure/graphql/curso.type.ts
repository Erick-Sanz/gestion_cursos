import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CategoriaType } from '../../../categorias/infrastructure/graphql/categoria.type';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType('Curso')
export class CursoType {
  @ApiProperty({ description: 'Identificador único del curso' })
  @Field(() => ID)
  id: string;

  @ApiProperty({ description: 'Nombre del curso', example: 'Matemáticas' })
  @Field()
  nombre: string;

  @ApiProperty({
    type: () => CategoriaType,
    required: false,
    description: 'Categoría a la que pertenece el curso',
  })
  @Field(() => CategoriaType, { nullable: true })
  categoria: CategoriaType;
}

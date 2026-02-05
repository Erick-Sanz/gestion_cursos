import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CategoriaType } from '../../../categorias/infrastructure/graphql/categoria.type';

@ObjectType('Curso')
export class CursoType {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;

  @Field(() => CategoriaType, { nullable: true })
  categoria: CategoriaType;
}

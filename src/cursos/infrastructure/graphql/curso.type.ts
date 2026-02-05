import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class CursoType {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;
}

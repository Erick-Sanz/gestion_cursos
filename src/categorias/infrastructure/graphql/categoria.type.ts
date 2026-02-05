import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Categoria')
export class CategoriaType {
    @Field(() => ID)
    id: string;

    @Field()
    nombre: string;
}

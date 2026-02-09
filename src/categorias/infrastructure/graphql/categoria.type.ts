import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType('Categoria')
export class CategoriaType {
    @ApiProperty({ description: 'Identificador único de la categoría' })
    @Field(() => ID)
    id: string;

    @ApiProperty({ description: 'Nombre de la categoría', example: 'Ciencias' })
    @Field()
    nombre: string;
}

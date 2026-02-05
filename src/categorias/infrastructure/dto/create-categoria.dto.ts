import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCategoriaDto {
    @ApiProperty({ description: 'Nombre de la categoria', example: 'Tecnología' })
    @Field()
    @IsString()
    @IsNotEmpty()
    nombre: string;
}

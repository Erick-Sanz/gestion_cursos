import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class EstudianteType {
  @ApiProperty({ description: 'Identificador único del estudiante' })
  @Field(() => ID)
  id: string;

  @ApiProperty({ description: 'Nombre del estudiante', example: 'Juan' })
  @Field()
  nombre: string;

  @ApiProperty({ description: 'Apellido del estudiante', example: 'Perez' })
  @Field()
  apellido: string;

  @ApiProperty({ description: 'Correo electrónico', example: 'juan.perez@email.com' })
  @Field()
  email: string;

  @ApiProperty({ description: 'Fecha de nacimiento', example: '2000-01-01' })
  @Field()
  fechaNacimiento: string;

  @ApiProperty({ required: false, description: 'Número de teléfono', example: '+1234567890' })
  @Field({ nullable: true })
  telefono: string;
}

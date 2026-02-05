import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class EstudianteType {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;

  @Field()
  apellido: string;

  @Field()
  email: string;

  @Field()
  fechaNacimiento: string;

  @Field({ nullable: true })
  telefono: string;
}

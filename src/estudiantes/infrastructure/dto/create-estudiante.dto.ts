import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IEstudiante } from 'src/estudiantes/domain/interfaces/estudiante.interface';


@InputType()
export class CreateEstudianteDto implements Omit<IEstudiante, 'id' | 'cursos'> {
  @ApiProperty({ description: 'Nombre del estudiante', example: 'Juan' })
  @Field()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ description: 'Apellido del estudiante', example: 'Perez' })
  @Field()
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @ApiProperty({
    description: 'Correo electronico del estudiante',
    example: 'juan.perez@email.com',
  })
  @Field()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Fecha de nacimiento en formato ISO 8601',
    example: '2000-01-15',
  })
  @Field()
  @IsDateString()
  fechaNacimiento: string;

  @ApiPropertyOptional({
    description: 'Numero de telefono del estudiante',
    example: '+591 71234567',
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  telefono?: string;
}

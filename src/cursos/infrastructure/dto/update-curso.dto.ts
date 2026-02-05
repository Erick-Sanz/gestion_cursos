import { PartialType } from '@nestjs/swagger';
import { CreateCursoDto } from './create-curso.dto';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCursoDto extends PartialType(CreateCursoDto) { }

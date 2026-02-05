import { Resolver, Query, Args, ID, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { CursoType } from './curso.type';
import { EstudianteType } from '../../../estudiantes/infrastructure/graphql/estudiante.type';
import { CursoService } from '../../application/curso.service';
import { Curso } from '../../domain/curso.entity';
import { CreateCursoDto } from '../dto/create-curso.dto';

@Resolver(() => CursoType)
export class CursoResolver {
  constructor(private readonly cursoService: CursoService) { }

  @Query(() => [CursoType], { name: 'cursos' })
  async findAll(): Promise<Curso[]> {
    return this.cursoService.findAllWithEstudiantes();
  }

  @Query(() => CursoType, { name: 'curso' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<Curso> {
    return this.cursoService.findById(id);
  }

  @ResolveField('estudiantes', () => [EstudianteType])
  getEstudiantes(@Parent() curso: Curso): Curso['estudiantes'] {
    return curso.estudiantes ?? [];
  }

  @Mutation(() => CursoType)
  async createCurso(@Args('input') input: CreateCursoDto): Promise<Curso> {
    return this.cursoService.create(input);
  }
}

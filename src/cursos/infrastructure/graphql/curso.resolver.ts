import { Resolver, Query, Args, ID, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { CursoType } from './curso.type';
import { EstudianteType } from '../../../estudiantes/infrastructure/graphql/estudiante.type';
import { CursoService } from '../../application/curso.service';
import { Curso } from '../../domain/curso.entity';
import { CreateCursoDto } from '../dto/create-curso.dto';
import { FindCursosArgs } from '../dto/find-cursos.args';

@Resolver(() => CursoType)
export class CursoResolver {
  constructor(private readonly cursoService: CursoService) { }

  @Query(() => [CursoType], { name: 'cursos' })
  async findAll(@Args() args: FindCursosArgs): Promise<Curso[]> {
    return this.cursoService.findAllWithEstudiantes(args);
  }

  @Query(() => CursoType, { name: 'curso' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<Curso> {
    return this.cursoService.findById(id);
  }

  @ResolveField('estudiantes', () => [EstudianteType])
  getEstudiantes(@Parent() curso: Curso): Curso['estudiantes'] {
    return curso.estudiantes ?? [];
  }

  @ResolveField('categoria', () => require('../../../categorias/infrastructure/graphql/categoria.type').CategoriaType)
  getCategoria(@Parent() curso: Curso) {
    return curso.categoria;
  }

  @Mutation(() => CursoType)
  async createCurso(@Args('input') input: CreateCursoDto): Promise<Curso> {
    return this.cursoService.create(input);
  }
}

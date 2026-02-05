import { Resolver, Query, Args, ID, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { EstudianteType } from './estudiante.type';
import { CursoType } from '../../../cursos/infrastructure/graphql/curso.type';
import { EstudianteService } from '../../application/estudiante.service';
import { Estudiante } from '../../domain/estudiante.entity';
import { CreateEstudianteDto } from '../dto/create-estudiante.dto';
import { FindEstudiantesArgs } from '../dto/find-estudiantes.args';

@Resolver(() => EstudianteType)
export class EstudianteResolver {
  constructor(private readonly estudianteService: EstudianteService) { }

  @Query(() => [EstudianteType], { name: 'estudiantes' })
  async findAll(@Args() args: FindEstudiantesArgs): Promise<Estudiante[]> {
    return this.estudianteService.findAllWithCursos(args);
  }

  @Query(() => EstudianteType, { name: 'estudiante' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Estudiante> {
    return this.estudianteService.findById(id);
  }

  @ResolveField('cursos', () => [CursoType])
  getCursos(@Parent() estudiante: Estudiante): Estudiante['cursos'] {
    return estudiante.cursos ?? [];
  }

  @Mutation(() => EstudianteType, { name: 'createStudent' })
  async createStudent(
    @Args('input') input: CreateEstudianteDto,
  ): Promise<Estudiante> {
    return this.estudianteService.create(input);
  }

  @Mutation(() => EstudianteType)
  async inscribirEstudiante(
    @Args('estudianteId', { type: () => ID }) estudianteId: string,
    @Args('cursoId', { type: () => ID }) cursoId: string,
  ): Promise<Estudiante> {
    return this.estudianteService.inscribir(estudianteId, cursoId);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './domain/estudiante.entity';
import { EstudianteRepositoryPort } from './domain/estudiante.repository.port';
import { EstudianteTypeormRepository } from './infrastructure/estudiante.typeorm-repository';
import { EstudianteService } from './application/estudiante.service';
import { EstudianteController } from './infrastructure/estudiante.controller';
import { EstudianteResolver } from './infrastructure/graphql/estudiante.resolver';
import { CursoRepositoryPort } from 'src/cursos/domain/curso.repository.port';
import { CursoTypeormRepository } from 'src/cursos/infrastructure/curso.typeorm-repository';
import { Curso } from 'src/cursos/domain/curso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante, Curso])],
  controllers: [EstudianteController],
  providers: [
    EstudianteService,
    {
      provide: EstudianteRepositoryPort,
      useClass: EstudianteTypeormRepository,
    },
    {
      provide: CursoRepositoryPort,
      useClass: CursoTypeormRepository,
    },
    EstudianteResolver,
  ],
  exports: [EstudianteService],
})
export class EstudianteModule { }

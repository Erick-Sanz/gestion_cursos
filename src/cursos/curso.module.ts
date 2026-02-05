import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './domain/curso.entity';
import { CursoRepositoryPort } from './domain/curso.repository.port';
import { CursoTypeormRepository } from './infrastructure/curso.typeorm-repository';
import { CursoService } from './application/curso.service';
import { CursoResolver } from './infrastructure/graphql/curso.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Curso])],
  providers: [
    CursoService,
    {
      provide: CursoRepositoryPort,
      useClass: CursoTypeormRepository,
    },
    CursoResolver,
  ],
  exports: [CursoService, TypeOrmModule],
})
export class CursoModule {}

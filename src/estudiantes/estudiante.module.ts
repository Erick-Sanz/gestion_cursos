import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './domain/estudiante.entity';
import { EstudianteRepositoryPort } from './domain/estudiante.repository.port';
import { EstudianteTypeormRepository } from './infrastructure/estudiante.typeorm-repository';
import { EstudianteService } from './application/estudiante.service';
import { EstudianteController } from './infrastructure/estudiante.controller';
import { EstudianteResolver } from './infrastructure/graphql/estudiante.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante])],
  controllers: [EstudianteController],
  providers: [
    EstudianteService,
    {
      provide: EstudianteRepositoryPort,
      useClass: EstudianteTypeormRepository,
    },
    EstudianteResolver,
  ],
  exports: [EstudianteService],
})
export class EstudianteModule {}

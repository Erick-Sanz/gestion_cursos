import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { EstudianteModule } from '../estudiantes/estudiante.module';
import { CursoModule } from '../cursos/curso.module';

@Module({
    imports: [EstudianteModule, CursoModule],
    providers: [SeedService],
})
export class SeedModule { }

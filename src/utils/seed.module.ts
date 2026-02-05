import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { EstudianteModule } from '../estudiantes/estudiante.module';
import { CursoModule } from '../cursos/curso.module';
import { CategoriaModule } from '../categorias/categoria.module';

@Module({
    imports: [EstudianteModule, CursoModule, CategoriaModule],
    providers: [SeedService],
})
export class SeedModule { }

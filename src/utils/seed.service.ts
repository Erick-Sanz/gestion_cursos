import { Injectable, OnModuleInit } from '@nestjs/common';
import { EstudianteService } from '../estudiantes/application/estudiante.service';
import { CursoService } from '../cursos/application/curso.service';
import { CategoriaService } from '../categorias/application/categoria.service';

@Injectable()
export class SeedService implements OnModuleInit {
    constructor(
        private readonly estudianteService: EstudianteService,
        private readonly cursoService: CursoService,
        private readonly categoriaService: CategoriaService,
    ) { }

    async onModuleInit() {
        await this.seed();
    }

    async seed() {
        const cursosExistentes = await this.cursoService.findAll();
        if (cursosExistentes.length > 0) {
            console.log('La base de datos ya tiene cursos, omitiendo seeding.');
            return;
        }

        console.log('Iniciando seeding de datos de ejemplo...');

        // Seed categories first
        const cienciasExactas = await this.categoriaService.create('Ciencias Exactas');
        const tecnologia = await this.categoriaService.create('Tecnología');
        const humanidades = await this.categoriaService.create('Humanidades');

        // Seed courses with category IDs
        await this.cursoService.create({
            nombre: 'Matemáticas Avanzadas',
            categoriaId: cienciasExactas.id,
        });
        await this.cursoService.create({
            nombre: 'Programación en NestJS',
            categoriaId: tecnologia.id,
        });
        await this.cursoService.create({
            nombre: 'Bases de Datos',
            categoriaId: tecnologia.id,
        });

        await this.estudianteService.create({
            nombre: 'Juan',
            apellido: 'Perez',
            email: 'juan.perez@example.com',
            fechaNacimiento: '2000-05-15',
            telefono: '123456789',
        });

        await this.estudianteService.create({
            nombre: 'Maria',
            apellido: 'Garcia',
            email: 'maria.garcia@example.com',
            fechaNacimiento: '1999-10-20',
            telefono: '987654321',
        });

        console.log('Seeding completado con éxito.');
    }
}

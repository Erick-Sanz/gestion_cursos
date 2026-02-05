import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './domain/categoria.entity';
import { CategoriaService } from './application/categoria.service';
import { CategoriaRepositoryPort } from './domain/categoria.repository.port';
import { CategoriaTypeormRepository } from './infrastructure/categoria.typeorm-repository';
import { CategoriaResolver } from './infrastructure/graphql/categoria.resolver';
import { CategoriaController } from './infrastructure/categoria.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Categoria])],
    controllers: [CategoriaController],
    providers: [
        CategoriaService,
        {
            provide: CategoriaRepositoryPort,
            useClass: CategoriaTypeormRepository,
        },
        CategoriaResolver,
    ],
    exports: [CategoriaService],
})
export class CategoriaModule { }

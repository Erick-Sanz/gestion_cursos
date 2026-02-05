import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { CategoriaType } from './categoria.type';
import { CategoriaService } from '../../application/categoria.service';
import { Categoria } from '../../domain/categoria.entity';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';

@Resolver(() => CategoriaType)
export class CategoriaResolver {
    constructor(private readonly categoriaService: CategoriaService) { }

    @Query(() => [CategoriaType], { name: 'categorias' })
    async findAll(): Promise<Categoria[]> {
        return this.categoriaService.findAll();
    }

    @Query(() => CategoriaType, { name: 'categoria' })
    async findOne(@Args('id', { type: () => ID }) id: string): Promise<Categoria> {
        return this.categoriaService.findById(id);
    }

    @Mutation(() => CategoriaType)
    async createCategoria(@Args('input') input: CreateCategoriaDto): Promise<Categoria> {
        return this.categoriaService.create(input.nombre);
    }
}

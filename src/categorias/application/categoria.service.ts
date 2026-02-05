import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoriaRepositoryPort } from '../domain/categoria.repository.port';
import { Categoria } from '../domain/categoria.entity';

@Injectable()
export class CategoriaService {
    constructor(private readonly repository: CategoriaRepositoryPort) { }

    async findAll(): Promise<Categoria[]> {
        return this.repository.findAll();
    }

    async findById(id: string): Promise<Categoria> {
        const categoria = await this.repository.findById(id);
        if (!categoria) {
            throw new NotFoundException(`Categoria con id ${id} no encontrada`);
        }
        return categoria;
    }

    async findByNombre(nombre: string): Promise<Categoria | null> {
        return this.repository.findByNombre(nombre);
    }

    async create(nombre: string): Promise<Categoria> {
        const categoria = await this.repository.findByNombre(nombre);
        if (categoria) {
            throw new BadRequestException(`Categoria con nombre ${nombre} ya existe`);
        }
        return this.repository.create(nombre);
    }

    async delete(id: string): Promise<void> {
        await this.findById(id);
        return this.repository.delete(id);
    }
}

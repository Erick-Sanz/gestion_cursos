import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../domain/categoria.entity';
import { CategoriaRepositoryPort } from '../domain/categoria.repository.port';

@Injectable()
export class CategoriaTypeormRepository extends CategoriaRepositoryPort {
    constructor(
        @InjectRepository(Categoria)
        private readonly repo: Repository<Categoria>,
    ) {
        super();
    }

    async findAll(): Promise<Categoria[]> {
        return this.repo.find();
    }

    async findById(id: string): Promise<Categoria | null> {
        return this.repo.findOne({ where: { id } });
    }

    async findByNombre(nombre: string): Promise<Categoria | null> {
        return this.repo.findOne({ where: { nombre } });
    }

    async create(nombre: string): Promise<Categoria> {
        const categoria = this.repo.create({ nombre });
        return this.repo.save(categoria);
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete(id);
    }
}

import { Categoria } from './categoria.entity';

export abstract class CategoriaRepositoryPort {
    abstract findAll(): Promise<Categoria[]>;
    abstract findById(id: string): Promise<Categoria | null>;
    abstract findByNombre(nombre: string): Promise<Categoria | null>;
    abstract create(nombre: string): Promise<Categoria>;
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Curso } from '../domain/curso.entity';
import { CursoRepositoryPort } from '../domain/curso.repository.port';
import { FindCursosArgs } from './dto/find-cursos.args';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursoTypeormRepository extends CursoRepositoryPort {
  constructor(
    @InjectRepository(Curso)
    private readonly repo: Repository<Curso>,
  ) {
    super();
  }

  async findAll(args?: FindCursosArgs): Promise<Curso[]> {
    const { limit = 10, offset = 0, nombre, categoriaId } = args || {};
    return this.repo.find({
      where: {
        nombre: nombre ? ILike(`%${nombre}%`) : undefined,
        categoriaId: categoriaId || undefined,
      },
      relations: ['categoria'],
      skip: offset,
      take: limit,
    });
  }

  async findAllWithEstudiantes(args?: FindCursosArgs): Promise<Curso[]> {
    const { limit = 10, offset = 0, nombre, categoriaId } = args || {};
    return this.repo.find({
      where: {
        nombre: nombre ? ILike(`%${nombre}%`) : undefined,
        categoriaId: categoriaId || undefined,
      },
      relations: ['estudiantes', 'categoria'],
      skip: offset,
      take: limit,
    });
  }

  async findById(id: string): Promise<Curso | null> {
    return this.repo.findOne({ where: { id }, relations: ['estudiantes', 'categoria'] });
  }

  async create(dto: CreateCursoDto): Promise<Curso> {
    const curso = this.repo.create(dto);
    return this.repo.save(curso);
  }

  async update(id: string, dto: UpdateCursoDto): Promise<Curso> {
    await this.repo.update(id, dto);
    const updated = await this.findById(id);
    if (!updated) {
      throw new Error(`Curso con id ${id} no encontrado después de actualizar`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }
}

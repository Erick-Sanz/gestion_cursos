import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from '../domain/curso.entity';
import { CursoRepositoryPort } from '../domain/curso.repository.port';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class CursoTypeormRepository extends CursoRepositoryPort {
  constructor(
    @InjectRepository(Curso)
    private readonly repo: Repository<Curso>,
  ) {
    super();
  }

  async findAll(pagination?: PaginationDto): Promise<Curso[]> {
    const { limit = 10, offset = 0 } = pagination || {};
    return this.repo.find({
      skip: offset,
      take: limit,
    });
  }

  async findAllWithEstudiantes(pagination?: PaginationDto): Promise<Curso[]> {
    const { limit = 10, offset = 0 } = pagination || {};
    return this.repo.find({
      relations: ['estudiantes'],
      skip: offset,
      take: limit,
    });
  }

  async findById(id: string): Promise<Curso | null> {
    return this.repo.findOne({ where: { id }, relations: ['estudiantes'] });
  }

  async create(nombre: string): Promise<Curso> {
    const curso = this.repo.create({ nombre });
    return this.repo.save(curso);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from '../domain/curso.entity';
import { CursoRepositoryPort } from '../domain/curso.repository.port';

@Injectable()
export class CursoTypeormRepository extends CursoRepositoryPort {
  constructor(
    @InjectRepository(Curso)
    private readonly repo: Repository<Curso>,
  ) {
    super();
  }

  async findAll(): Promise<Curso[]> {
    return this.repo.find();
  }

  async findAllWithEstudiantes(): Promise<Curso[]> {
    return this.repo.find({ relations: ['estudiantes'] });
  }

  async findById(id: string): Promise<Curso | null> {
    return this.repo.findOne({ where: { id }, relations: ['estudiantes'] });
  }

  async create(nombre: string): Promise<Curso> {
    const curso = this.repo.create({ nombre });
    return this.repo.save(curso);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from '../domain/estudiante.entity';
import { EstudianteRepositoryPort } from '../domain/estudiante.repository.port';

@Injectable()
export class EstudianteTypeormRepository extends EstudianteRepositoryPort {
  constructor(
    @InjectRepository(Estudiante)
    private readonly repo: Repository<Estudiante>,
  ) {
    super();
  }

  async findAll(): Promise<Estudiante[]> {
    return this.repo.find();
  }

  async findAllWithCursos(): Promise<Estudiante[]> {
    return this.repo.find({ relations: ['cursos'] });
  }

  async findById(id: string): Promise<Estudiante | null> {
    return this.repo.findOne({ where: { id }, relations: ['cursos'] });
  }

  async create(data: Partial<Estudiante>): Promise<Estudiante> {
    const estudiante = this.repo.create(data);
    return this.repo.save(estudiante);
  }

  async update(id: string, data: Partial<Estudiante>): Promise<Estudiante> {
    await this.repo.update(id, data);
    return this.repo.findOneByOrFail({ id });
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async addCurso(estudianteId: string, cursoId: string): Promise<Estudiante> {
    const estudiante = await this.findById(estudianteId);
    if (!estudiante) {
      throw new Error(`Estudiante ${estudianteId} no encontrado`);
    }

    await this.repo
      .createQueryBuilder()
      .relation(Estudiante, 'cursos')
      .of(estudianteId)
      .add(cursoId);

    return this.repo.findOneByOrFail({ id: estudianteId });
  }
}

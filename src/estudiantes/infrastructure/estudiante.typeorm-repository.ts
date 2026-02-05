import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Estudiante } from '../domain/estudiante.entity';
import { EstudianteRepositoryPort } from '../domain/estudiante.repository.port';
import { FindEstudiantesArgs } from './dto/find-estudiantes.args';

@Injectable()
export class EstudianteTypeormRepository extends EstudianteRepositoryPort {
  constructor(
    @InjectRepository(Estudiante)
    private readonly repo: Repository<Estudiante>,
  ) {
    super();
  }

  async findAll(args?: FindEstudiantesArgs): Promise<Estudiante[]> {
    const { limit = 10, offset = 0, nombre, apellido } = args || {};
    return this.repo.find({
      where: {
        nombre: nombre ? ILike(`%${nombre}%`) : undefined,
        apellido: apellido ? ILike(`%${apellido}%`) : undefined,
      },
      skip: offset,
      take: limit,
    });
  }

  async findAllWithCursos(args?: FindEstudiantesArgs): Promise<Estudiante[]> {
    const { limit = 10, offset = 0, nombre, apellido } = args || {};
    return this.repo.find({
      where: {
        nombre: nombre ? ILike(`%${nombre}%`) : undefined,
        apellido: apellido ? ILike(`%${apellido}%`) : undefined,
      },
      relations: ['cursos'],
      skip: offset,
      take: limit,
    });
  }

  async findById(id: string): Promise<Estudiante | null> {
    return this.repo.findOne({ where: { id }, relations: ['cursos'] });
  }

  async findByEmail(email: string): Promise<Estudiante | null> {
    return this.repo.findOne({ where: { email } });
  }

  async findByTelefono(telefono: string): Promise<Estudiante | null> {
    return this.repo.findOne({ where: { telefono } });
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
    await this.repo.softDelete(id);
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

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EstudianteRepositoryPort } from '../domain/estudiante.repository.port';
import { Estudiante } from '../domain/estudiante.entity';
import { CreateEstudianteDto } from '../infrastructure/dto/create-estudiante.dto';
import { UpdateEstudianteDto } from '../infrastructure/dto/update-estudiante.dto';
import { FindEstudiantesArgs } from '../infrastructure/dto/find-estudiantes.args';

@Injectable()
export class EstudianteService {
  constructor(
    private readonly repository: EstudianteRepositoryPort,
    private readonly dataSource: DataSource,
  ) { }

  async findAll(args?: FindEstudiantesArgs): Promise<Estudiante[]> {
    return this.repository.findAll(args);
  }

  async findAllWithCursos(args?: FindEstudiantesArgs): Promise<Estudiante[]> {
    return this.repository.findAllWithCursos(args);
  }

  async findById(id: string): Promise<Estudiante> {
    const estudiante = await this.repository.findById(id);
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con id ${id} no encontrado`);
    }
    return estudiante;
  }

  async create(dto: CreateEstudianteDto): Promise<Estudiante> {
    return this.repository.create(dto);
  }

  async update(id: string, dto: UpdateEstudianteDto): Promise<Estudiante> {
    await this.findById(id);
    return this.repository.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    return this.repository.delete(id);
  }

  async inscribir(estudianteId: string, cursoId: string): Promise<Estudiante> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
   
    await queryRunner.startTransaction('SERIALIZABLE');

    try {

      const estudiante = await queryRunner.manager
        .createQueryBuilder(Estudiante, 'estudiante')
        .leftJoinAndSelect('estudiante.cursos', 'cursos')
        .where('estudiante.id = :id', { id: estudianteId })
        .setLock('pessimistic_write')
        .getOne();

      if (!estudiante) {
        throw new NotFoundException(`Estudiante con id ${estudianteId} no encontrado`);
      }

 
      if (estudiante.cursos?.some(curso => curso.id === cursoId)) {
        throw new BadRequestException(`Este estudiante ya esta inscrito en el curso`);
      }


      await queryRunner.manager
        .createQueryBuilder()
        .relation(Estudiante, 'cursos')
        .of(estudianteId)
        .add(cursoId);

    
      await queryRunner.commitTransaction();

      return await this.findById(estudianteId);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

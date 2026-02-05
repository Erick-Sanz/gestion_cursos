import { Curso } from '../../../cursos/domain/curso.entity';

export interface IEstudiante {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    fechaNacimiento: string;
    telefono?: string;
    cursos?: Curso[];
}

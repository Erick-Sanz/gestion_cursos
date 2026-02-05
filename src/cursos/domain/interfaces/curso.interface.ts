import { Estudiante } from '../../../estudiantes/domain/estudiante.entity';

export interface ICurso {
    id: string;
    nombre: string;
    categoriaId: string;
    estudiantes?: Estudiante[];
}

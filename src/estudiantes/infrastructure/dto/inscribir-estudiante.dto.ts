import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class InscribirEstudianteDto {
    @ApiProperty({
        description: 'UUID del curso al que se inscribirá el estudiante',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    cursoId: string;
}

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { EstudianteService } from '../application/estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { FindEstudiantesArgs } from './dto/find-estudiantes.args';

@ApiTags('Estudiantes')
@Controller('estudiantes')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) { }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los estudiantes' })
  @ApiResponse({ status: 200, description: 'Lista de estudiantes' })
  findAll(@Query() args: FindEstudiantesArgs) {
    return this.estudianteService.findAll(args);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un estudiante por ID' })
  @ApiParam({ name: 'id', description: 'UUID del estudiante' })
  @ApiResponse({ status: 200, description: 'Estudiante encontrado' })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.estudianteService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo estudiante' })
  @ApiResponse({ status: 201, description: 'Estudiante creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  create(@Body() dto: CreateEstudianteDto) {
    return this.estudianteService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un estudiante existente' })
  @ApiParam({ name: 'id', description: 'UUID del estudiante' })
  @ApiResponse({
    status: 200,
    description: 'Estudiante actualizado exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateEstudianteDto,
  ) {
    return this.estudianteService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un estudiante' })
  @ApiParam({ name: 'id', description: 'UUID del estudiante' })
  @ApiResponse({
    status: 200,
    description: 'Estudiante eliminado exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  remove(@Param('id') id: string) {
    return this.estudianteService.delete(id);
  }

  @Post(':id/inscribir/:cursoId')
  @ApiOperation({ summary: 'Inscribir un estudiante a un curso' })
  inscribir(
    @Param('id') id: string,
    @Param('cursoId') cursoId: string,
  ) {
    return this.estudianteService.inscribir(id, cursoId);
  }
}

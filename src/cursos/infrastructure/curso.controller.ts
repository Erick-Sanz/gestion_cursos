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
import { CursoService } from '../application/curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { FindCursosArgs } from './dto/find-cursos.args';
import { Curso } from '../domain/curso.entity';

@ApiTags('Cursos')
@Controller('cursos')
export class CursoController {
    constructor(private readonly cursoService: CursoService) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los cursos' })
    @ApiResponse({ status: 200, description: 'Lista de cursos', type: [Curso] })
    findAll(@Query() args: FindCursosArgs) {
        return this.cursoService.findAll(args);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un curso por ID' })
    @ApiParam({ name: 'id', description: 'UUID del curso' })
    @ApiResponse({ status: 200, description: 'Curso encontrado', type: Curso })
    @ApiResponse({ status: 404, description: 'Curso no encontrado' })
    findById(@Param('id', ParseUUIDPipe) id: string) {
        return this.cursoService.findById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo curso' })
    @ApiResponse({ status: 201, description: 'Curso creado exitosamente', type: Curso })
    @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
    create(@Body() dto: CreateCursoDto) {
        return this.cursoService.create(dto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un curso existente' })
    @ApiParam({ name: 'id', description: 'UUID del curso' })
    @ApiResponse({ status: 200, description: 'Curso actualizado exitosamente', type: Curso })
    @ApiResponse({ status: 404, description: 'Curso no encontrado' })
    @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateCursoDto,
    ) {
        return this.cursoService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un curso' })
    @ApiParam({ name: 'id', description: 'UUID del curso' })
    @ApiResponse({ status: 200, description: 'Curso eliminado exitosamente', type: Curso })
    @ApiResponse({ status: 404, description: 'Curso no encontrado' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.cursoService.delete(id);
    }
}

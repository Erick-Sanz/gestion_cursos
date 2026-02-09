import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    ParseUUIDPipe,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
} from '@nestjs/swagger';
import { CategoriaService } from '../application/categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { Categoria } from '../domain/categoria.entity';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todas las categorías' })
    @ApiResponse({ status: 200, description: 'Lista de categorías', type: [Categoria] })
    findAll() {
        return this.categoriaService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una categoría por ID' })
    @ApiParam({ name: 'id', description: 'UUID de la categoría' })
    @ApiResponse({ status: 200, description: 'Categoría encontrada', type: Categoria })
    @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
    findById(@Param('id', ParseUUIDPipe) id: string) {
        return this.categoriaService.findById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva categoría' })
    @ApiResponse({ status: 201, description: 'Categoría creada exitosamente', type: Categoria })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
    create(@Body() dto: CreateCategoriaDto) {
        return this.categoriaService.create(dto.nombre);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una categoría' })
    @ApiParam({ name: 'id', description: 'UUID de la categoría' })
    @ApiResponse({ status: 200, description: 'Categoría eliminada exitosamente', type: Categoria })
    @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.categoriaService.delete(id);
    }
}

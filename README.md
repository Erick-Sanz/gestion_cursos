# Sistema de Gestión de Cursos

Sistema con API REST y GraphQL para la gestión de estudiantes, cursos y categorías, construida con NestJS, TypeORM y PostgreSQL, TypeScript, Arquitectura hexagonal, clean code.

## 📋 Descripción

Este proyecto implementa un sistema completo de gestión académica que permite:
- Administrar estudiantes y cursos
- Organizar cursos por categorías
- Inscribir estudiantes en cursos
- Consultar información mediante REST API o GraphQL
- Filtrar y paginar resultados

## 🏗️ Arquitectura

El proyecto sigue los principios de **Arquitectura Hexagonal (Ports & Adapters)**:

```
src/
├── estudiantes/
│   ├── domain/              # Entidades y lógica de negocio
│   │   ├── estudiante.entity.ts
│   │   ├── estudiante.repository.port.ts
│   │   └── interfaces/
│   ├── application/         # Casos de uso y servicios
│   │   └── estudiante.service.ts
│   └── infrastructure/      # Adaptadores (DB, GraphQL, REST)
│       ├── estudiante.typeorm-repository.ts
│       ├── dto/
│       ├── graphql/
│       └── rest/
├── cursos/                  # Misma estructura que estudiantes
├── categorias/              # Misma estructura que estudiantes
├── common/                  # Código compartido
└── utils/                   # Utilidades (database, seeding)
```

## 🚀 Características Principales

### 1. **Doble API (REST + GraphQL)**
- **REST API**: Endpoints tradicionales en `/*`
- **GraphQL**: Playground interactivo en `/graphql`

### 2. **Gestión de Entidades**
- **Estudiantes**: CRUD completo con validaciones
- **Cursos**: Asociados a categorías
- **Categorías**: Normalización de datos

### 3. **Relaciones**
- `Estudiante` ↔ `Curso` (Many-to-Many)
- `Categoria` → `Curso` (One-to-Many)

### 4. **Filtrado y Paginación**
- Búsqueda por nombre, apellido, categoría
- Paginación con `limit` y `offset`
- Búsqueda case-insensitive con `ILike`

### 5. **Transacciones con Control de Concurrencia**
- Nivel de aislamiento `SERIALIZABLE`
- Bloqueo (`FOR UPDATE`)
- Rollback automático en errores

### 6. **Manejo de Errores**
- Filtros globales para REST y GraphQL
- Mensajes estandarizados
- Códigos de estado HTTP apropiados

### 7. **Versionado de API**
- **REST API**: Versionado URI (`/api/v1/`)
- Versión actual: v1
- GraphQL: Sin versionado (evoluciona mediante deprecación de campos)

## 📦 Requisitos Previos

- Node.js >= 18
- PostgreSQL >= 14
- npm o yarn

## ⚙️ Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd gestion_cursos
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear archivo `.env` en la raíz del proyecto:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_DATABASE=gestion_cursos

# Application
PORT=3000
NODE_ENV=development
```

4. **Crear la base de datos**
```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE gestion_cursos;
```

## 🏃 Ejecución

### Modo Desarrollo
```bash
npm run start:dev
```

### Modo Producción
```bash
npm run build
npm run start:prod
```

La aplicación estará disponible en `http://localhost:3000`

## 📚 Documentación de la API

### Swagger (REST API)

Accede a la documentación interactiva de Swagger en:

```
http://localhost:3000/api
```

Aquí podrás:
- Ver todos los endpoints disponibles
- Probar las peticiones directamente
- Ver los esquemas de datos (DTOs)
- Consultar códigos de respuesta

### GraphQL Playground

Accede al playground de GraphQL en:

```
http://localhost:3000/graphql
```

Características:
- Autocompletado de queries y mutations
- Explorador de esquema
- Historial de consultas
- Documentación integrada

## 📖 Ejemplos de Uso

### REST API

**Nota**: Todos los módulos tienen endpoints REST versionados con el prefijo `/api/v1/`

#### Obtener todos los estudiantes con filtros
```bash
GET http://localhost:8000/api/v1/estudiantes?nombre=Juan&limit=10&offset=0
```

#### Crear un estudiante
```bash
POST http://localhost:8000/api/v1/estudiantes
Content-Type: application/json

{
  "nombre": "Carlos",
  "apellido": "Rodriguez",
  "email": "carlos@example.com",
  "fechaNacimiento": "2001-03-15",
  "telefono": "555-1234"
}
```

#### Inscribir estudiante en curso
```bash
POST http://localhost:8000/api/v1/estudiantes/{estudianteId}/inscribir/{cursoId}
```

#### Crear un curso
```bash
POST http://localhost:8000/api/v1/cursos
Content-Type: application/json

{
  "nombre": "Matemáticas Avanzadas",
  "categoriaId": "uuid-de-categoria"
}
```

#### Obtener todas las categorías
```bash
GET http://localhost:8000/api/v1/categorias
```

### GraphQL

**Nota**: Cursos y Categorías solo están disponibles mediante GraphQL.

#### Consultar categorías

#### Consultar categorías
```graphql
query {
  categorias {
    id
    nombre
  }
}
```

#### Consultar cursos con categoría
```graphql
query {
  cursos(limit: 10, categoriaId: "uuid-aqui") {
    id
    nombre
    categoria {
      id
      nombre
    }
    estudiantes {
      nombre
      apellido
    }
  }
}
```

#### Crear categoría
```graphql
mutation {
  createCategoria(input: { nombre: "Tecnología" }) {
    id
    nombre
  }
}
```

#### Inscribir estudiante en curso
```graphql
mutation {
  inscribirEstudiante(
    estudianteId: "uuid-estudiante"
    cursoId: "uuid-curso"
  ) {
    id
    nombre
    cursos {
      nombre
    }
  }
}
```

## 🗄️ Esquema de Base de Datos

### Tablas

**categorias**
- `id` (UUID, PK)
- `nombre` (VARCHAR, UNIQUE)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

**cursos**
- `id` (UUID, PK)
- `nombre` (VARCHAR)
- `categoriaId` (UUID, FK → categorias)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

**estudiantes**
- `id` (UUID, PK)
- `nombre` (VARCHAR)
- `apellido` (VARCHAR)
- `email` (VARCHAR, UNIQUE)
- `fechaNacimiento` (DATE)
- `telefono` (VARCHAR)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

**estudiante_cursos** (Many-to-Many)
- `estudianteId` (UUID, FK → estudiantes)
- `cursoId` (UUID, FK → cursos)

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🌱 Seeding

El proyecto incluye datos de ejemplo que se cargan automáticamente al iniciar:

- 3 categorías (Ciencias Exactas, Tecnología, Humanidades)
- 3 cursos asociados a categorías
- 2 estudiantes

Para reiniciar los datos, elimina la base de datos y vuelve a crearla.

## 🔒 Características de Seguridad

1. **Validación de Datos**: Uso de `class-validator` en todos los DTOs
2. **Transacciones ACID**: Garantía de integridad de datos
3. **Control de Concurrencia**: Prevención de race conditions
4. **Manejo de Errores**: Sin exposición de información sensible

## 🛠️ Tecnologías Utilizadas

- **Framework**: NestJS 10
- **ORM**: TypeORM
- **Base de Datos**: PostgreSQL
- **GraphQL**: Apollo Server
- **Validación**: class-validator, class-transformer
- **Documentación**: Swagger/OpenAPI

## 📝 Scripts Disponibles

```bash
npm run start          # Iniciar en modo normal
npm run start:dev      # Iniciar en modo desarrollo (watch)
npm run start:prod     # Iniciar en modo producción
npm run build          # Compilar el proyecto
npm run format         # Formatear código con Prettier
npm run lint           # Ejecutar ESLint
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Autor

Desarrollado como proyecto académico de gestión de cursos.

## 📞 Soporte

Para reportar problemas o solicitar características, abre un issue en el repositorio.

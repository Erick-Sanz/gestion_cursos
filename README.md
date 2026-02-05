# Sistema de Gestión de Cursos

Sistema con API REST y GraphQL para la gestión de estudiantes, cursos y categorías, construida con NestJS, TypeORM y PostgreSQL, TypeScript, Arquitectura hexagonal, clean code.
El proyecto se desplego en render al ser una opcion gratuita para desplegar.
En el motor de base de datos se utilizo neon db.
La url de la api es: https://gestion-cursos.onrender.com
La url de la documentacion de swagger es: https://gestion-cursos.onrender.com/api
La url del playground de graphql es: https://gestion-cursos.onrender.com/graphql

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

---

#### 🎓 Estudiantes

**Listar estudiantes con filtros**
```bash
GET http://localhost:8000/api/v1/estudiantes?nombre=Juan&apellido=Perez&limit=10&offset=0
```

**Obtener estudiante por ID**
```bash
GET http://localhost:8000/api/v1/estudiantes/{id}
```

**Crear estudiante**
```bash
POST http://localhost:8000/api/v1/estudiantes
Content-Type: application/json

{
  "nombre": "Carlos",
  "apellido": "Rodriguez",
  "email": "carlos@example.com",
  "fechaNacimiento": "2001-03-15",
  "telefono": "5551234"
}
```

**Actualizar estudiante**
```bash
PATCH http://localhost:8000/api/v1/estudiantes/{id}
Content-Type: application/json

{
  "telefono": "5555678",
  "email": "carlos.nuevo@example.com"
}
```

**Eliminar estudiante**
```bash
DELETE http://localhost:8000/api/v1/estudiantes/{id}
```

**Inscribir estudiante en curso**
```bash
POST http://localhost:8000/api/v1/estudiantes/{estudianteId}/inscripciones
Content-Type: application/json

{
  "cursoId": "uuid-del-curso"
}
```

---

#### 📚 Cursos

**Listar cursos con filtros**
```bash
GET http://localhost:8000/api/v1/cursos?nombre=Matemáticas&categoriaId=uuid-categoria&limit=10&offset=0
```

**Obtener curso por ID**
```bash
GET http://localhost:8000/api/v1/cursos/{id}
```

**Crear curso**
```bash
POST http://localhost:8000/api/v1/cursos
Content-Type: application/json

{
  "nombre": "Matemáticas Avanzadas",
  "categoriaId": "uuid-de-categoria"
}
```

**Actualizar curso**
```bash
PATCH http://localhost:8000/api/v1/cursos/{id}
Content-Type: application/json

{
  "nombre": "Matemáticas Avanzadas II"
}
```

**Eliminar curso**
```bash
DELETE http://localhost:8000/api/v1/cursos/{id}
```

---

#### 🏷️ Categorías

**Listar todas las categorías**
```bash
GET http://localhost:8000/api/v1/categorias
```

**Obtener categoría por ID**
```bash
GET http://localhost:8000/api/v1/categorias/{id}
```

**Crear categoría**
```bash
POST http://localhost:8000/api/v1/categorias
Content-Type: application/json

{
  "nombre": "Tecnología"
}
```

**Eliminar categoría**
```bash
DELETE http://localhost:8000/api/v1/categorias/{id}
```

---

### GraphQL

Accede al playground en `http://localhost:8000/graphql`

---

#### 🎓 Estudiantes (GraphQL)

**Consultar estudiantes con filtros**
```graphql
query {
  estudiantes(nombre: "Juan", apellido: "Perez", limit: 10, offset: 0) {
    id
    nombre
    apellido
    email
    fechaNacimiento
    telefono
    cursos {
      id
      nombre
      categoria {
        id
        nombre
      }
    }
  }
}
```

**Consultar estudiante por ID**
```graphql
query {
  estudiante(id: "uuid-estudiante") {
    id
    nombre
    apellido
    email
    cursos {
      nombre
    }
  }
}
```

**Crear estudiante**
```graphql
mutation {
  createStudent(input: {
    nombre: "Carlos"
    apellido: "Rodriguez"
    email: "carlos@example.com"
    fechaNacimiento: "2001-03-15"
    telefono: "555-1234"
  }) {
    id
    nombre
    apellido
    email
  }
}
```

**Inscribir estudiante en curso**
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

---

#### 📚 Cursos (GraphQL)

**Consultar cursos con filtros**
```graphql
query {
  cursos(nombre: "Matemáticas", limit: 10) {
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

**Consultar curso por ID**
```graphql
query {
  curso(id: "uuid-curso") {
    id
    nombre
    categoria {
      nombre
    }
    estudiantes {
      nombre
      apellido
      email
    }
  }
}
```

**Crear curso**
```graphql
mutation {
  createCurso(input: {
    nombre: "Matemáticas Avanzadas"
    categoriaId: "uuid-de-categoria"
  }) {
    id
    nombre
    categoria {
      nombre
    }
  }
}
```

---

#### 🏷️ Categorías (GraphQL)

**Consultar todas las categorías**
```graphql
query {
  categorias {
    id
    nombre
  }
}
```

**Consultar categoría por ID**
```graphql
query {
  categoria(id: "uuid-categoria") {
    id
    nombre
  }
}
```

**Crear categoría**
```graphql
mutation {
  createCategoria(input: { nombre: "Tecnología" }) {
    id
    nombre
  }
}
```

## 🗄️ Esquema de Base de Datos

### Estudiantes
| Campo | Tipo | Restricciones |
|-------|------|---------------|
| `id` | UUID | Primary Key |
| `nombre` | String | Not Null |
| `apellido` | String | Not Null |
| `email` | String | **Unique**, Not Null |
| `fechaNacimiento` | Date | Not Null |
| `telefono` | String | **Unique**, Nullable |
| `deletedAt` | Timestamp | Nullable (Soft Delete) |

**Relaciones:**
- Many-to-Many con `Cursos` (tabla intermedia: `estudiantes_cursos`)

---

### Cursos
| Campo | Tipo | Restricciones |
|-------|------|---------------|
| `id` | UUID | Primary Key |
| `nombre` | String | **Unique**, Not Null |
| `categoriaId` | UUID | Foreign Key → Categorías |
| `createdAt` | Timestamp | Auto-generated |
| `updatedAt` | Timestamp | Auto-updated |
| `deletedAt` | Timestamp | Nullable (Soft Delete) |

**Relaciones:**
- Many-to-One con `Categorías`
- Many-to-Many con `Estudiantes` (tabla intermedia: `estudiantes_cursos`)

---

### Categorías
| Campo | Tipo | Restricciones |
|-------|------|---------------|
| `id` | UUID | Primary Key |
| `nombre` | String | **Unique**, Not Null |
| `createdAt` | Timestamp | Auto-generated |
| `updatedAt` | Timestamp | Auto-updated |
| `deletedAt` | Timestamp | Nullable (Soft Delete) |

**Relaciones:**
- One-to-Many con `Cursos`

---

### Estudiantes_Cursos (Tabla de relación)
| Campo | Tipo | Restricciones |
|-------|------|---------------|
| `estudiante_id` | UUID | Foreign Key → Estudiantes |
| `curso_id` | UUID | Foreign Key → Cursos |

**Clave Primaria Compuesta:** (`estudiante_id`, `curso_id`)

---

### 🔒 Características de Seguridad de Datos

- **Soft Delete**: Todos los registros eliminados se marcan con `deletedAt` en lugar de eliminarse físicamente
- **Unique Constraints**: Email y teléfono de estudiantes, nombres de cursos y categorías son únicos
- **Concurrency Control**: Transacciones con nivel de aislamiento SERIALIZABLE y bloqueos pesimistas en operaciones críticas
- **Validaciones**: Email y teléfono únicos con validación en creación y actualización


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







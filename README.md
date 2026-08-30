# HallOfBootcamp

HallOfBootcamp es una API backend para gestionar bootcamps, cohortes, participantes, perfiles de usuario y contribuciones. El proyecto usa Node.js, Express y Sequelize con PostgreSQL.

## Stack

- Node.js
- Express
- PostgreSQL
- Sequelize
- Sequelize CLI

## Arquitectura

El proyecto sigue un enfoque MVC con separación por capas:

- `app.js`: arranque de la aplicación
- `server.js`: puerto de ejecución
- `src/config`: configuración global
- `src/models`: modelos de dominio
- `src/controllers`: lógica HTTP
- `src/routes`: endpoints
- `src/middlewares`: validación de solicitudes
- `src/helpers`: utilidades compartidas
- `src/database`: migraciones de Sequelize

## Requisitos

- Node.js 18+
- PostgreSQL local o accesible
- Git
- Cliente REST opcional para pruebas rápidas

## Configuración local

1. Crea o ajusta tu archivo `.env` con la configuración de PostgreSQL:

```env
DB_NAME=hallofbootcamp
DB_USER=admin
DB_PASSWORD=admin123
DB_HOST=localhost
DB_PORT=5432
PORT=3000
```

2. Instala dependencias:

```bash
npm install
```

3. Recrea la base de desarrollo y aplica sus migraciones:

```bash
npm run db:reset
```

> `db:reset` elimina la base de datos de desarrollo configurada antes de crearla de nuevo. Úsalo únicamente con una base local desechable.

## Flujo de base de datos

El único flujo npm documentado para preparar PostgreSQL local es:

```bash
npm run db:reset
```

Este comando elimina, crea y migra la base configurada para `development`. Las restricciones y validaciones que PostgreSQL puede hacer cumplir están versionadas en las migraciones de Sequelize; el flujo no inserta datos de ejemplo.

## Ejecutar la API

```bash
npm run start
```

Modo desarrollo:

```bash
npm run dev
```

## Validación manual de la API

La colección [RESTClient/hallofbootcamp.http](RESTClient/hallofbootcamp.http) contiene solicitudes para probar el contrato de la API. Si cambias un endpoint, payload, validación o respuesta, actualízala para mantener la documentación sincronizada con el comportamiento real.

## Contribución

Consulta [CONTRIBUTING.md](CONTRIBUTING.md) para el flujo de ramas, commits y buenas prácticas de colaboración.

## Convención de ramas

La rama debe seguir este patrón:

```text
<type>/<issue-number>-<descripcion-corta>
```

Ejemplo:

```text
feature/12-user-profile
fix/27-linkedin-validation
docs/09-branching-guidelines
```

## Convención de commits

El proyecto usa Conventional Commits.

Ejemplo:

```text
feat(api): add user profile endpoint
fix(db): resolve sequelize mapping for social links
docs(db): simplify local database workflow
```

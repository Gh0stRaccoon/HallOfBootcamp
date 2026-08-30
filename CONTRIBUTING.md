# Contributing to HallOfBootcamp

Gracias por contribuir a este proyecto. Este repositorio sigue un flujo claro basado en issues, ramas, commits y validación automatizada.

## 1. Requisitos previos

- Node.js 18+
- PostgreSQL local
- Git configurado
- Acceso a la base de datos del proyecto
- VS Code con la extensión REST Client opcional

## 2. Flujo recomendado

### 2.1 Crear una issue

Cada cambio debe estar asociado a una issue del repositorio. Usa un título claro y descriptivo.

### 2.2 Crear una rama

La regla oficial del proyecto es la siguiente, y debe respetarse en todo PR y en todo trabajo colaborativo.

#### Requerimientos

- cada rama debe nacer desde una issue de GitHub
- cada rama debe estar ligada a un cambio concreto y acotado
- debe usarse un nombre corto, claro y trazable
- todo cambio debe abrirse mediante pull request
- no se hace push directo a `main`

#### Formato

```text
<type>/<issue-number>-<descripcion-corta>
```

Ejemplos:

```bash
git checkout -b feature/12-user-profile
git checkout -b fix/27-linkedin-validation
git checkout -b docs/09-branching-guidelines
```

#### Tipos permitidos

- `feature`: nueva funcionalidad
- `fix`: corrección de errores
- `docs`: documentación
- `refactor`: mejora interna sin cambio de comportamiento visible
- `chore`: mantenimiento o configuración
- `test`: pruebas o validación

#### Reglas obligatorias

- todo en minúsculas
- usar kebab-case en la descripción
- sin espacios, acentos ni caracteres especiales
- usar el número real de la issue
- mantener la rama enfocada en una sola tarea

> En proyectos open source, una convención clara de ramas reduce ruido, hace más fácil revisar contribuciones y evita que varias personas mezclen trabajo en una sola rama.

### 2.3 Trabajar en la rama

- Mantén el cambio enfocado.
- Haz cambios pequeños y revisables.
- Si el trabajo es no trivial, crea o actualiza la especificación y el plan siguiendo el flujo SDD.
- Antes de abrir un PR, aplica la validación relevante al cambio. Para cambios de esquema en una base local desechable, usa `npm run db:reset`.

## 3. Convención de commits

Todos los commits deben seguir Conventional Commits.

Formato:

```text
<type>(<scope>): <description>
```

Ejemplos:

```text
feat(api): add user registration endpoint
fix(db): resolve snake_case mapping for sequelize models
test(api): add clean validation script
docs(project): add branching conventions
```

Tipos sugeridos:

- `feat`: nueva funcionalidad
- `fix`: corrección de errores
- `docs`: documentación
- `refactor`: refactorización
- `test`: pruebas
- `chore`: mantenimiento y configuración

## 4. Validación antes de enviar cambios

Aplica la validación relevante al cambio antes de abrir un PR. Para cambios de esquema, recrea una base local desechable con:

```bash
npm run db:reset
```

> `db:reset` elimina la base de desarrollo configurada antes de recrearla y aplicar las migraciones.

También puedes probar manualmente el contrato HTTP con REST Client en [RESTClient/hallofbootcamp.http](RESTClient/hallofbootcamp.http).

## 4.1 Contrato de la API y documentación

Este proyecto mantiene un contrato de API documentado en [RESTClient/hallofbootcamp.http](RESTClient/hallofbootcamp.http). Cualquier cambio que afecte a endpoints, métodos HTTP, payloads, validaciones, respuestas o comportamiento observable de la API debe ir acompañado de la actualización de este documento.

Regla obligatoria:

- si cambias un endpoint, actualiza la colección o ejemplo correspondiente
- si cambias el payload de entrada, actualiza la request de ejemplo
- si cambias la estructura de salida, actualiza el ejemplo de respuesta y/o documentación
- si agregas o eliminas validaciones, documenta el nuevo comportamiento

Esto aplica aunque la API pueda probarse con Postman, Insomnia o curl. El repositorio considera la colección REST Client como la referencia de uso y validación del contrato de la API.

## 5. Preparación local

1. Clona el repositorio.
2. Instala dependencias:

```bash
npm install
```

3. Configura tu archivo `.env` con tus credenciales de PostgreSQL:

```env
DB_NAME=hallofbootcamp
DB_USER=admin
DB_PASSWORD=admin123
DB_HOST=localhost
DB_PORT=5432
PORT=3000
```

4. Crea o reinicia la base local con el flujo oficial del proyecto:

```bash
npm run db:reset
```

5. Si necesitas recrear el esquema local, ejecuta el único flujo de base de datos:

```bash
npm run db:reset
```

Este comando no agrega datos de ejemplo.

## 6. Pull requests

Antes de abrir un PR:

- asegúrate de que la validación relevante al cambio pase
- escribe un resumen claro del cambio
- referencia la issue relacionada
- mantén el PR pequeño y enfocado

Usa la plantilla oficial del repositorio en [.github/pull_request_template.md](.github/pull_request_template.md).

## 7. Buenas prácticas del equipo

- no mezcles cambios no relacionados
- no envíes secretos ni credenciales
- usa nombres claros y descriptivos
- documenta cambios de arquitectura o comportamiento visible
- sigue la convención de ramas y commits del proyecto

## 8. Contacto y coordinación

Si hay dudas sobre alcance, arquitectura o flujo de desarrollo, consulta primero a la persona responsable de la issue o al dueño del repositorio antes de hacer cambios grandes.

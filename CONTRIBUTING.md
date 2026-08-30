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

Usa la convención de ramas definida en [BRANCHING.md](BRANCHING.md):

```text
<type>/HC-<issue-number>-<usuario>-<descripcion-corta>
```

Ejemplo:

```bash
git checkout -b feature/HC-12-juan-user-profile
```

### 2.3 Trabajar en la rama

- Mantén el cambio enfocado.
- Haz cambios pequeños y revisables.
- Si el trabajo es no trivial, crea o actualiza la especificación y el plan siguiendo el flujo SDD.

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

3. Configura el archivo `.env` con tus credenciales de PostgreSQL.
4. Crea la base local con el script disponible en [scripts/create-local-db.sh](scripts/create-local-db.sh).
5. Ejecuta la validación limpia:

```bash
npm run test:clean
```

## 6. Pull requests

Antes de abrir un PR:

- asegúrate de que la validación pase
- escribe un resumen claro del cambio
- referencia la issue relacionada
- mantén el PR pequeño y enfocado

## 7. Buenas prácticas del equipo

- no mezcles cambios no relacionados
- no envíes secretos ni credenciales
- usa nombres claros y descriptivos
- documenta cambios de arquitectura o comportamiento visible
- sigue la convención de ramas y commits del proyecto

## 8. Contacto y coordinación

Si hay dudas sobre alcance, arquitectura o flujo de desarrollo, consulta primero a la persona responsable de la issue o al dueño del repositorio antes de hacer cambios grandes.

# HallOfBootcamp

HallOfBootcamp es una API backend para gestionar bootcamps, cohortes, participantes, perfiles de usuario y contribuciones. Está pensada para que puedas aprender el flujo completo de una API: configurar PostgreSQL, aplicar migraciones, ejecutar Express y verificar la calidad del código.

## Ruta rápida

Si ya tienes Node.js y PostgreSQL instalados, sigue estos pasos desde la raíz del repositorio:

```bash
npm install
# configura .env a partir de .env.example
npm run db:reset
npm run dev
```

En otra terminal, verifica que la API esté disponible:

```bash
curl http://localhost:3000/health
```

La respuesta esperada es `{"status":"ok"}`. La base se crea vacía: `GET /api/users` puede responder `[]` hasta que existan usuarios.

## Requisitos

- Node.js 18 o superior.
- PostgreSQL local o una instancia accesible desde tu equipo.
- Git.
- Un cliente HTTP es opcional; el proyecto incluye una colección en [RESTClient/hallofbootcamp.http](RESTClient/hallofbootcamp.http).

## Configuración del entorno

1. Crea un archivo `.env` en la raíz tomando como referencia [.env.example](.env.example).
2. Ajusta los valores para tu PostgreSQL local. No subas `.env` ni credenciales reales al repositorio.

```env
DB_NAME=hallofbootcamp
DB_USER=admin
DB_PASSWORD=admin123
DB_HOST=localhost
DB_PORT=5432
PORT=3000
```

Los valores del ejemplo son solo configuración local de referencia. Deben coincidir con un usuario de PostgreSQL que pueda crear y eliminar la base indicada.

## Base de datos y migraciones

El esquema de PostgreSQL está definido en las migraciones de Sequelize. Para recrear tu base de desarrollo y aplicar todas las migraciones, ejecuta:

```bash
npm run db:reset
```

> **Advertencia:** `db:reset` elimina la base de datos configurada para `development`, la vuelve a crear y aplica las migraciones. Úsalo únicamente contra datos locales desechables.

El comando no carga datos demo ni seeders. Consulta [src/database/README.md](src/database/README.md) para entender la propiedad del esquema y sus restricciones.

## Ejecutar la API

| Objetivo | Comando |
| --- | --- |
| Iniciar normalmente | `npm run start` |
| Desarrollar con reinicio al guardar | `npm run dev` |

Endpoints de referencia:

- `GET /health` comprueba que el proceso Express responde.
- `GET /api` devuelve la respuesta base de la API.
- Las rutas de recursos están bajo `/api/users`, `/api/cohorts`, `/api/participants` y `/api/contributions`.

Para probar solicitudes y payloads reales, usa [RESTClient/hallofbootcamp.http](RESTClient/hallofbootcamp.http). Si cambias un endpoint, validación, payload o respuesta, actualiza esa colección también.

## Calidad y formato

Antes de enviar cambios, ejecuta las verificaciones que no modifican archivos:

```bash
npm run lint:check
npm run fmt:check
```

Oxlint detecta problemas de código; Oxfmt verifica que el formato sea consistente. Si solo necesitas aplicar formato, usa `npm run fmt` y vuelve a ejecutar `npm run fmt:check`.

## Estructura del proyecto

| Ruta | Responsabilidad |
| --- | --- |
| `app.js` | Configura Express, middlewares y rutas. |
| `server.js` | Inicia el servidor HTTP. |
| `src/routes` | Define endpoints y delega en controladores. |
| `src/controllers` | Orquesta solicitudes HTTP y acceso a modelos. |
| `src/models` | Define modelos y relaciones de Sequelize. |
| `src/middlewares` | Valida solicitudes en el borde de la API. |
| `src/config` | Centraliza configuración, incluida la conexión a base de datos. |
| `src/database/migrations` | Mantiene el esquema y restricciones de PostgreSQL versionados. |
| `openspec` | Mantiene la especificación y planificación canónicas del proyecto. |

## Cómo contribuir y entender el alcance

- Lee [CONTRIBUTING.md](CONTRIBUTING.md) antes de crear una rama o pull request.
- El contrato funcional actual está en [openspec/specs/bootcamp-participant-management/spec.md](openspec/specs/bootcamp-participant-management/spec.md).
- [openspec/README.md](openspec/README.md) explica cómo se organizan los cambios, decisiones y evidencia de verificación.

Para cambios no triviales, crea o continúa un registro bajo `openspec/changes/` antes de implementar. Así el comportamiento esperado queda claro antes que el código.

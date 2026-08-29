# Convención de ramas

Esta convención está pensada para equipos con varias personas colaborando en el mismo repositorio. Cada rama debe poder relacionarse directamente con una issue y con el desarrollador que la está trabajando.

## Formato

```text
<type>/HC-<issue-number>-<usuario>-<descripcion-corta>
```

### Componentes

- `<type>`: tipo de trabajo
- `HC`: prefijo del proyecto
- `<issue-number>`: número de la issue en GitHub (ej. 12)
- `<usuario>`: nombre de usuario de GitHub o iniciales del desarrollador, en minúsculas
- `<descripcion-corta>`: texto breve en kebab-case

## Tipos permitidos

- `feature`: nueva funcionalidad
- `fix`: corrección de errores
- `hotfix`: corrección urgente en producción
- `refactor`: mejora interna sin cambiar comportamiento externo
- `docs`: documentación
- `chore`: tareas de mantenimiento o configuración
- `test`: pruebas o validaciones

## Reglas

- Todo en minúsculas.
- Usar kebab-case en la descripción.
- Sin acentos, espacios ni caracteres especiales.
- Usar el número real de la issue.
- Usar el usuario de GitHub o el nombre corto del responsable.
- Mantener la descripción breve y clara.

## Ejemplos

```text
feature/HC-12-juan-user-profile
fix/HC-27-maria-linkedin-validation
hotfix/HC-41-carlos-auth-token-expiration
docs/HC-09-luis-branching-guidelines
test/HC-55-andrea-api-clean-validation
```

## Ejemplos de uso

```bash
git checkout -b feature/HC-12-juan-user-profile
git push -u origin feature/HC-12-juan-user-profile
```

## Relación con issues y commits

- La rama debe corresponder a una issue específica.
- El título del PR debe incluir el número de la issue.
- Los commits deben seguir Conventional Commits.
- Si la issue cambia de alcance, se debe crear una nueva rama con el mismo patrón, no reutilizar una rama vieja si ya no corresponde al mismo trabajo.

## Reglas de equipo

- Nunca crear ramas con nombres genéricos como `develop`, `feature`, `prueba`, `fix-juan`.
- Si dos personas trabajan la misma issue, deben coordinar antes de crear ramas paralelas.
- Las ramas de trabajo deben ser cortas y enfocadas en una sola tarea.

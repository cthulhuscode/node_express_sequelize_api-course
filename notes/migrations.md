# Migrations

No sobrescriben ni guardan todo (eso es ineficiente), solo guardan los cambios.

En el mundo de las bases de datos, una migración se refiere a la transferencia de datos y esquemas de una base de datos a otra, y es un proceso que se utiliza para actualizar o mover datos de una base de datos a otra o para cambiar la estructura de una base de datos ya existente ✨.

Las migraciones pueden ser necesarias por diferentes razones, como por ejemplo, cuando se quiere actualizar a una nueva versión de una base de datos o cuando se necesita cambiar la estructura de la base de datos en sí. Sin embargo, las migraciones también pueden ser muy útiles para mantener un “registro” de los cambios realizados en una base de datos, de modo que en lugar de realizar los cambios manualmente o tener que sobrescribir toda la estructura de la base de datos y los datos almacenados en ella cada vez, la migración permite mantener un historial de los cambios que se han ido realizando, mejorando así la eficiencia y la fiabilidad de su gestión 🙏.

Esto en cierta forma es similar a cómo Git mantiene un control y registro de versiones a partir de los cambios en el código fuente. Solo que, mientras Git se enfoca en el seguimiento de cambios a nivel de archivo (donde cada cambio realizado en un archivo específico se guarda como una nueva versión del archivo en el repositorio), las Migraciones —en vez de rastrear cambios a nivel de archivo— se enfocan en el seguimiento de los cambios en la estructura y los datos de la base de datos: Guardando series de instrucciones SQL que se aplican a la base de datos para actualizar su estructura y sus datos

> Las migraciones son la forma en que Django propaga cambios en los modelos y los refleja en el esquema de bases de datos. - **Django**.

> Las migraciones son como un sistema de control de versiones para la base de datos. - **Laravel**.

> Es como un sistema de control de versiones para manejar los cambios desde el código y trackear los cambios en la base de datos. - **Sequelize**.

Las migraciones **mantienen el historial** del esquema que se lleva en la base de datos. Es un sistema muy usado en ambientes de producción para **trackear** los **cambios** sin tener que replicar todo nuevamente (creación de tablas, llaves foráneas, etc). Es decir, permite saber en qué punto estaba para saber qué es lo que se tiene que modificar.

`sequelize.sync()` empieza a leer los modelos, crea tablas y hace _relist_ (se sobrescribe información), no se aconseja que se corra en producción. Es mejor sincronizar con un sistema de migraciones.

Para correr migraciones se utiliza la librería `sequelize-cli` y se instala como dependencia de desarrollo con el comando `npm i sequelize-cli -D`.

Posteriormente, se crea un archivo de configuración `.sequelizerc` en la carpeta principal.

---

`.sequelizerc:`

    module.exports = {
        config: path.resolve(".", "dist", "src", "db", "config.js"),
        "models-path": path.resolve(".", "dist", "src", "db", "models"),
        "migrations-path": path.resolve(".", "dist", "src", "db", "migrations"),
        "seeders-path": path.resolve(".", "dist", "src", "db", "seeders"),
    };

- `config` → Dónde se encuentra la configuración, esta configuración se encuentra la conexión hacia la BD. El cli tiene su propia conexión, independientemente de la conexión de la aplicación porque esas conexiones corren a nivel de terminal.

- `models-paths` → Dónde se encuentran los modelos.

- `migrations-paths` → Dónde se encuentran las migraciones.

- `seeders-path` → Dónde se encuentran las semillas de información, sirve mucho para pruebas unitarias, end to end, donde se necesitan semillas de información que es como cargar varios datos de información a la BD.

Se crean las carpetas `migrations`, `models`, `seeders` y el archivo `config.js` dentro de la carpeta `db`.

---

**En el código**

Con `sequelize.sync()` no se puede alterar una tabla que ya está creada ya que únicamente lee el modelo, y en caso de hacer alguna modificación, se queda con la primera versión (no se puede agregar un atributo más). Con las migraciones es más flexible ya que sí se pueden hacer modificaciones y tener todo de una forma organizada.

---

## Commands

**Generate a new migration**

    npm run migrations:generate <migration_name>

**Run migrations**

    npm run migrations:run

## En producción

Las migraciones son muy delicadas, es por ello que se deben tener en cuenta los esquemas. A nivel producción no se recomienda crear migraciones paso a paso, más bien, crear una sola migración que ya tenga todas las relaciones y configuración por defecto.

Algo que suele realizarse es crear un nuevo esquema dentro de la migración y no basarse en el modelo. De esa manera cualquier cambio en el modelo no afectará a la migración.

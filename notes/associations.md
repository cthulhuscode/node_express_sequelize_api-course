# Associations

## 1-1 relationship

`HasOne → B`. Si queremos que B cargue con la relación.

`BelongsTo → A`. Si queremos que A cargue con la relación.

Las relaciones se definen en el modelo de la siguiente manera, donde `associate()` recibe los modelos, la clase utiliza la relación `belongsTo()` donde se define el modelo que tiene la relación y se le puede asignar un alias (`as`).

    class Customer extends Model {
      static associate(models) {
        this.belongsTo(models.User, { as: 'user' });
      }
    }

En el archivo `models/index.js` se ejecutan las asociaciones de la siguiente manera (_después de la inicialización_):

    const { User, UserSchema } = require('./user.model');
    const { Customer, CustomerSchema } = require('./customer.model');

    function setupModels(sequelize) {
      User.init(UserSchema, User.config(sequelize));
      Customer.init(CustomerSchema, Customer.config(sequelize));

      Customer.associate(sequelize.models);
    }

    module.exports = setupModels;

Un punto importante es darle un esquema al campo que se relaciona.

    userId: {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: USER_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },

Debido a que es una relación uno a uno, usualmente hay formas en que se trabaja la actualización o eliminación. Para ello se hacen las reglas `onUpdate` (qué se hará cuando se actualice ese edit) u `onDelete` (qué se hará cuando se elimine).

Al crear la tabla _customers_ se debe generar una migración, modificar el boilerplate generado y correr la migración para crear la nueva estructura.

Con la nueva asociación creada, se procede a modificar el esquema y el service tomando en cuenta los datos de la FK que se relaciona.

## 1-N relationship

_In this project, a category can have many products, but a product can only have one category._

### `hasMany()`

We'll use `hasMany()` in the _categories_ model , i.e. _products_ will have a _categoryId_ field.

And in the _products_ model we'll use `belongsTo()` to complete the relationship.

En este caso, cuando se utiliza `hasMany`, la relación queda en productos. La relación va en la entidad débil (productos).

De la misma manera que se hizo en la relación uno a uno, se hacen las asociaciones correspondientes en los modelos, se genera la migración, se configura el `init` y se corre la migración.

## N-N relationship

We'll use `belongsToMany()` for the relationship between _Products_ and _Orders_. _A product can have many orders and an order can have many products._

This type of relationship needs a _join table_, i.e. an intermediate table between _Products_ and _Orders_. We'll call this table _products-orders_.

Un producto puede pertenecer a muchas ordenes de compra, y una orden de compra puede tener muchos productos.

Cuando se tiene una relación muchos a muchos, por detrás se tiene una tabla ternaria. En BD se usa una join table, una clase intermedia que conecta dos tablas con relación muchos a muchos.

Para este caso se va requerir la tabla orders (ordenes de compra), esta estará ligada a un cliente. La join table serian los items que estarán ligados a una orden y producto.

La tabla order tiene que ser una relación uno a muchos ya que un cliente puede tener muchas ordenes y una orden un cliente.

Las relaciones muchos a muchos se solucionan con la tabla ternaria, en este caso se crea la tabla _orders-products_.

Si se desea que _Order_ resuelva los items (productos enlazados a esa orden) a través de _OrderProduct_, se puede hacer la relación en el modelo de _Order_. Esto se hace de la siguiente forma en `order.model.js`:

    static associate(models) {
      this.belongsTo(models.Customer, {
        as: 'customer',
      });

      this.belongsToMany(models.Product, {
        as: 'items',
        through: models.OrderProduct,
        foreignKey: 'orderId',
        otherKey: 'productId',
      });
    }

Se hace el uso de `belongsToMany()` para decirle cuál es ese item que va a tener muchos productos. Como es una relación muchos a muchos se debe especificar cuál es la tabla ternaria, es decir, qué tabla va a resolver esa relación y se hace a través de la propiedad `through` especificando las llaves foráneas de ambas tablas usando las propiedades `foreignKey` y `otherKey`.

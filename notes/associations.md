# Associations

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

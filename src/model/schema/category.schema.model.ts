import { DataTypes, Model } from 'sequelize';
import { PostgresDataBase } from '../../database';

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: PostgresDataBase.getConnection(),
    freezeTableName: true,
    modelName: 'Category',
    timestamps: true,
    indexes: [
      {
        name: 'fetchById',
        fields: ['id', 'isActive'],
      },
    ],
    hooks: {
      beforeSave: (record: any) => {
        if (!record.id) {
          record.id = crypto.randomUUID();
        }
      },
    },
  },
);

export { Category };

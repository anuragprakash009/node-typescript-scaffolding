import { DataTypes, Model } from 'sequelize';
import { PostgresDataBase } from '../../database';

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    category: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: PostgresDataBase.getConnection(),
    freezeTableName: true,
    modelName: 'Product',
    timestamps: true,
    indexes: [],
  },
);

export { Product };

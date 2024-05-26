import { DataTypes, Model } from 'sequelize';
import { PostgresDataBase } from '../../database';

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: PostgresDataBase.getConnection(),
    freezeTableName: true,
    modelName: 'Product',
  },
);

console.log('Product model created');
export { Product };

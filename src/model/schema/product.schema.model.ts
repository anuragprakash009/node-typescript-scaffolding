import { DataTypes, Model } from 'sequelize';
import { PostgresDataBase } from '../../database';
import { Category } from './category.schema.model';

class Product extends Model {
  categoryData: any;
}

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
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    categoryData: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.category.toJSON();
      },
    },
  },
  {
    sequelize: PostgresDataBase.getConnection(),
    freezeTableName: true,
    modelName: 'Product',
    timestamps: true,
    indexes: [
      {
        name: 'fetchProductById',
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

Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});

export { Product };

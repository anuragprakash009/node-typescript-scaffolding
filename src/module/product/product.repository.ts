import { ServerError } from '../../errors';
import { Product, Category } from '../../model/schema';

class ProductRepository {
  async save(product: Product): Promise<Product | null> {
    try {
      const newProduct: Product | null = await product.save();
      if (!newProduct) {
        return null;
      }
      return newProduct;
    } catch (error) {
      throw new ServerError(`Failed to create record in the database`);
    }
  }
  async findById(id: string): Promise<Product | null> {
    try {
      const product: Product | null = await Product.findOne({
        where: {
          id: id,
          isActive: true,
        },
        include: {
          model: Category,
          as: 'category',
          where: {
            isActive: true,
          },
        },
      });
      if (!product) {
        return null;
      }
      return product;
    } catch (error) {
      throw new ServerError(`Failed to fetch product`);
    }
  }

  async findAll(): Promise<Product[] | []> {
    try {
      const products: Product[] = await Product.findAll({
        where: {
          isActive: true,
        },
        include: {
          model: Category,
          as: 'category',
          where: {
            isActive: true,
          },
        },
      });
      if (products && products.length > 0) {
        return products;
      }
      return [];
    } catch (error) {
      throw new ServerError(`Failed to fetch products`);
    }
  }
  async updateById(id: string, updateCondition: any): Promise<void> {
    try {
      await Product.update(updateCondition, {
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new ServerError(`Failed to update the record`);
    }
  }
  async deleteById(id: string): Promise<void> {
    try {
      await this.updateById(id, {
        isActive: false,
      });
    } catch (error) {
      throw new ServerError(`Failed to delete the record`);
    }
  }
}

export { ProductRepository };

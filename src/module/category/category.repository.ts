import { Category } from '../../model/schema';
import { ServerError } from '../../errors';

class CategoryRepository {
  async save(category: Category): Promise<Category> {
    try {
      return await category.save();
    } catch (error) {
      throw new ServerError('Failed to create record in database');
    }
  }
  async findById(id: string) {
    try {
      const category: Category | null = await Category.findOne({
        where: {
          id: id,
          isActive: true,
        },
      });
      if (category) {
        return category;
      }
      return null;
    } catch (error) {
      throw new ServerError('Failed to find record in the database by id');
    }
  }

  async findAll() {
    try {
      const categories: Category[] | null = await Category.findAll({
        where: {
          isActive: true,
        },
      });
      if (categories && categories.length > 0) {
        return categories;
      }
      return [];
    } catch (error) {
      throw new ServerError('Failed to find record in the database by id');
    }
  }

  async updateById(id: string, updateRecord: Object) {
    await Category.update(updateRecord, {
      where: {
        id: id,
      },
    });
  }
  async deleteById(id: string) {
    await Category.update(
      {
        isActive: false,
      },
      {
        where: {
          id: id,
        },
      },
    );
  }
}

export { CategoryRepository };

import { Category, ICategory } from '../../model/schema';
import { ServerError } from '../../errors';
import { LoggerService } from '../../logger';

class CategoryRepository {
  private logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  async save(category: ICategory): Promise<ICategory> {
    this.logger.info(
      `createCategory repository new category: ${JSON.stringify(category.toJSON())}`,
    );
    try {
      return await Category.create(category);
    } catch (error: any) {
      this.logger.error(
        `createCategory repository new category: ${JSON.stringify(category.toJSON())} ${error.message} ${error.stack}`,
      );
      throw new ServerError('Failed to create record in database');
    }
  }
  // async findById(id: string) {
  //   try {
  //     const category: ICategory | null = await Category.findOne({
  //       where: {
  //         id: id,
  //         isActive: true,
  //       },
  //     });
  //     if (category) {
  //       return category;
  //     }
  //     return null;
  //   } catch (error) {
  //     throw new ServerError('Failed to find record in the database by id');
  //   }
  // }

  // async findAll() {
  //   try {
  //     const categories: Category[] | null = await Category.findAll({
  //       where: {
  //         isActive: true,
  //       },
  //     });
  //     if (categories && categories.length > 0) {
  //       return categories;
  //     }
  //     return [];
  //   } catch (error) {
  //     throw new ServerError('Failed to find record in the database by id');
  //   }
  // }

  // async updateById(id: string, updateRecord: Object) {
  //   await Category.update(updateRecord, {
  //     where: {
  //       id: id,
  //     },
  //   });
  // }
  // async deleteById(id: string) {
  //   await Category.update(
  //     {
  //       isActive: false,
  //     },
  //     {
  //       where: {
  //         id: id,
  //       },
  //     },
  //   );
  // }
}

export { CategoryRepository };

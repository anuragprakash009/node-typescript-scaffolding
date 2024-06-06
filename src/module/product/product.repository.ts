import { ILoggerService } from '../../logger';
import { IProduct, Product } from '../../model/schema';
import { ServerError } from '../../errors';
class ProductRepository {
  private logger: ILoggerService;
  constructor(logger: ILoggerService) {
    this.logger = logger;
  }
  async save(product: IProduct): Promise<IProduct> {
    this.logger.info(`Save new product ${JSON.stringify(product.toJSON())}`);
    try {
      return await Product.create(product);
    } catch (error: any) {
      this.logger.error(
        `Save new product ${JSON.stringify(product.toJSON())} ${error.message} ${error.stack}`,
      );
      throw new ServerError(`Failed to create record in database`);
    }
  }

  async findAll(): Promise<IProduct[]> {
    this.logger.info(`findAll repository`);
    try {
      const records: IProduct[] = await Product.find({
        isActive: true,
      })
        .populate('category')
        .sort('id');
      return records;
    } catch (error: any) {
      this.logger.error(`findAll repository ${error.message} ${error.stack}`);
      throw new ServerError(`Failed to fetch records from database`);
    }
  }

  async findById(id: string): Promise<IProduct | null> {
    this.logger.info(`findById repository id: ${id}`);
    try {
      const record: IProduct | null = await Product.findById(id, {
        isActive: true,
      })
        .select('name description createdAt updatedAt')
        .populate('category');
      if (!record) {
        return null;
      }
      return record;
    } catch (error: any) {
      this.logger.error(
        `findById repository id: ${id} ${error.message} ${error.stack}`,
      );
      throw new ServerError(`Failed to fetch record from database`);
    }
  }

  async deleteById(id: string): Promise<void> {
    this.logger.info(`deleteById repository id: ${id}`);
    try {
      await Product.findByIdAndUpdate(id, {
        isActive: false,
      });
    } catch (error: any) {
      this.logger.error(
        `deleteById repository id: ${id} ${error.message} ${error.stack}`,
      );
      throw new ServerError(`Failed to delete record from database`);
    }
  }
}

export { ProductRepository };

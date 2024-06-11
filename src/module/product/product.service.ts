import { ProductRepository } from './product.repository';
import { ILoggerService } from '../../logger';
import {
  ProductCreateDto,
  ProductResponseHttpDto,
  ProductResponseDatabaseDto,
} from './dto';
import { Product, IProduct } from './../../model/schema';
import { ResponseCategoryDto } from '../category/dto';
import { NotAcceptableError } from '../../errors';

class ProductService {
  private logger: ILoggerService;
  private productRepository: ProductRepository;
  constructor(logger: ILoggerService, productRepository: ProductRepository) {
    this.logger = logger;
    this.productRepository = productRepository;
  }
  async createProduct(
    productCreateDto: ProductCreateDto,
  ): Promise<ProductResponseHttpDto> {
    this.logger.info(
      `createProduct service: productCreateDto: ${JSON.stringify(productCreateDto)}`,
    );
    try {
      const product: IProduct = new Product({
        name: productCreateDto.getName(),
        description: productCreateDto.getDescription(),
        category: productCreateDto.getCategoryId(),
      });
      const createdProduct: IProduct =
        await this.productRepository.save(product);
      const response: ProductResponseHttpDto = await this.getProductById(
        createdProduct.toJSON()._id,
      );
      return response;
    } catch (error: any) {
      this.logger.error(
        `createProduct service: productCreateDto: ${JSON.stringify(productCreateDto)} ${error.message} ${error.stack}`,
      );
      throw error;
    }
  }
  async getProducts(): Promise<ProductResponseHttpDto[]> {
    this.logger.info(`getProducts service`);
    try {
      const products: IProduct[] = await this.productRepository.findAll();
      const responseProducts: ProductResponseHttpDto[] = products.map(
        (product: IProduct) => this.getProjectHttpResponse(product),
      );

      return responseProducts;
    } catch (error: any) {
      this.logger.error(`getProducts service ${error.message} ${error.stack}`);
      throw error;
    }
  }

  async getProductById(id: string): Promise<ProductResponseHttpDto> {
    this.logger.info(`getProductById service id: ${id}`);
    try {
      const product: IProduct | null =
        await this.productRepository.findById(id);
      if (!product) {
        throw new NotAcceptableError(`Product not found`);
      }
      const responseProduct: ProductResponseHttpDto =
        this.getProjectHttpResponse(product);

      return responseProduct;
    } catch (error: any) {
      this.logger.error(
        `getProductById service id: ${id} ${error.message} ${error.stack}`,
      );
      throw error;
    }
  }

  async deleteProductById(id: string): Promise<void> {
    this.logger.info(`deleteProductById service id: ${id}`);
    try {
      await this.productRepository.deleteById(id);
    } catch (error: any) {
      this.logger.error(
        `deleteProductById service id: ${id} ${error.message} ${error.stack}`,
      );
      throw error;
    }
  }

  private getProjectHttpResponse(product: IProduct): ProductResponseHttpDto {
    const productResponseDatabaseDto: ProductResponseDatabaseDto =
      ProductResponseDatabaseDto.build(product);
    const responseCategoryDto: ResponseCategoryDto = ResponseCategoryDto.build(
      product.category,
    );
    return ProductResponseHttpDto.build(
      productResponseDatabaseDto,
      responseCategoryDto,
    );
  }
}

export { ProductService };

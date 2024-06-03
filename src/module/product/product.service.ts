import { ProductRepository } from './product.repository';
import { Product } from '../../model/schema';
import { NotFoundError, ServerError } from '../../errors';
import {
  ProductResponseHttpDto,
  ProductResponseDatabaseDto,
  ProductCreateDto,
} from './dto';

import { ResponseCategoryDto } from '../category/dto';

class ProductService {
  private productRepository: ProductRepository;
  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async createProduct(
    createProductDto: ProductCreateDto,
  ): Promise<ProductResponseHttpDto> {
    const product: Product = Product.build(createProductDto.toJSON());
    const newProduct: any = await this.productRepository.save(product);
    if (!newProduct) {
      throw new ServerError(`Failed to save new product`);
    }
    const productAndCategory: Product | null =
      await this.productRepository.findById(newProduct.id);
    if (!productAndCategory) {
      throw new ServerError(`Failed to save new product`);
    }
    return this.getProjectHttpResponse(productAndCategory);
  }

  async getProducts(): Promise<ProductResponseHttpDto[]> {
    const products: Product[] = await this.productRepository.findAll();
    const responseProducts: ProductResponseHttpDto[] = products.map(
      (product: Product) => this.getProjectHttpResponse(product),
    );

    return responseProducts;
  }

  async getProductById(id: string): Promise<ProductResponseHttpDto> {
    const product: Product | null = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundError(`Product not found`);
    }
    return this.getProjectHttpResponse(product);
  }

  async deleteProductById(id: string): Promise<void> {
    await this.productRepository.deleteById(id);
  }

  private getProjectHttpResponse(product: Product): ProductResponseHttpDto {
    const productResponseDatabaseDto: ProductResponseDatabaseDto =
      ProductResponseDatabaseDto.build(product);
    const responseCategoryDto: ResponseCategoryDto = ResponseCategoryDto.build(
      product.categoryData,
    );
    return ProductResponseHttpDto.build(
      productResponseDatabaseDto,
      responseCategoryDto,
    );
  }
}

export { ProductService };

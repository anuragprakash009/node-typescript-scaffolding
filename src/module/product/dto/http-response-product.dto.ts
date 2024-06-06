import { ResponseCategoryDto } from '../../category/dto';
import { ProductResponseDatabaseDto } from './db-response-product.dto';

class ProductResponseHttpDto {
  private categoryResponseDto: ResponseCategoryDto | null;
  private productResponseDatabaseDto: ProductResponseDatabaseDto | null;

  constructor() {
    this.categoryResponseDto = null;
    this.productResponseDatabaseDto = null;
  }

  static build(
    productResponseDatabaseDto: ProductResponseDatabaseDto,
    categoryResponseDto: ResponseCategoryDto,
  ): ProductResponseHttpDto {
    const productResponseHttpDto: ProductResponseHttpDto =
      new ProductResponseHttpDto();

    productResponseHttpDto.setCategoryResponseDto(categoryResponseDto);
    productResponseHttpDto.setProductResponseDatabase(
      productResponseDatabaseDto,
    );

    return productResponseHttpDto;
  }

  private setProductResponseDatabase(
    productResponseDatabaseDto: ProductResponseDatabaseDto,
  ): void {
    this.productResponseDatabaseDto = productResponseDatabaseDto;
  }

  private setCategoryResponseDto(
    categoryResponseDto: ResponseCategoryDto,
  ): void {
    this.categoryResponseDto = categoryResponseDto;
  }
  toJSON() {
    return {
      ...this.productResponseDatabaseDto?.toJSON(),
      category: this.categoryResponseDto?.toJSON(),
    };
  }
}

export { ProductResponseHttpDto };

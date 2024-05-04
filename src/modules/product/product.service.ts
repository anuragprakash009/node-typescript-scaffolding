import { ProductHelper } from "./product.helper";
import { ProductRepository } from "./product.repository";

class ProductService {
  private productHelper: ProductHelper;
  private productRepository: ProductRepository;
  constructor(
    productHelper: ProductHelper,
    productRepository: ProductRepository
  ) {
    this.productHelper = productHelper;
    this.productRepository = productRepository;
  }

  async getProducts(): Promise<Product[]> {
    try {
    } catch (error) {}
  }
}

export { ProductService };

// import { ProductHelper } from "./product.helper";
// import { ProductRepository } from "./product.repository";

class ProductService {
  // private productHelper: ProductHelper;
  // private productRepository: ProductRepository;
  constructor() { // productRepository: ProductRepository // productHelper: ProductHelper,
    // this.productHelper = productHelper;
    // this.productRepository = productRepository;
  }

  getProducts(): Object {
    try {
      return {
        id: "1",
        name: "Product",
      };
    } catch (error) {
      throw error;
    }
  }
}

export { ProductService };

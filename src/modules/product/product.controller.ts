import { Request, Response } from "express";
import { ProductService } from "./product.service";

class ProductController {
  private productService: ProductService;
  constructor(productService: ProductService) {
    this.productService = productService;
  }

  async getProducts(req: Request, res: Response): Promise<Product[]> {
    try {
    } catch (error) {}
  }
}

export { ProductController };

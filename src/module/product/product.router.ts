import express, { Router } from 'express';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
// import { ProductRepository } from "./product.repository";
// import { ProductHelper } from "./product.helper";

const productRouter: Router = express.Router();
// const productRepository: ProductRepository = new ProductRepository();
// const productHelper: ProductHelper = new ProductHelper();
const productService: ProductService = new ProductService();
// productHelper,
// productRepository
const productController: ProductController = new ProductController(
  productService,
);
productRouter.get('/', productController.getProducts);

export { productRouter };

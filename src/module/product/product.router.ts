import express, { Router } from 'express';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';

const productRouter: Router = express.Router();
const productRepository: ProductRepository = new ProductRepository();
const productService: ProductService = new ProductService(productRepository);
const productController: ProductController = new ProductController(
  productService,
);
productRouter.post('/', productController.createProduct);
productRouter.get('/', productController.getProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.delete('/:id', productController.deleteProductById);

export { productRouter };

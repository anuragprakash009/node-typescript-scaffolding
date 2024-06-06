import express, { Router } from 'express';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { ILoggerService, WinstonLogger } from '../../logger';

const productRouter: Router = express.Router();
const logger: ILoggerService = WinstonLogger.getInstance();

const productRepository: ProductRepository = new ProductRepository(logger);
const productService: ProductService = new ProductService(
  logger,
  productRepository,
);

const productController: ProductController = new ProductController(
  logger,
  productService,
);

productRouter.post('/', productController.createProduct);
productRouter.get('/', productController.getProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.delete('/:id', productController.deleteProductById);

export { productRouter };

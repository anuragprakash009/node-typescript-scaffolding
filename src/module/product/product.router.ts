import express, { Router } from 'express';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { JwtTokenAuth } from '../auth/auth.service';
const jwtTokenAuth: JwtTokenAuth = JwtTokenAuth.getInstance();

// import { ProductRepository } from "./product.repository";
// import { ProductHelper } from "./product.helper";

const router: Router = express.Router();
// const productRepository: ProductRepository = new ProductRepository();
// const productHelper: ProductHelper = new ProductHelper();
const productService: ProductService = new ProductService();
// productHelper,
// productRepository
const productController: ProductController = new ProductController(
  productService,
);
router.get(
  '/',
  jwtTokenAuth.authenticateTokenMiddleWare,
  productController.getProducts,
);

export { router as productRouters };

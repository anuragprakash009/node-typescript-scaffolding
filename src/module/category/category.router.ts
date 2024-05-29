import express, { Router } from 'express';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';

const repository: CategoryRepository = new CategoryRepository();
const service: CategoryService = new CategoryService(repository);
const controller: CategoryController = new CategoryController(service);

const categoryRouter: Router = express.Router();

categoryRouter.post('/', controller.createCategory);
categoryRouter.get('/', controller.getAllCategories);
categoryRouter.get('/:id', controller.getCategoryById);
categoryRouter.put('/:id', controller.updateCategory);
categoryRouter.delete('/:id', controller.deleteCategory);

export { categoryRouter };

import express, { Router } from 'express';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { WinstonLogger, LoggerService } from '../../logger';

const logger: LoggerService = WinstonLogger.getInstance();
const repository: CategoryRepository = new CategoryRepository(logger);
const service: CategoryService = new CategoryService(logger, repository);
const controller: CategoryController = new CategoryController(logger, service);

const categoryRouter: Router = express.Router();

categoryRouter.post('/', controller.createCategory);
// categoryRouter.get('/', controller.getAllCategories);
// categoryRouter.get('/:id', controller.getCategoryById);
// categoryRouter.put('/:id', controller.updateCategory);
// categoryRouter.delete('/:id', controller.deleteCategory);

export { categoryRouter };

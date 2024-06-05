import { HydratedDocument } from 'mongoose';
import {
  CreateCategoryDto,
  // UpdateCategoryDto,
  // ResponseCategoryDto,
} from './dto';
import { CategoryRepository } from './category.repository';
import { Category, ICategory } from '../../model/schema';
//import { NotFoundError } from '../../errors';
import { ILoggerService } from '../../logger';

class CategoryService {
  private categoryRepository: CategoryRepository;
  private logger: ILoggerService;
  constructor(logger: ILoggerService, categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
    this.logger = logger;
  }
  async createCategory(createCategoryDto: CreateCategoryDto): Promise<any> {
    this.logger.info(
      `createCategory service Dto: ${JSON.stringify(createCategoryDto)}`,
    );
    try {
      let category: HydratedDocument<ICategory> = new Category(
        createCategoryDto.toJSON(),
      );

      const newCategory: ICategory =
        await this.categoryRepository.save(category);

      // const createdCategory: ICategory = await this.getCategoryById(
      //   newCategory._id,
      // );

      // const response: ResponseCategoryDto =
      //   ResponseCategoryDto.build(createdCategory);

      console.log(newCategory);

      return newCategory;
    } catch (error: any) {
      this.logger.error(
        `createCategory service Dto: ${JSON.stringify(createCategoryDto)} ${error.message} ${error.stack}`,
      );
      throw error;
    }
  }

  // async getAllCategories(): Promise<ResponseCategoryDto[]> {
  //   const categories: Category[] = await this.categoryRepository.findAll();
  //   const responseCategories: ResponseCategoryDto[] = categories.map(
  //     (category) => ResponseCategoryDto.build(category),
  //   );
  //   return responseCategories;
  // }

  // async getCategoryById(id: string): Promise<ResponseCategoryDto> {
  //   const category: Category | null =
  //     await this.categoryRepository.findById(id);
  //   if (!category) {
  //     throw new NotFoundError(`Category not found`);
  //   }
  //   const response: ResponseCategoryDto = ResponseCategoryDto.build(category);
  //   return response;
  // }

  // async updateCategory(
  //   id: string,
  //   updateData: UpdateCategoryDto,
  // ): Promise<ResponseCategoryDto> {
  //   await this.categoryRepository.updateById(id, updateData.toJSON());
  //   const response: ResponseCategoryDto = await this.getCategoryById(id);
  //   return response;
  // }
  // async deleteCategory(id: string): Promise<void> {
  //   await this.categoryRepository.deleteById(id);
  // }
}

export { CategoryService };

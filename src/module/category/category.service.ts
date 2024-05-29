import {
  CreateCategoryDto,
  UpdateCategoryDto,
  ResponseCategoryDto,
} from './dto';
import { CategoryRepository } from './category.repository';
import { Category } from '../../model/schema';
import { NotFoundError } from '../../errors';

class CategoryService {
  private categoryRepository: CategoryRepository;
  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ResponseCategoryDto> {
    try {
      let category = Category.build(createCategoryDto.toJSON());
      const newCategory: Category =
        await this.categoryRepository.save(category);
      const response: ResponseCategoryDto =
        ResponseCategoryDto.build(newCategory);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getAllCategories(): Promise<ResponseCategoryDto[]> {
    const categories: Category[] = await this.categoryRepository.findAll();
    const responseCategories: ResponseCategoryDto[] = categories.map(
      (category) => ResponseCategoryDto.build(category),
    );
    return responseCategories;
  }

  async getCategoryById(id: string): Promise<ResponseCategoryDto> {
    const category: Category | null =
      await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundError(`Category not found`);
    }
    const response: ResponseCategoryDto = ResponseCategoryDto.build(category);
    return response;
  }

  async updateCategory(
    id: string,
    updateData: UpdateCategoryDto,
  ): Promise<ResponseCategoryDto> {
    await this.categoryRepository.updateById(id, updateData.toJSON());
    const response: ResponseCategoryDto = await this.getCategoryById(id);
    return response;
  }

  async deleteCategory(id: string): Promise<void> {
    await this.categoryRepository.deleteById(id);
  }
}

export { CategoryService };

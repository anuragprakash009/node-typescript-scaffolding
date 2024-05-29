import { CreateCategoryDto, UpdateCategoryDto } from './dto';
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
  ): Promise<Category> {
    try {
      let category = Category.build(createCategoryDto.toJSON());
      const newCategory: Category =
        await this.categoryRepository.save(category);
      return newCategory;
    } catch (error) {
      throw error;
    }
  }
  async getAllCategories(): Promise<Category[]> {
    const categories: Category[] = await this.categoryRepository.findAll();
    return categories;
  }

  async getCategoryById(id: string): Promise<Category> {
    const category: Category | null =
      await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundError(`Category not found`);
    }
    return category;
  }

  async updateCategory(
    id: string,
    updateData: UpdateCategoryDto,
  ): Promise<Category> {
    await this.categoryRepository.updateById(id, updateData.toJSON());
    const category: Category = await this.getCategoryById(id);
    return category;
  }

  async deleteCategory(id: string): Promise<void> {
    await this.categoryRepository.deleteById(id);
  }
}

export { CategoryService };

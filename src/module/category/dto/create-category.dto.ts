import { UnprocessableEntityError, HttpError } from '../../../errors';

class CreateCategoryDto {
  private name: string;
  constructor() {
    this.name = '';
  }
  static build(data: any): CreateCategoryDto {
    try {
      const createCategory: CreateCategoryDto = new CreateCategoryDto();
      createCategory.setName(data.name);
      return createCategory;
    } catch (error: any) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new UnprocessableEntityError(error.message);
    }
  }
  private setName(name: string): void {
    // Add other validation logic by using lib such as joi or zod
    // If validation fails throw new UnprocessableEntityError('Error Message')
    // Modify or change the datatype if required
    if (!name) {
      throw new UnprocessableEntityError(`Name is required`);
    }
    this.name = name;
  }
  toJSON() {
    return {
      name: this.name,
    };
  }
}

export { CreateCategoryDto };

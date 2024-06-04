import { UnprocessableEntityError } from '../../../errors';

class UpdateCategoryDto {
  private name: string;
  constructor() {
    this.name = '';
  }
  static build(data: any): UpdateCategoryDto {
    try {
      const updatedCategory: UpdateCategoryDto = new UpdateCategoryDto();
      updatedCategory.setName(data.name);
      return updatedCategory;
    } catch (error: any) {
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

export { UpdateCategoryDto };

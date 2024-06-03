import { UnprocessableEntityError, HttpError } from '../../../errors';

class ProductCreateDto {
  private name: string;
  private description: string;
  private categoryId: string;
  constructor() {
    this.name = '';
    this.description = '';
    this.categoryId = '';
  }
  static build(data: any): ProductCreateDto {
    try {
      const createProduct: ProductCreateDto = new ProductCreateDto();
      createProduct.setName(data.name);
      createProduct.setCategoryId(data.categoryId);
      createProduct.setDescription(data.description);
      return createProduct;
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

  private setCategoryId(categoryId: string) {
    // Add other validation logic by using lib such as joi or zod
    // If validation fails throw new UnprocessableEntityError('Error Message')
    // Modify or change the datatype if required
    if (!categoryId) {
      throw new UnprocessableEntityError(`Description is required`);
    }
    this.categoryId = categoryId;
  }

  private setDescription(desc: string) {
    // Add other validation logic by using lib such as joi or zod
    // If validation fails throw new UnprocessableEntityError('Error Message')
    // Modify or change the datatype if required
    if (!desc) {
      throw new UnprocessableEntityError(`Description is required`);
    }
    this.description = desc;
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
      categoryId: this.categoryId,
    };
  }
}

export { ProductCreateDto };

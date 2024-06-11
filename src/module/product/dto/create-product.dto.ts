import { UnprocessableEntityError } from '../../../errors';

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
      const productCreateDto: ProductCreateDto = new ProductCreateDto();
      productCreateDto.setName(data.name);
      productCreateDto.setDescription(data.description);
      productCreateDto.setCategoryId(data.categoryId);
      return productCreateDto;
    } catch (error: any) {
      throw new UnprocessableEntityError(error.message);
    }
  }
  public getName(): string {
    return this.name;
  }
  public getDescription(): string {
    return this.description;
  }

  public getCategoryId(): string {
    return this.categoryId;
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
  private setDescription(description: string): void {
    // Add other validation logic by using lib such as joi or zod
    // If validation fails throw new UnprocessableEntityError('Error Message')
    // Modify or change the datatype if required
    if (!description) {
      throw new UnprocessableEntityError(`Description is required`);
    }
    this.description = description;
  }

  private setCategoryId(categoryId: string): void {
    // Add other validation logic by using lib such as joi or zod
    // If validation fails throw new UnprocessableEntityError('Error Message')
    // Modify or change the datatype if required
    if (!categoryId) {
      throw new UnprocessableEntityError(`Category Id is required`);
    }
    this.categoryId = categoryId;
  }
  toJSON() {
    return {
      name: this.name,
      description: this.description,
      category: this.categoryId,
    };
  }
}

export { ProductCreateDto };

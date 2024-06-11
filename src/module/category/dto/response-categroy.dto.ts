import { ServerError } from '../../../errors';

class ResponseCategoryDto {
  private id: string;
  private name: string;
  private createdAt: Date | null;
  private updatedAt: Date | null;
  constructor() {
    this.id = '';
    this.name = '';
    this.createdAt = null;
    this.updatedAt = null;
  }
  static build(data: any): ResponseCategoryDto {
    try {
      const responseCategory: ResponseCategoryDto = new ResponseCategoryDto();
      responseCategory.setName(data.name);
      responseCategory.setId(data._id);
      responseCategory.setCreatedAt(data.createdAt);
      responseCategory.setUpdatedAt(data.updatedAt);
      return responseCategory;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  private setName(name: string): void {
    if (!name) {
      throw new ServerError(`name is null`);
    }
    this.name = name;
  }
  private setId(id: string) {
    if (!id) {
      throw new ServerError(`id is null`);
    }
    this.id = id;
  }
  private setCreatedAt(date: Date) {
    if (!date) {
      throw new ServerError(`created date is null`);
    }
    this.createdAt = date;
  }
  private setUpdatedAt(date: Date) {
    if (!date) {
      throw new ServerError(`updated date is null`);
    }
    this.updatedAt = date;
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export { ResponseCategoryDto };

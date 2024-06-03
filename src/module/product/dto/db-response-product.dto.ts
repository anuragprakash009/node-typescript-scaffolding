class ProductResponseDatabaseDto {
  private id: string;
  private name: string;
  private description: string;
  private categoryId: string;
  private createdAt: Date | null;
  private updatedAt: Date | null;
  constructor() {
    this.id = '';
    this.name = '';
    this.description = '';
    this.categoryId = '';
    this.createdAt = null;
    this.updatedAt = null;
  }
  static build(data: any): ProductResponseDatabaseDto {
    const productResponseDatabase: ProductResponseDatabaseDto =
      new ProductResponseDatabaseDto();
    productResponseDatabase.setId(data.id);
    productResponseDatabase.setName(data.name);
    productResponseDatabase.setDescription(data.description);
    productResponseDatabase.setCategoryId(data.categoryId);
    productResponseDatabase.setCreatedAt(data.createdAt);
    productResponseDatabase.setUpdatedAt(data.updatedAt);
    return productResponseDatabase;
  }

  public getId(): string {
    return this.id;
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

  private setId(id: string): void {
    this.id = id;
  }

  private setName(name: string): void {
    this.name = name;
  }

  private setDescription(description: string): void {
    this.description = description;
  }

  private setCategoryId(categoryId: string): void {
    this.categoryId = categoryId;
  }
  public getCreatedAt(): Date | null {
    return this.createdAt;
  }

  public getUpdatedAt(): Date | null {
    return this.updatedAt;
  }

  private setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  private setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
  toJSON(): Object {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      categoryId: this.categoryId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export { ProductResponseDatabaseDto };

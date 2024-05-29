import { Request, Response } from 'express';
import { CategoryService } from './category.service';
import { BadRequestError, HttpError } from '../../errors';
import { APP_CONSTANT, HTTP } from '../../constant';
import { HttpResponse } from '../../model/type';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  ResponseCategoryDto,
} from './dto';

class CategoryController {
  private categoryService: CategoryService;
  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;

    this.createCategory = this.createCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
    this.getCategoryById = this.getCategoryById.bind(this);
  }

  async createCategory(req: Request, res: Response): Promise<Response> {
    try {
      const body: Object = req.body;
      if (!body) {
        throw new BadRequestError(`Request body is required`);
      }

      const createCategoryDto: CreateCategoryDto =
        CreateCategoryDto.build(body);

      const data: ResponseCategoryDto =
        await this.categoryService.createCategory(createCategoryDto);
      const httpReponse: HttpResponse<ResponseCategoryDto> = new HttpResponse(
        'Category created successfully',
        data,
      );
      return res.send(httpReponse.toJSON());
    } catch (error) {
      return this.throwError(res, error);
    }
  }
  async getAllCategories(req: Request, res: Response): Promise<Response> {
    try {
      const {} = req;
      const data: ResponseCategoryDto[] =
        await this.categoryService.getAllCategories();
      const httpReponse: HttpResponse<ResponseCategoryDto[]> = new HttpResponse(
        'Categories fetched successfully',
        data,
      );
      return res.send(httpReponse.toJSON());
    } catch (error) {
      return this.throwError(res, error);
    }
  }
  async getCategoryById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const data = await this.categoryService.getCategoryById(id);
      const httpReponse: HttpResponse<ResponseCategoryDto> = new HttpResponse(
        'Category fetched successfully',
        data,
      );
      return res.send(httpReponse.toJSON());
    } catch (error) {
      return this.throwError(res, error);
    }
  }

  async updateCategory(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const body: Object = req.body;
      if (!body) {
        throw new BadRequestError(`Request body is required`);
      }

      const updateCategoryDto: UpdateCategoryDto =
        UpdateCategoryDto.build(body);
      const data = await this.categoryService.updateCategory(
        id,
        updateCategoryDto,
      );
      const httpReponse: HttpResponse<ResponseCategoryDto> = new HttpResponse(
        'Category updated successfully',
        data,
      );
      return res.send(httpReponse.toJSON());
    } catch (error) {
      return this.throwError(res, error);
    }
  }

  async deleteCategory(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const data = await this.categoryService.deleteCategory(id);
      const httpReponse: HttpResponse<any> = new HttpResponse(
        'Category deleted successfully',
        data,
      );
      return res.send(httpReponse.toJSON());
    } catch (error) {
      return this.throwError(res, error);
    }
  }
  private throwError(res: Response, error: any): Response {
    if (error instanceof HttpError) {
      return res.status(error.getErrorStatusCode()).json({
        message: error.getErrorMessage(),
        data: null,
      });
    }
    return res.status(HTTP.RESPONSE_CODE.INTERNAL_SERVER_ERROR).json({
      message: APP_CONSTANT.MESSAGE.ERROR.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
}

export { CategoryController };

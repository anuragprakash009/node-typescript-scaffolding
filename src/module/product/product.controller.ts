import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { BadRequestError, HttpError } from '../../errors';
import { APP_CONSTANT, HTTP } from '../../constant';
import { HttpResponse } from '../../model/type';
import { ProductCreateDto, ProductResponseHttpDto } from './dto';

class ProductController {
  private productService: ProductService;
  constructor(productService: ProductService) {
    this.productService = productService;
    this.createProduct = this.createProduct.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getProductById = this.getProductById.bind(this);
    this.deleteProductById = this.deleteProductById.bind(this);
  }

  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;
      if (!body) {
        throw new BadRequestError(`Payload is required`);
      }
      const createProductDto: ProductCreateDto = ProductCreateDto.build(body);
      const data: ProductResponseHttpDto =
        await this.productService.createProduct(createProductDto);

      const response: HttpResponse<ProductResponseHttpDto> = new HttpResponse(
        `Product created`,
        data,
      );
      return res.send(response.toJSON());
    } catch (error) {
      return this.throwError(res, error);
    }
  }

  async getProducts(req: Request, res: Response): Promise<Response> {
    try {
      const {} = req.query;
      const data: ProductResponseHttpDto[] =
        await this.productService.getProducts();

      const httpResponse: HttpResponse<ProductResponseHttpDto[]> =
        new HttpResponse(`Fetched products`, data);

      return res.send(httpResponse.toJSON());
    } catch (error) {
      return this.throwError(res, error);
    }
  }

  async getProductById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const data: ProductResponseHttpDto =
        await this.productService.getProductById(id);

      const httpResponse: HttpResponse<ProductResponseHttpDto> =
        new HttpResponse(`Fetched product`, data);

      return res.send(httpResponse.toJSON());
    } catch (error) {
      return this.throwError(res, error);
    }
  }

  async deleteProductById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      await this.productService.deleteProductById(id);

      const httpResponse: HttpResponse<null> = new HttpResponse(
        `Deleted product`,
        null,
      );

      return res.send(httpResponse.toJSON());
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

export { ProductController };

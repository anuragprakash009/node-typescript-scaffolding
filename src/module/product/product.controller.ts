import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { BadRequestError, HttpError } from '../../errors';
import { APP_CONSTANT, HTTP } from '../../constant';
import { HttpResponse } from '../../model/type';
import { ILoggerService } from '../../logger';
import { ProductCreateDto, ProductResponseHttpDto } from './dto';

class ProductController {
  private productService: ProductService;
  private logger: ILoggerService;
  constructor(logger: ILoggerService, productService: ProductService) {
    this.logger = logger;
    this.productService = productService;
    this.createProduct = this.createProduct.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getProductById = this.getProductById.bind(this);
    this.deleteProductById = this.deleteProductById.bind(this);
  }

  async createProduct(req: Request, res: Response): Promise<Response> {
    this.logger.info(
      `createProduct controller: req body: ${JSON.stringify(req.body)}`,
    );
    try {
      const data = req.body;
      if (!data) {
        throw new BadRequestError(`Request body is required`);
      }
      const productCreateDto: ProductCreateDto = ProductCreateDto.build(data);
      const response: ProductResponseHttpDto =
        await this.productService.createProduct(productCreateDto);
      const httpResponse: HttpResponse<ProductResponseHttpDto> =
        new HttpResponse(`Created product`, response);

      return res.send(httpResponse.toJSON());
    } catch (error: any) {
      this.logger.error(
        `createProduct controller: req body: ${JSON.stringify(req.body)} ${error.message} ${error.stack}`,
      );
      return this.throwError(res, error);
    }
  }

  async getProducts(req: Request, res: Response): Promise<Response> {
    this.logger.info(
      `getProducts controller: req query: ${JSON.stringify(req.query)}`,
    );
    try {
      const {} = req.query;
      const products: ProductResponseHttpDto[] =
        await this.productService.getProducts();

      const httpResponse: HttpResponse<ProductResponseHttpDto[]> =
        new HttpResponse(`Fetched products`, products);

      return res.send(httpResponse.toJSON());
    } catch (error: any) {
      this.logger.error(
        `getProducts controller: req body: ${JSON.stringify(req.query)} ${error.message} ${error.stack}`,
      );
      return this.throwError(res, error);
    }
  }

  async getProductById(req: Request, res: Response): Promise<Response> {
    this.logger.info(
      `getProductById controller: req query: ${JSON.stringify(req.params)}`,
    );
    try {
      const { id } = req.params;
      const product: ProductResponseHttpDto =
        await this.productService.getProductById(id);

      const httpResponse: HttpResponse<ProductResponseHttpDto> =
        new HttpResponse(`Fetched product`, product);

      return res.send(httpResponse.toJSON());
    } catch (error: any) {
      this.logger.error(
        `getProductById controller: req body: ${JSON.stringify(req.params)} ${error.message} ${error.stack}`,
      );
      return this.throwError(res, error);
    }
  }

  async deleteProductById(req: Request, res: Response): Promise<Response> {
    this.logger.info(
      `deleteProductById controller: req query: ${JSON.stringify(req.params)}`,
    );
    try {
      const { id } = req.params;
      await this.productService.deleteProductById(id);
      const httpResponse: HttpResponse<null> = new HttpResponse(
        `Deleted product`,
        null,
      );

      return res.send(httpResponse.toJSON());
    } catch (error: any) {
      this.logger.error(
        `deleteProductById controller: req body: ${JSON.stringify(req.params)} ${error.message} ${error.stack}`,
      );
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

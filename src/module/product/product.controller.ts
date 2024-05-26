import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { HttpError } from '../../errors';
import { APP_CONSTANT, HTTP } from '../../constant';
import { HttpResponse } from '../../model/type';

class ProductController {
  private productService: ProductService;
  constructor(productService: ProductService) {
    this.productService = productService;
    this.getProducts = this.getProducts.bind(this);
  }

  async getProducts(req: Request, res: Response): Promise<Response> {
    try {
      const {} = req;
      const data = this.productService.getProducts();
      const httpReponse: HttpResponse<Object> = new HttpResponse(
        'Product fetched successfully',
        data,
      );
      return res.send(httpReponse.toJSON());
    } catch (error) {
      return this.throwError(res, error);
    }
  }

  throwError(res: Response, error: any): Response {
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

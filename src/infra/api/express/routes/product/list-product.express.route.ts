import { Request, Response } from "express";
import {
  ListProductInputDto,
  ListProductOutputDto,
  ListProductUsecase,
} from "../../../../../usecases/list-product/list-product.usecase";
import { HttpMethod, Route } from "../route";

export type ListProductResponseDto = {
  products: {
    id: string;
    name: string;
    price: number;
  }[];
};

export class ListProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listProductService: ListProductUsecase
  ) {}

  public getHandler() {
    return async (request: Request, response: Response) => {
      const input: ListProductInputDto = void 0;
      const output = await this.listProductService.execute();
      const responseBody = this.present(output);
      response.json(responseBody).status(200).send();
    };
  }

  private present(input: ListProductOutputDto): ListProductResponseDto {
    const response: ListProductResponseDto = {
      products: input.products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };

    return response;
  }
  getPath(): string {
    return this.path;
  }

  getMethod(): HttpMethod {
    return this.method;
  }

  public static create(listProductService: ListProductUsecase) {
    return new ListProductRoute(
      "/products",
      HttpMethod.GET,
      listProductService
    );
  }
}

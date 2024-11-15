import {
  CreateProductInputDto,
  CreateProductUseCase,
} from "../../../../../usecases/create-product/create-product.usecase";
import { HttpMethod, Route } from "../route";
import { Request, Response } from "express";

export type CreateProductResponseDto = {
  id: string; // Define o tipo de resposta, contendo apenas o ID do produto criado
};

export class CreateProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createProductService: CreateProductUseCase // Serviço responsável pela criação de produtos
  ) {}

  // Métodos que devem ser implementados, mas ainda não estão definidos
  getPath(): string {
    return this.path;
  }

  getMethod(): HttpMethod {
    return this.method;
  }

  // Método de fábrica para instanciar a rota de criação de produto com caminho e método definidos
  public static create(createProductService: CreateProductUseCase) {
    return new CreateProductRoute(
      "/products", // Define o caminho da rota
      HttpMethod.POST, // Define o método HTTP da rota
      createProductService
    );
  }

  // Retorna o handler da rota para processar a requisição
  public getHandler() {
    return async (request: Request, response: Response) => {
      const { name, price } = request.body; // Extrai dados do corpo da requisição

      const input: CreateProductInputDto = { name, price }; // Cria o DTO de entrada
      const output: CreateProductResponseDto =
        await this.createProductService.execute(input); // Executa o caso de uso

      const responseBody = this.present(output); // Prepara a resposta

      response.status(201).json(responseBody).send(); // Envia a resposta com status 201 (Criado)
    };
  }

  // Formata a resposta contendo o ID do produto criado
  private present(input: CreateProductResponseDto): CreateProductResponseDto {
    const response = { id: input.id };
    return response;
  }
}

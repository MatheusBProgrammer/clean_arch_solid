// Importa dependências e interfaces necessárias
import { Product } from "../../domain/product/entity/product.entity";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Usecase } from "../usecase";

// Define o tipo de entrada para criação de produto, contendo nome e preço
export type CreateProductInputDto = {
  name: string;
  price: number;
};

// Define o tipo de saída para criação de produto, contendo apenas o ID
export type CreateProductOutputDto = {
  id: string;
};

// Caso de uso para criar um produto
export class CreateProductUseCase
  implements Usecase<CreateProductInputDto, CreateProductOutputDto>
{
  // Construtor privado, só permite criação via método `create`
  private constructor(private readonly productGateway: ProductGateway) {}

  // Método de fábrica para instanciar `CreateProductUseCase`
  public static create(productGateway: ProductGateway) {
    return new CreateProductUseCase(productGateway);
  }

  // Executa a criação do produto e salva no repositório
  public async execute({
    name,
    price,
  }: CreateProductInputDto): Promise<CreateProductOutputDto> {
    const aProduct = Product.create(name, price); // Cria produto
    await this.productGateway.save(aProduct); // Salva produto
    return this.presentOutput(aProduct); // Retorna saída formatada
  }

  // Formata a saída com o ID do produto criado
  private presentOutput(product: Product): CreateProductOutputDto {
    return { id: product.id };
  }
}

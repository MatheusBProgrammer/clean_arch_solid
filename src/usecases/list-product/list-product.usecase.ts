import { Product } from "../../domain/product/entity/product.entity";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Usecase } from "../usecase";

//Tipo de entrada
export type ListProductInputDto = void;

//Tipo de saída para a listagem de produtos
export type ListProductOutputDto = {
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

export class ListProductUsecase
  implements Usecase<ListProductInputDto, ListProductOutputDto>
{
  //Função que vem do UseCase
  public async execute(
    input: ListProductInputDto //void
  ): Promise<ListProductOutputDto> {
    const aProducts = await this.producGateway.list();
    const output = this.presentOutput(aProducts);
    return output;
  }

  private constructor(private readonly producGateway: ProductGateway) {}

  public static create(producGateway: ProductGateway) {
    return new ListProductUsecase(producGateway);
  }

  private presentOutput(products: Product[]): ListProductOutputDto {
    return {
      products: products.map((p) => {
        return {
          id: "teste",
          name: "teste",
          price: 1,
          quantity: 0,
        };
      }),
    };
  }
}

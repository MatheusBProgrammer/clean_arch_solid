import { PrismaClient } from "@prisma/client";
import { Product } from "../../../domain/product/entity/product.entity";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";

// Classe que implementa o ProductGateway usando o Prisma como ORM para manipular dados de produtos no banco
export class ProductRepositoryPrisma implements ProductGateway {
  // Construtor privado para garantir que a classe seja instanciada usando o método estático create()
  private constructor(private readonly prismaClient: PrismaClient) {}

  // Método estático para criar uma instância da classe com o PrismaClient, garantindo a centralização do client
  public static create(prismaClient: PrismaClient) {
    return new ProductRepositoryPrisma(prismaClient);
  }

  // Método que salva um produto no banco de dados
  public async save(product: Product): Promise<void> {
    // Prepara os dados do produto em um formato que o Prisma espera
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };

    // Usa o Prisma para inserir um novo registro de produto no banco de dados
    await this.prismaClient.product.create({
      data: data,
    });
  }

  // Método que retorna todos os produtos armazenados no banco de dados
  public async list(): Promise<Product[]> {
    // `findMany` é um método do Prisma que recupera todos os registros da tabela especificada.
    // Neste caso, ele busca todos os produtos na tabela `product` e retorna como uma lista de objetos.
    return (await this.prismaClient.product.findMany()).map((p) =>
      // Mapeia cada registro para uma instância da entidade `Product`,
      // para garantir que os dados recuperados estejam no formato esperado pela aplicação
      Product.with({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
      })
    );
  }
}

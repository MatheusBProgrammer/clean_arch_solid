// Importa a entidade Product, que representa o produto no sistema
import { Product } from "../entity/product.entity";

// Define a interface ProductGateway, que serve como um "contrato" para operações de persistência de dados relacionadas a produtos
export interface ProductGateway {
  // Método save: responsável por salvar um produto no banco de dados
  // Recebe um objeto do tipo Product e retorna uma Promise que resolve quando a operação de salvamento for concluída
  save(product: Product): Promise<void>;

  // Método list: responsável por listar todos os produtos armazenados no banco de dados
  // Retorna uma Promise que resolve para um array de objetos Product
  // Isso permite que o sistema obtenha uma lista de produtos sem saber os detalhes de como ou onde os dados estão armazenados
  list(): Promise<Product[]>;
}

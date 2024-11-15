//1. Define as propriedades de um produto
export type ProductProps = {
  id: string; // Identificador único do produto
  name: string; // Nome do produto
  price: number; // Preço do produto
  quantity: number; // Quantidade do produto em estoque
};

//2. Define a classe Product, que representa um produto
export class Product {
  // Construtor privado que recebe as propriedades do produto (ProductProps)
  // A utilização do construtor privado impede a criação direta de instâncias da classe
  private constructor(private props: ProductProps) {}

  //3. Método estático 'create' para criar um produto com quantidade inicial igual a zero
  public static create(name: string, price: number) {
    // Gera um ID único para o produto usando a função 'crypto.randomUUID()'
    return new Product({
      id: crypto.randomUUID().toString(), // Gera um ID único
      name, // Define o nome do produto
      price, // Define o preço do produto
      quantity: 0, // Define a quantidade inicial como zero
    });
  }

  //4. Método estático 'with' que cria um produto usando propriedades (ProductProps) já definidas
  public static with(props: ProductProps) {
    return new Product(props);
  }

  /**
   * Método privado 'validate' que valida o produto
   * Nesse caso, verifica se a quantidade do produto é positiva
   * Atualmente, está comentado e não utilizado
   *
   * private validate() {
   *   if (this.props.quantity < 0) {
   *     throw new Error("Product quantity should be positive");
   *   }
   * }
   */

  //5. Getters para acessar as propriedades do produto de forma segura e controlada
  public get id() {
    return this.props.id; // Retorna o ID do produto
  }

  public get name() {
    return this.props.name; // Retorna o nome do produto
  }

  public get price() {
    return this.props.price; // Retorna o preço do produto
  }

  public get quantity() {
    return this.props.quantity; // Retorna a quantidade do produto
  }

  //6. Método para aumentar a quantidade do produto em um valor específico
  public increaseQuantity(quantity: number) {
    this.props.quantity += quantity;
  }

  //7. Método para diminuir a quantidade do produto em um valor específico
  public decreaseQuantity(quantity: number) {
    this.props.quantity -= quantity;
  }
}

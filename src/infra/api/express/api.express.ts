import { Api } from "../api";
import express, { Express } from "express";
import { Route } from "./routes/route";

// Classe ApiExpress que implementa a interface Api e configura um servidor Express
export class ApiExpress implements Api {
  // Atributo app, que representa a instância do servidor Express
  private app: Express;

  // Construtor privado que inicializa o servidor com um conjunto de rotas
  private constructor(routes: Route[]) {
    this.app = express(); // Cria a instância do servidor Express
    this.app.use(express.json()); // Configura o servidor para processar JSON nas requisições
    this.addRoutes(routes); // Adiciona as rotas ao servidor usando o método addRoutes
  }

  // Método estático de fábrica para criar uma instância de ApiExpress
  public static create(routes: Route[]) {
    return new ApiExpress(routes); // Retorna uma nova instância de ApiExpress com as rotas fornecidas
  }

  // Método privado que adiciona cada rota à instância do servidor
  private addRoutes(routes: Route[]) {
    // Para cada rota fornecida, executa o seguinte:
    routes.forEach((route) => {
      const path = route.getPath(); // Obtém o caminho da rota (ex.: "/products")
      const method = route.getMethod(); // Obtém o método HTTP (ex.: "GET", "POST")
      const handler = route.getHandler(); // Obtém a função que será chamada quando a rota for acessada
      this.app[method](path, handler); // Registra a rota no Express com o caminho, método e função fornecidos
    });
  }

  // Método público para iniciar o servidor em uma porta específica
  public start(port: number) {
    // Inicia o servidor na porta especificada
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`); // Exibe mensagem no console quando o servidor está ativo
      this.listRoutes(); // Chama o método listRoutes para exibir todas as rotas registradas no console
    });
  }

  // Método privado que exibe uma lista das rotas e métodos registrados no servidor
  private listRoutes() {
    const routes = this.app._router.stack
      .filter((route: any) => route.route) // Filtra apenas os elementos que representam rotas (descartando middlewares)
      .map((route: any) => {
        // Cria um novo objeto para cada rota com caminho e método HTTP
        return {
          path: route.route.path, // Caminho da rota
          method: route.route.stack[0].method,
          // Método HTTP da rota (ex.: "get", "post")
        };
      });
    console.log(routes); // Exibe no console a lista de rotas com seus caminhos e métodos
  }
}

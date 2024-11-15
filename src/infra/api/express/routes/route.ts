import { Request, Response } from "express"; // Importa os tipos Request e Response do Express, usados para tipagem nos handlers.

// Define o tipo HttpMethod, que aceita apenas os métodos HTTP "get" e "post".
export type HttpMethod = "get" | "post";

// Cria um objeto HttpMethod que associa os métodos HTTP "GET" e "POST" aos valores "get" e "post" correspondentes.
// Esse objeto permite usar HttpMethod.GET ou HttpMethod.POST ao invés de "get" e "post" diretamente.
export const HttpMethod = {
  GET: "get" as HttpMethod,
  POST: "post" as HttpMethod,
} as const;

// Define a interface Route, que serve como um contrato para criação de rotas em um servidor Express.
export interface Route {
  // Método para obter o handler da rota. O handler é uma função assíncrona que recebe
  // os objetos Request e Response do Express como parâmetros.
  // TypeScript define o tipo de retorno como uma Promise<void>, indicando que a função
  // é assíncrona e não retorna um valor específico (o retorno é vazio).
  // A sintaxe (request: Request, response: Response) => Promise<void> é uma "arrow function type annotation",
  // especificando o tipo da função que getHandler() deve retornar.´
  getHandler(): (request: Request, response: Response) => Promise<void>;

  // Método para obter o caminho da rota (exemplo: "/users", "/products").
  getPath(): string;

  // Método para obter o tipo de método HTTP da rota, retornando um HttpMethod (GET ou POST).
  getMethod(): HttpMethod;
}

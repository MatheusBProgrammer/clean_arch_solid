//3
//sua responsabilidade é encapsular a lógica de negócio da aplicação.

export interface Usecase<InputDto, OutputDto> {
  execute(input: InputDto): Promise<OutputDto>;
}

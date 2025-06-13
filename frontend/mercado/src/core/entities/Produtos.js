export class Produto {
  constructor({
    id = null,
    nome,
    descricao = "",
    preco,
    quantidade,
    codigo_barras,
  }) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.quantidade = quantidade;
    this.codigo_barras = codigo_barras;
  }
}

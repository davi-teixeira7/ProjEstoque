import ProdutoRepository from "../repositories/ProdutoRepository";
import { Produto } from "../entities/Produtos";

export default new (class ProdutoService {
  async buscarTodosProdutos() {
    const produtosData = await ProdutoRepository.getAll();
    return produtosData.map((data) => new Produto(data));
  }

  async buscarProdutoPorId(id) {
    const data = await ProdutoRepository.getById(id);
    return new Produto(data);
  }

  async adicionarProduto(produtoData) {
    const novoProduto = new Produto(produtoData);
    return await ProdutoRepository.create(novoProduto);
  }

  async atualizarProduto(id, produtoData) {
    const produtoAtualizado = new Produto(produtoData);
    return await ProdutoRepository.update(id, produtoAtualizado);
  }

  async deletarProduto(id) {
    return await ProdutoRepository.delete(id);
  }
})();

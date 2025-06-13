import { useParams } from "react-router-dom";
import { useFormProdutoController } from "../core/controllers/ProdutoController";

function EditarProduto() {
  const { id } = useParams();
  const { produto, loading, error, handleChange, handleSubmit } =
    useFormProdutoController(id);

  if (loading) {
    return (
      <p className="text-center text-gray-500">
        Carregando dados do produto...
      </p>
    );
  }

  return (
    // Container que centraliza o formulário
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Editar Produto</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* O formulário com fundo branco, padding e bordas arredondadas */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg border border-gray-200"
      >
        {/* Cada campo do formulário é uma div para controle de margem */}
        <div className="mb-4">
          <label
            htmlFor="nome"
            className="block text-gray-700 font-medium mb-1"
          >
            Nome do Produto
          </label>
          <input
            type="text"
            name="nome"
            id="nome"
            value={produto.nome}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="descricao"
            className="block text-gray-700 font-medium mb-1"
          >
            Descrição
          </label>
          <textarea
            name="descricao"
            id="descricao"
            value={produto.descricao}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="preco"
            className="block text-gray-700 font-medium mb-1"
          >
            Preço
          </label>
          <input
            type="number"
            name="preco"
            id="preco"
            value={produto.preco}
            onChange={handleChange}
            step="0.01"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="quantidade"
            className="block text-gray-700 font-medium mb-1"
          >
            Quantidade
          </label>
          <input
            type="number"
            name="quantidade"
            id="quantidade"
            value={produto.quantidade}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="codigo_barras"
            className="block text-gray-700 font-medium mb-1"
          >
            Código de Barras
          </label>
          <input
            type="text"
            name="codigo_barras"
            id="codigo_barras"
            value={produto.codigo_barras}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}

export default EditarProduto;

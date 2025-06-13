import { useFormProdutoController } from "../core/Controllers/ProdutoController";

export default function AdicionarProduto() {
  const { produto, error, handleChange, handleSubmit } =
    useFormProdutoController();

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Adicionar Novo Produto
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg border border-gray-200"
      >
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
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Adicionar Produto
        </button>
      </form>
    </div>
  );
}

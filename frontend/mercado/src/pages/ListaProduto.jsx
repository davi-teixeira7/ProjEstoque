import { Link } from "react-router-dom";
import { useListaProdutosController } from "../core/Controllers/ProdutoController";

export default function ListaProdutos() {
  const { produtos, loading, error } = useListaProdutosController();

  if (loading) {
    return <p className="text-center text-gray-500">Carregando produtos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Lista de Produtos
      </h1>

      <div className="grid grid-cols-1 gap-6">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="border border-gray-200 rounded-lg p-4 bg-white"
          >
            <h2 className="text-xl font-bold mb-2">{produto.nome}</h2>

            <p className="text-lg text-green-600 font-semibold mb-2">
              R$ {produto.preco.toFixed(2)}
            </p>

            <p className="text-gray-600 mb-4">
              Estoque: {produto.quantidade} unidades
            </p>

            <Link
              to={`/produtos/${produto.id}`}
              className="text-blue-500 hover:underline"
            >
              Ver Detalhes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

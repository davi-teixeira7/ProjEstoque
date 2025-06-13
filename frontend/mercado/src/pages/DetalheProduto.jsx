import { useParams, Link } from "react-router-dom";
import { useDetalheProdutoController } from "../core/Controllers/ProdutoController";

export default function DetalheProduto() {
  const { id } = useParams();
  const { produto, loading, error, handleDelete } =
    useDetalheProdutoController(id);

  if (loading) {
    return <p className="text-center text-gray-500">Carregando...</p>;
  }

  if (error || !produto) {
    return (
      <p className="text-center text-red-500">
        {error || "Produto não encontrado."}
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">{produto.nome}</h1>
      <p className="text-gray-600 mb-4">{produto.descricao}</p>

      <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
        <p className="mb-2">
          <strong>Código de Barras:</strong> {produto.codigo_barras}
        </p>
        <p className="mb-2">
          <strong>Preço:</strong>{" "}
          <span className="font-semibold text-green-600">
            R$ {produto.preco.toFixed(2)}
          </span>
        </p>
        <p>
          <strong>Quantidade em Estoque:</strong> {produto.quantidade}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          to={`/produtos/${id}/editar`}
          className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600"
        >
          Editar
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
        >
          Deletar
        </button>
        <Link to="/" className="text-gray-500 hover:underline">
          Voltar para a Lista
        </Link>
      </div>
    </div>
  );
}

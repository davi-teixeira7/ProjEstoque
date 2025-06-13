import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white sticky top-0 right-0 w-full shadow-md">
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-center py-4 ">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Estoque App
          </Link>
          <Link
            to="/produtos/novo"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
          >
            Adicionar Produto
          </Link>
        </div>
      </div>
    </nav>
  );
}

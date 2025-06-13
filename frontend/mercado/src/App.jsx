import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdicionarProduto from "./pages/AdicionarProduto";
import DetalheProduto from "./pages/DetalheProduto";
import EditarProduto from "./pages/EditarProduto";
import ListaProdutos from "./pages/ListaProduto";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="container mx-auto p-8 rounded-lg">
        <Routes>
          <Route path="/" element={<ListaProdutos />} />
          <Route path="/produtos/novo" element={<AdicionarProduto />} />
          <Route path="/produtos/:id" element={<DetalheProduto />} />
          <Route path="/produtos/:id/editar" element={<EditarProduto />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

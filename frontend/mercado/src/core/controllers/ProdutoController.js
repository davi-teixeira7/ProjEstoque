// src/Controllers/ProdutoController.js
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProdutoService from "../Services/ProdutoService";

export function useListaProdutosController() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        setError(null);
        const produtosCarregados = await ProdutoService.buscarTodosProdutos();
        setProdutos(produtosCarregados);
      } catch (err) {
        console.error("Erro no controller ao buscar produtos:", err);
        setError("Não foi possível carregar os produtos.");
      } finally {
        setLoading(false);
      }
    }

    fetchProdutos();
  }, []);

  return { produtos, loading, error };
}

export function useDetalheProdutoController(id) {
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    async function fetchProduto() {
      try {
        setError(null);
        const produtoCarregado = await ProdutoService.buscarProdutoPorId(id);
        setProduto(produtoCarregado);
      } catch (err) {
        console.error("Erro no controller ao buscar detalhes do produto:", err);
        setError("Produto não encontrado.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduto();
  }, [id]);

  const handleDelete = useCallback(async () => {
    if (window.confirm("Tem certeza que deseja deletar este produto?")) {
      try {
        await ProdutoService.deletarProduto(id);
        alert("Produto deletado com sucesso!");
        navigate("/");
      } catch (err) {
        console.error("Erro no controller ao deletar produto:", err);
        alert("Falha ao deletar produto.");
      }
    }
  }, [id, navigate]);

  return { produto, loading, error, handleDelete };
}

export function useFormProdutoController(id = null) {
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco: 0,
    quantidade: 0,
    codigo_barras: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      ProdutoService.buscarProdutoPorId(id)
        .then(setProduto)
        .catch((err) => {
          console.error(err);
          setError("Falha ao carregar dados para edição.");
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEditMode]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setProduto((prevState) => ({
      ...prevState,
      [name]:
        name === "preco" || name === "quantidade"
          ? parseFloat(value) || 0
          : value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);
      setLoading(true);
      try {
        if (isEditMode) {
          await ProdutoService.atualizarProduto(id, produto);
          alert("Produto atualizado com sucesso!");
          navigate(`/produtos/${id}`);
        } else {
          await ProdutoService.adicionarProduto(produto);
          alert("Produto adicionado com sucesso!");
          navigate("/");
        }
      } catch (err) {
        console.error("Erro no controller ao salvar produto:", err);
        setError(
          "Falha ao salvar produto. Verifique os dados e tente novamente."
        );
        alert("Falha ao salvar produto.");
      } finally {
        setLoading(false);
      }
    },
    [id, produto, isEditMode, navigate]
  );

  return { produto, loading, error, isEditMode, handleChange, handleSubmit };
}

const BASE_URL = "http://127.0.0.1:8000/produtos/";

export default new (class ProdutoRepository {
  async getAll() {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error("Erro ao buscar produtos.");
    }
    const data = await response.json();
    return data;
  }

  async getById(id) {
    const response = await fetch(`${BASE_URL}${id}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar o produto.");
    }

    return response.json();
  }

  async create(produtoData) {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produtoData),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar o produto.");
    }

    return response.json();
  }

  async update(id, produtoData) {
    const response = await fetch(`${BASE_URL}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produtoData),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar o produto.");
    }

    return response.json();
  }

  async delete(id) {
    const response = await fetch(`${BASE_URL}${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar o produto.");
    }

    return { success: true, status: response.status };
  }
})();

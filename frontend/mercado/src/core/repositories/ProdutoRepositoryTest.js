import apiClient from "../api/apiClient";

export default new (class ProdutoRepository {
  async getAll() {
    const response = await apiClient.get("/");
    return response.data;
  }

  async getById(id) {
    const response = await apiClient.get(`/${id}`);
    return response.data;
  }

  async create(produtoData) {
    const response = await apiClient.post("/", produtoData);
    return response.data;
  }

  async update(id, produtoData) {
    const response = await apiClient.put(`/${id}`, produtoData);
    return response.data;
  }

  async delete(id) {
    const response = await apiClient.delete(`/${id}`);
    return response.data;
  }
})();

# Instala o framework FastAPI
# pip install fastapi
# pip install "pymongo[srv]"
# pip install motor
# pip install "uvicorn[standard]"
# pip install python-dotenv

# Rodar:
# uvicorn main:app --reload

# -----------------------------------------------------------
from fastapi import Body, FastAPI, HTTPException
from sqlmodel import SQLModel, Field
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

# Cria uma instância da aplicação FastAPI
app = FastAPI(
    title="API do Estoque de Mercado",
    description="Uma API para gerenciar produtos, preços e quantidades.",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define uma rota para o endereço raiz ("/") que responde a requisições GET
@app.get("/")
def let_raiz():
    # retorna um dicionário, que o FastAPI converte automaticamente para JSON
    return {"message": "Olá, mundo!"}


class Produto(SQLModel, table=False):
    id: Optional[str] = Field(default=None, primary_key=True)
    nome: str
    descricao: Optional[str] = None
    preco: float = Field(gt=0, description="O preço do produto deve ser maior que zero")
    quantidade: int
    codigo_barras: str

from database import produto_collection, produto_helper
@app.post("/produtos/", response_description="Adicionar novo produto", response_model=Produto, status_code=201)
async def criar_produto(produto: Produto = Body(...)):
    # Cria um novo produto no estoque.
    produto_dict = produto.model_dump(exclude_unset=True)
    produto_dict.pop("id", None)  # Remove o campo id se estiver presente, pois será gerado pelo banco de dados
    
    novo_produto = await produto_collection.insert_one(produto_dict)
    produto_criado = await produto_collection.find_one({"_id": novo_produto.inserted_id})
    return produto_helper(produto_criado)

@app.get("/produtos/", response_description="Listar todos os produtos", response_model=List[Produto])
async def listar_produtos():
    """
    Lista todos os produtos do estoque.
    """
    produtos = []
    async for prod in produto_collection.find():
        produtos.append(produto_helper(prod))
    return produtos

@app.get("/produtos/{produto_id}", response_description="Obter um produto", response_model=Produto)
async def obter_produto(produto_id: str):
    """
    Obtém os detalhes de um produto específico pelo seu ID.
    """
    from bson.objectid import ObjectId
    # O find_one do mongo espera um ObjectId, não uma string
    produto = await produto_collection.find_one({"_id": ObjectId(produto_id)})
    if produto:
        return produto_helper(produto)
    raise HTTPException(status_code=404, detail=f"Produto com id {id} não encontrado")

@app.put("/produtos/{produto_id}", response_description="Atualizar um produto", response_model=Produto)
async def atualizar_produto(produto_id: str, produto_data: Produto = Body(...)):
    """
    Atualiza as informações de um produto existente.
    """
    from bson.objectid import ObjectId
    
    dados_para_atualizar = produto_data.model_dump(exclude_unset=True)
    dados_para_atualizar.pop("id", None)
    
    if len(dados_para_atualizar) >= 1:
        update_result = await produto_collection.update_one(
            {"_id": ObjectId(produto_id)}, {"$set": dados_para_atualizar}
        )
        
        if update_result.modified_count == 1:
            produto_atualizado = await produto_collection.find_one({"_id": ObjectId(produto_id)})
            if produto_atualizado is not None:
                return produto_helper(produto_atualizado)
            
    produto_existente = await produto_collection.find_one({"_id": ObjectId(produto_id)})
    if produto_existente is not None:
        return produto_helper(produto_existente)
    
    raise HTTPException(status_code=404, detail=f"Produto com id {produto_id} não encontrado")

@app.delete("/produtos/{produto_id}", status_code=204)
async def deletar_produto(produto_id: str):
    """
    Deleta um produto do estoque.
    """
    from bson.objectid import ObjectId
    
    delete_result = await produto_collection.delete_one({"_id": ObjectId(produto_id)})
    
    if delete_result.deleted_count == 1:
        return {"status": "sucesso", "message": f"Produto com id {produto_id} deletado com sucesso"}
    
    raise HTTPException(status_code=404, detail=f"Produto com id {produto_id} não encontrado")

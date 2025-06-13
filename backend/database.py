import motor.motor_asyncio

# Sua string de conexão que você já tem
MONGO_DETAILS = "mongodb+srv://aluno_fastapi:senhamuitoforte@cluster0.obrt9w8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Criamos um "cliente" para se conectar ao MongoDB
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

# Apontamos para o banco de dados específico que vamos usar. 
# Se o banco de dados não existir, ele será criado no primeiro uso.
database = client.estoque_db

# Apontamos para a "collection" (semelhante a uma tabela em SQL) de produtos
produto_collection = database.get_collection("produtos")


# Helper para corrigir o problema do _id do Mongo vs id do Pydantic
# O MongoDB usa _id (com underscore) e o Pydantic espera id (sem).
# Esta função converte o documento do Mongo para um dicionário Python legível.
def produto_helper(produto) -> dict:
    return {
        "id": str(produto["_id"]),
        "nome": produto["nome"],
        "descricao": produto.get("descricao"),
        "preco": produto["preco"],
        "quantidade": produto["quantidade"],
        "codigo_barras": produto["codigo_barras"],
    }
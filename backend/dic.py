# Criando um dicionário
usuario = {
    "nome": "Ana Silva",
    "email": "ana.silva@email.com",
    "idade": 28,
    "ativo": True
}

# print(usuario["nome"])
# -----------------------------------------------------------
usuario2 = {
    1: {
        "nome": "Ana Silva",
        "email": "ana.silva@email.com",
        "idade": 28,
        "ativo": True,
        "cidade": "Palmas"
    },
    2: {
        "nome": "Bruno Costa",
        "email": "bruno.costa@email.com",
        "idade": 34,
        "ativo": False
    }
}

# print(usuario2[2]["nome"])
# -----------------------------------------------------------
# print(usuario2[1]["cidade"])  # Isso causará um KeyError, pois "cidade" não existe

# cidade = usuario.get("cidade")
# print(cidade)  # Isso retornará None, pois "cidade" não existe no dicionário

# email = usuario.get("email")
# print(email)

# cidade = usuario.get("cidade", "Cidade não encontrada")
# print(cidade)

# -----------------------------------------------------------

# usuario["cidade"] = "Palmas"
# usuario["idade"] = 29
# print(usuario)

# -----------------------------------------------------------

# del usuario["ativo"]
# print(usuario)


# -----------------------------------------------------------

# for chave, valor in usuario2.items():
#     print(f"{chave}: {valor}")
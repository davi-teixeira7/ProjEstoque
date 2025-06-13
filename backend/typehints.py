# -----------------------------------------------------------

nome: str = "João"
idade: int = 28

print(nome, idade)

def somar(a: int, b: int) -> int:
    return a + b

print(somar(5, 4))

# -----------------------------------------------------------

# from typing import Dict, List, Optional, Any
# # Uma lista onde todos os elementos devem ser strings.
# nomes: List[str] = ["Ana", "Bruno", "Carlos"]

# # Um dicionário com chaves string e valores de qualquer tipo.
# # 'Any' é usado quando o tipo do valor pode variar.
# usuario: Dict[str, Any] = {"nome": "Mariana", "idade": 32}

# # 'apelido' pode ser uma string ou pode não existir (None).
# apelido: Optional[str] = None

# -----------------------------------------------------------

# nome = "Guilherme"
# idade = 19
# print(f"Olá, {nome}! Você tem {idade} anos.")
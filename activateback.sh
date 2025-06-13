cd backend
ACTIVATE_SCRIPT="venv/Scripts/activate"

if [ ! -f "$ACTIVATE_SCRIPT" ]; then
    echo "Ambiente virtual não encontrado."
    python -m venv venv
    
    if [ ! -f "$ACTIVATE_SCRIPT" ]; then
        echo "ERRO"
        exit 1 
    fi
    echo "Ambiente virtual criado com sucesso."
fi

source "$ACTIVATE_SCRIPT"
uvicorn main:app --reload

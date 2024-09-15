#!/bin/bash

# Criando a estrutura de diretórios
mkdir -p fastapi-react-app/{backend/{templates,static},frontend/{src,public}}

# Criando arquivos no backend
touch fastapi-react-app/backend/Dockerfile
touch fastapi-react-app/backend/main.py
touch fastapi-react-app/backend/templates/index.html
touch fastapi-react-app/backend/static/bundle.js

# Criando arquivos no frontend
touch fastapi-react-app/frontend/Dockerfile
touch fastapi-react-app/frontend/src/App.jsx
touch fastapi-react-app/frontend/public/index.html
touch fastapi-react-app/frontend/package.json

# Criando o arquivo docker-compose.yml na raiz do projeto
touch fastapi-react-app/docker-compose.yml

# Criando o arquivo README.md na raiz do projeto
touch fastapi-react-app/README.md

echo "Estrutura de diretórios e arquivos criada com sucesso!"

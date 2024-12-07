# DBO - Gerenciamento de Tarefas

Sistema de gerenciamento de tarefas que permite criar, editar e organizar atividades com suas dependências, com uma interface moderna e responsiva. Desenvolvido com Vue 3, Tailwind CSS e seguindo a metodologia Atomic Design para garantir componentes reutilizáveis. O sistema oferece recursos como filtragem por status, visualização hierárquica de dependências e validações automáticas para garantir a integridade das relações entre tarefas.

Características principais:
- Interface intuitiva e moderna com Tailwind CSS
- Arquitetura escalável usando Atomic Design
- Gerenciamento de estado robusto com Pinia
- Testes automatizados para garantir qualidade
- Suporte a múltiplos níveis de dependências entre tarefas

## Pré-requisitos

Antes de começar, verifique se você tem os seguintes requisitos:
* ``node.js`` instalado (versão 16 ou superior)
* ``npm`` instalado (geralmente vem com o Node.js)
* ``git`` instalado (para clonar o repositório)

## Instalação

1. Clone o repositório:
```bash
git clone git@github.com:daniel-bueno/gerenciamento-de-tarefas.git
```

2. Entre na pasta do projeto:
```bash
cd gerenciamento-de-tarefas
```

3. Instale as dependências:
```bash
npm install
```

## Usando o DBO - Gerenciamento de Tarefas

Para usar o sistema, siga estas etapas:

1. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

2. Acesse a aplicação em seu navegador através do endereço:
```
http://localhost:5173
```

## Executando os Testes

O projeto utiliza Jest para testes. Para executar os testes:

```bash
# Executa todos os testes
npm test

# Executa os testes em modo watch
npm run test:watch

# Executa os testes com cobertura
npm run test:coverage
```

## Funcionalidades

- Criar, editar e excluir tarefas
- Definir dependências entre tarefas (até 3 níveis)
- Filtrar tarefas por status
- Visualizar árvore de dependências
- Validações de regras de negócio

## Tecnologias Utilizadas

- Vue.js 3
- Tailwind CSS
- Pinia (Gerenciamento de Estado)
- Jest (Testes)

## Estrutura do Projeto

```
src/
├── components/
│   ├── atoms/       # Componentes básicos     (Button, Input, etc...)
│   ├── molecules/   # Composições de atoms    (Forms, Filters, Cards)
│   ├── organisms/   # Composições complexas   (TaskBoard, TaskTree)
│   └── templates/   # Templates de página     (Layouts)
├── store/           # Gerenciamento de estado (Pinia)
├── utils/           # Funções utilitárias
└── tests/           # Testes unitários
```

## Considerações de Desenvolvimento

- Arquitetura baseada em Atomic Design para melhor organização e reusabilidade
- Componentes desenvolvidos de forma isolada e testável
- Gerenciamento de estado centralizado com Pinia
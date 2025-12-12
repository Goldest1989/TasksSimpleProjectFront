#Frontend - Task Management App

Frontend da aplicação de gestão de tarefas, construído com Angular 21.0.4. Permite criar, listar, editar e atualizar tarefas com interface responsiva e estilizada, similar ao Google Keep.

#Tecnologias utilizadas
Angular 21.0.4
TypeScript
Reactive Forms
CSS para estilização

Versões do ambiente
Angular CLI: 21.0.3
Node.js: 22.16.0
npm: 10.9.2
Sistema Operativo: Windows x64

Passos para executar o frontend
Pré-requisitos
Node.js 22.16.0
Angular CLI 21.0.3

Configuração
Clone o repositório
Instale as dependências com npm install
Configure a URL do backend no environment.ts (ex.: https://localhost:7132/api)
Execute o projeto com ng serve
O frontend estará disponível em http://localhost:4200

Funcionalidades principais
Login com autenticação JWT
Listagem de tarefas com cores dinâmicas
Criação e edição de tarefas via formulário reativo
Alteração de status das tarefas (Pending, InProgress, Done)
Controle de acesso baseado em roles (RBAC) do backend

Pontos de melhoria
Melhorar mensagens de erro nos formulários
Suporte a filtros e pesquisa de tarefas
Animações mais suaves na criação e edição de tarefas
Suporte offline com armazenamento local

Instruções para testar RBAC
Contas de teste
Email: admin@example.com
 | Senha: admin123 | Role: Admin
Email: manager@example.com
 | Senha: manager123 | Role: Manager
Email: member@example.com
 | Senha: member123 | Role: Member

Fluxo de autenticação
Realize login no frontend usando uma das contas de teste
O JWT retornado pelo backend é armazenado no frontend e usado para autenticação das requisições

Observações
Certifique-se que o backend está rodando antes de iniciar o frontend
Configure CORS no backend para permitir requisições do frontend (http://localhost:4200)
Status das tarefas devem ser exibidos e enviados como número (1 = Pending, 2 = InProgress, 3 = Done)
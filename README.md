# Desafio técnico da sozei

[![Continuous Integration](https://github.com/DanielGoncalvesL/teste-sozei/actions/workflows/continuous_integration.yml/badge.svg)](https://github.com/DanielGoncalvesL/teste-sozei/actions/workflows/continuous_integration.yml)

**Desafio técnico para vaga de back-end júnior da empresa Sozei**

- [Desafio técnico da sozei](#desafio-técnico-da-sozei)
  - [Instalação e execução](#instalação-e-execução)
    - [Pré-requisitos](#pré-requisitos)
    - [Executando o projeto](#executando-o-projeto)
  - [Sobre o projeto](#sobre-o-projeto)
    - [Estrutura de diretórios](#estrutura-de-diretórios)
    - [Documentação](#documentação)
    - [Testes](#testes)
      - [Executando os testes](#executando-os-testes)
      - [Resultado](#resultado)
  - [Lint](#lint)
  - [Pipeline](#pipeline)

---

## Instalação e execução

### Pré-requisitos

- [Git](https://git-scm.com/download/), [Node.js](https://nodejs.org/en/download/) e [Docker](https://docs.docker.com/get-docker/) instalados.

### Executando o projeto

Todos os comandos abaixo são feitos no terminal

**1** - Faça um clone do repositório e acesse o diretório criado pelo clone.

```sh
git clone https://github.com/DanielGoncalvesL/teste-sozei.git && cd teste-sozei
```

**2** - Inicie a aplicação:

```sh
make start-app
```

> O comando `start-app` executa o serviço `server` do [docker-compose](./docker-compose.yml), que baixa a imagem do _postgres_, executa as migrations, builda o dockerfile do projeto e inicia a aplicação na porta 3000.

## Sobre o projeto

### Estrutura de diretórios

```
src/
 ├─ @types/
 |   └─  express.d.ts
 ├─ config/
 |   ├─ authConfig.ts
 ├─ modules/
 |   ├─ tools/
 |   └─ users/
 ├─ shared/
 |   ├─ container/
 |   ├─ errors/
 |   └─ infra/
 ├─ test/
 |   ├─ integration/
 |   └─ unit/
 └─ package.json
```

- **types**: Dir com alteração da interface Request, para armazenar o id do usuário logado
- **config**: Dir com a configuração de autenticação com JWT.
- **modules**: Dir com a implementação de todos os módulos da aplicação separados entre si.
- **shared**: Dir com a implementação de todas as rotas da api e tudo o que é compartilhado entre os módulos.
- **test**: Dir com todos os testes unitarios e integração.

### Documentação

Após iniciar a aplicação, a documentação de toda a api estará disponível a partir do endereço <http://localhost:3000/docs-api>.



### Testes

Os testes foram divididos em unitários e integração a fim de garantir a maior cobertura de código no máximo de camadas possíveis. Os testes foram feitos utilzando o [Jest](https://www.npmjs.com/package/jest), [SuperTest](https://www.npmjs.com/package/supertest) e [Faker](https://www.npmjs.com/package/faker)
#### Executando os testes

Para executar os testes unitários e de integração execute o seguinte comando:

```sh
make run-tests
```

#### Resultado

O resultado dos testes são apresentados no terminal já com a informação de code coverage

<img src=https://user-images.githubusercontent.com/55817154/112734154-c8798800-8f22-11eb-8ffb-47a433286ca1.png height="500">


## Lint

É boa prática que os arquivos estejam padronizados, seguindo o padrão de estilo do JS.
Para isso esse projeto utiliza a lib [eslint](https://www.npmjs.com/package/eslint), que é executado com o comando `npm run lint`.

## Pipeline

[![Continuous Integration](https://github.com/DanielGoncalvesL/teste-sozei/actions/workflows/continuous_integration.yml/badge.svg)](https://github.com/DanielGoncalvesL/teste-sozei/actions/workflows/continuous_integration.yml)

Para garantir que o código entregue está com boa qualidade e respeitando os padrões definidos foi configurada pipeline que a cada `PR` e `Push` valida:
- _Build_
- _Lint_
- _Test_

<img src=https://user-images.githubusercontent.com/55817154/112775721-18844780-9014-11eb-9d1e-e5908dcfed0f.png>

# Desafio técnico da sozei

**Desafio técnico para vaga de back-end júnior da empresa Sozei**

- [Desafio técnico da sozei](#desafio-técnico-da-sozei)
  - [Instalação e execução](#instalação-e-execução)
    - [Pré-requisitos](#pré-requisitos)
    - [Clonando o repositório](#clonando-o-repositório)
  - [Sobre o projeto](#sobre-o-projeto)
    - [Estrutura de diretórios](#estrutura-de-diretórios)
    - [Testes](#testes)
      - [Executando os testes](#executando-os-testes)
      - [Resultado](#resultado)
  - [Lint](#lint)

---

## Instalação e execução

### Pré-requisitos

- [Git](https://git-scm.com/download/) e [Node.js](https://nodejs.org/en/download/) instalados.

### Clonando o repositório

Todos os comandos abaixo são feitos no terminal

**1** - Faça um clone do repositório e acesse o diretório criado pelo clone.

```sh
git clone https://github.com/DanielGoncalvesL/teste-sozei.git && cd teste-sozei
```

**2** - Instale as dependências do projeto:

```sh
npm install
```

**3** - Inicie o banco de dados da aplicação:
```sh
docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

**4** - Para configurar o banco execute:
```sh
npm run typeorm schema:sync
```

**4** - Para iniciar a aplicação execute:
```sh
npm start
```

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


### Testes

Os testes foram divididos em unitários e integração a fim de garantir a maior cobertura de código no máximo de camadas possíveis. Os testes foram feitos utilzando o [Jest](https://www.npmjs.com/package/jest), [SuperTest](https://www.npmjs.com/package/supertest) e [Faker](https://www.npmjs.com/package/faker)
#### Executando os testes

Para executar os testes unitários e de integração execute o seguinte comando:

```sh
npm test
```

#### Resultado

O resultado dos testes são apresentados no terminal já com a informação de code coverage

<img src=https://user-images.githubusercontent.com/55817154/112734154-c8798800-8f22-11eb-8ffb-47a433286ca1.png height="500">


## Lint

É boa prática que os arquivos estejam padronizados, seguindo o padrão de estilo do JS.
Para isso esse projeto utiliza a lib [eslint](https://www.npmjs.com/package/eslint), que é executado com o comando `npm run lint`.

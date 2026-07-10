# Estoque de informática escolar

Sistema de estoque escolar feito com NestJS, TypeScript, TypeORM e MySQL.

Link do Figma:

https://www.figma.com/design/DeLFnTUgo7RCAaOh7WxQ9c/Gerenciamento-de-emprestimo?node-id=250-120&t=wVeaGfwO12uuA0vl-1

## Estrutura principal

- `src`: código-fonte da aplicação.
- `views`: telas renderizadas pelo NestJS com HBS.
- `Banco_de_dados_estoque`: arquivos do banco de dados.
- `dist`: pasta gerada automaticamente pelo build.

## Banco de dados

O banco usado pelo projeto se chama `site_de_estoque`.

O script principal fica em `Banco_de_dados_estoque/init.sql`. Ele cria o banco, recria as tabelas e adiciona dados iniciais para teste.

Para rodar no MySQL local, use o DBeaver ou outro cliente MySQL e execute o arquivo `init.sql`.

## Sobre a pasta `dist`

A pasta `dist` é criada automaticamente quando o projeto TypeScript é compilado pelo comando `npm run build`.

O código que deve ser editado fica em `src`. A pasta `dist` guarda a versão JavaScript gerada a partir de `src`, usada para rodar em produção pelo comando `npm run start:prod`.

Por isso ela aparece no `.gitignore`: normalmente não é uma pasta para editar manualmente nem para enviar ao repositório. Se ela for apagada, basta rodar `npm run build` novamente para recriá-la.

## Instalação

```bash
npm install
```

## Rodar o projeto

```bash
npm run start
```

Em modo de desenvolvimento:

```bash
npm run start:dev
```

Em modo de produção, primeiro gere a pasta `dist`:

```bash
npm run build
npm run start:prod
```

## Verificações

```bash
npm run build
npm run lint
npm run test
npm run test:e2e
```

# XobporD - Armazenamento de vídeos, fotos e áudios

<!--- Exemplos de badges. Acesse https://shields.io para outras opções. Você pode querer incluir informações de dependencias, build, testes, licença, etc. --->

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
![GitHub repo size](https://img.shields.io/github/repo-size/rafael-junio/progweb-template)
![GitHub contributors](https://img.shields.io/github/contributors/rafael-junio/progweb-template)
![APM](https://img.shields.io/apm/l/vim-mode)

XobporD tem como objetivo permitir que os usuários, de forma simples, armazenem e visualizem seus arquivos de vídeo, fotos e também áudios.

Aplicação para armazenamento local de vídeos, fotos e áudios em que você poderá acessa-lo de qualquer dispositivo que tenha conexão com a mesma rede.
É possível a pré-visualização e o download dos arquivos em outros dispositivos, sejam eles móveis ou desktops.

## Pré-requisitos

Antes de iniciar, certifique-se de cumprir os seguintes requisitos:

#### Sistema Operacional

- `Linux`.

#### Você deve possuir as seguintes aplicações:

- `Docker`
- `Docker-compose`

## Como executar

Para fazer o deploy da aplicação siga os seguintes passos:

Clone o repositório;

- Linux:

```shell
cd XobporD-progweb
docker-compose build
docker-compose up -d
```

Usuário _admin_, responsável pelo gerenciamento dos demais usuários:

```shell
email: admin@admin.com
password: admin
```

## Usando XobporD

Para usar XobporD, siga os seguintes passos (exemplos):

- Abra o navegador e digite o seguinte endereço: `http://localhost:3000`
- Faça um cadastro na aplicação clicando em Cadastre-se.
- Após o cadastro, faça login usando o e-mail e a senha cadastrada.
- Ao abrir a aplicação você poderá:
  - Enviar arquivos de imagem ou vídeos, pré-visualiza-los no navegador e fazer download.
- Para fazer um upload:
  1. Na página inicial você deve clicar na nuvem localizada no canto superior direito;
  2. Selecione o tipo dentre os disponíveis (Filme, Série ou arquivo);
  3. Para Filme e Série, procure pelo conteúdo correspondente, clique em SELECIONAR;
  4. Selecione o arquivo para ser armazenado e clique em UPLOAD;
- Após o upload, seus arquivos estarão disponíveis para VISUALIZAÇÃO, DOWNLOAD E REMOÇÃO na tela inicial.

![Upload e Pesquisa de um Filme](./screenshots/pesquisa-filme.png)

- Após enviado é possível visualizar todas as informação da mídia

![Home](./screenshots/home.png)

![Card do Filme](./screenshots/card-filme.png)

## Contribuidores

As seguintes pessoas contribuiram para este projeto:

- [Rafael Junio Xavier](https://github.com/rafael-junio)
- [Diego Bulhões Moraes](https://github.com/DiegoBulhoes/)
- [Guilherme Ribeiro Carvalho](https://github.com/guilhermercarvalho)

## Licença de uso

Este projeto usa a seguinte licença: [MIT](https://choosealicense.com/licenses/mit/).

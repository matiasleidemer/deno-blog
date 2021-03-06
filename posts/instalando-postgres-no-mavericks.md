---
title: Instalando Postgresql no Mavericks
publish_date: 2013-12-31
description: Aproveitando o fim de ano, decidi realizar uma fresh install do Mavericks no meu Macbook.
---

Aproveitando o fim de ano, decidi realizar uma fresh install do Mavericks no meu
Macbook.

Enquanto instalava minhas ferramentas de trabalho, tive um pouco de dificuldade
para instalar o PostgreSQL. Não lembro exatamente como havia feito
anteriormente, por isso decidi escrever aqui como foi o processo dessa vez.

## Homebrew

Bom, (quase) tudo que instalo no Mac, faço através do
[homebrew](https://brew.sh/). Se você ainda não usa, deveria.

A instalação do homebrew deve ocorrer normalmente, sua página contém bastante
informação caso ocorra algum problema. Após a instalação, chegou a hora de
instalar o nosso querido banco de dados. Através do homebrew, fica fácil de
achar e instalar:

```bash
# podemos começar pesquisando pelas "formulas" disponíveis no homebrew:

$ brew search postgres
postgres-xc  postgresql
homebrew/versions/postgresql8	  homebrew/versions/postgresql9	    homebrew/versions/postgresql91    homebrew/versions/postgresql92
```

Entre as várias fórmulas disponíveis, a que queremos é a `postgresql` mesmo.
Para termos certeza do que se trata, basta rodar o comando `info` do homebrew:

```bash
$ brew info postgresql
postgresql: stable 9.3.2 (bottled)
http://www.postgresql.org/

# (...) omitindo outras informações
```

Uma das vantagens do homebrew, é que as fórmulas podem ser facilmente
visualizadas, caso você queira saber o que acontece por trás dos panos. O
comando `info` retorna aonde está hospedada a fórmula. No
[Github do homebrew](https://github.com/Homebrew/homebrew-core), é possível ver
todas as fórmulas.

Tudo certo, hora de instalar! Mais uma vez, uma tarefa fácil:

```bash
$ brew install postgresql
```

A instalação deve ocorrer normalmente também, dependendo da configuração da sua
máquina, o processo pode demorar alguns minutos.

## PostgreSQL

Após a conclusão da instalação, hora de configurar o postgresql. Não há nada de
muito especial, os passos realizados aqui funcionam bem para as minhas
necessidades.

O primeiro passo é setar a variável de ambiente
[PGDATA](http://www.postgresql.org/docs/9.3/static/storage-file-layout.html),
que contém os arquivos de configuração do cluster do banco. Caso você tenha
feito a instalação sem nenhuma configuração adicional, este diretório deve estar
em `/usr/local/var/postgres`.

Adicione a seguinte linha no seu arquivo de configuração de bash:
`export PGDATA="/usr/local/var/postgres"`.

Eu uso o [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh), no meu caso o
arquivo de configuração fica em `~/.zshrc`.

Toda vez que você inicializar o postgres, ele vai procurar por essa variável de
ambiente. O comando utilizado para inicializar o banco é pg_ctl. Caso você não
tenha configurado a variável de ambiente, é preciso passar a opção -D para o
comando:

```bash
# inicializa o banco
pg_ctl start -D /usr/local/var/postgres

# pára o banco
pg_ctl stop
```

Por default, o log do servidor será exibido no buffer do seu terminal, uma das
maneiras de evitar isso, é indicando um arquivo para o output do log, através da
opção -l:

```bash
# inicia o banco setando arquivo de log externo
pg_ctl start -l /usr/local/var/postgres/log
```

Por fim, você pode criar aliases para iniciar e parar o servidor. Dentro do seu
arquivo de configuração de shell:

```bash
alias postgres_start="pg_ctl start -l /usr/local/var/postgres/log"
alias postgres_stop="pg_ctl stop"
```

Assim, os comando `postgres_start` e `postgres_stop` estarão disponíveis em
qualquer seção do terminal.

Sei que ainda existe a opção de inicialização automática do banco, quando você
loga no SO, mas, particularmente, não gosto muito deste approach.

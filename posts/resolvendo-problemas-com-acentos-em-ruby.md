---
title: Resolvendo problemas com acentos em Ruby
publish_date: 2014-09-23
description: Lembro que a um tempo atrás eu fiz uma clean install do Mavericks no meu Macbook e tive alguns problemas chatos quanto acentuação em ruby.
---

Lembro que a um tempo atrás eu fiz uma clean install do Mavericks no meu Macbook
e tive alguns problemas chatos quanto acentuação em ruby. Sempre que eu tentava
utilizar _ç_ ou _ã_, por exemplo, tinha como retorno um caracter estranho ou
mesmo uma quebra de linha.

Apesar de parecer, não era o caso de colocar o `encoding: utf-8` no header do
arquivo, já que o problema acontecia mesmo nas versões > 1.9.

Depois de muito quebrar a cabeça, verificar que o
[rbenv e ruby build estavam configurados corretamente para instalar com suporte a UTF-8](http://blog.rlmflores.me/blog/2012/04/25/adding-utf-8-support-to-rubies-compiled-through-ruby-build/),
acabei descobrindo que o que eu realmente precisava configurar era o ambiente
shell do Mavericks, e não o ruby em si.

Configurar as variáveis de
[Locale Categories](https://www.gnu.org/savannah-checkouts/gnu/libc/manual/html_node/Locale-Categories.html)
finalmente resolveu meu problema. Basta adicionar a linha abaixo no
`.bash_profile` ou em outro arquivo de configuração equivalente.

```bash
# na dúvida usei o macro LC_ALL e já deixei tudo com en_US.UTF-8
export LC_ALL=en_US.UTF-8
```

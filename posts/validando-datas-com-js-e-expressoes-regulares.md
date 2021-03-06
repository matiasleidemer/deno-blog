---
title: Validando datas com Javascript e Expressões Regulares
publish_date: 2009-08-02
description: Já vi muitas maneiras de se validar datas em JS, cada uma com seus prós e contras. Vou abordar aqui uma maneira de fazer esta validação utilizando Expressões Regulares (Regex).
---

"Ah, o Javascript, a linguagem que todos amamos odiar". Lembro desta frase em
algum screencast do Peepcode, e concordo com ela. Mas deixando o choro de lado,
quero aproveitar o primeiro post e falar de algo simples, porém muito
interessante. Já vi muitas maneiras de se validar datas em JS, cada uma com seus
prós e contras. Vou abordar aqui uma maneira de fazer esta validação utilizando
[Expressões Regulares](http://en.wikipedia.org/wiki/Regular_expression) (Regex).
Não vou entrar em detalhes sobre regex, existem vários sites sobre este tema.
Indico, inclusive, um muito bacana neste post.

Primeiro, vamos validar se o formato passado pelo usuário está correto. Para
este exemplo, quero que a string esteja no formato "99/99/9999". É neste momento
que recebemos a ajuda de nossa querida regex. Sem ela, teríamos que,
provavelmente, varrer a string inteira utilizando
[indexOf](http://www.w3schools.com/jsref/jsref_IndexOf.asp) , verificar se os
caracteres são todos numéricos e métodos afins, algo muito chato, convenhamos.

Uma ótima maneira de criar/testar expressões regulares é o site
[Rubular](http://www.rubular.com/), nele você escreve e testa suas regexs em
tempo real. [Criei uma para nosso problema](http://rubular.com/regexes/9262) e
acredito que a mesma esteja correta. Note que é possível testar os valores
capturados pela expressão regular. Crie alguns casos de teste e veja se a mesma
está funcionando corretamente. Lembro também que utilizo o
[Prototype](http://www.prototypejs.org/) no exemplo abaixo.

Bom, agora que já estamos acertados com a regex, vamos colocar ela para atuar
junto com o javascript! Vamos ao código!

```js
function validateDateFormat(dateValue) {
  var dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  var dateOK = true;

  if (!dateValue.blank()) {
    if (!dateRegex.test(dateValue)) {
      dateOK = false;
    } else {
      var d = new Date(dateValue.replace(dateRegex, "$2/$1/$3"));
      var ok = parseInt(RegExp.$2, 10) == 1 + d.getMonth() &&
        parseInt(RegExp.$1, 10) == d.getDate() &&
        parseInt(RegExp.$3, 10) == d.getFullYear();

      if (!ok) {
        dateOK = false;
      }
    }
  }

  return dateOK;
}
```

Ok, é mais simples do que parece. Primeiro eu crio uma variável contendo a
regex. Para o exemplo, só testarei a data caso o valor passado para a função não
esteja em branco. Em seguida verifico, utilizando o método "test", para testar
se o o valor passado está no formato definido pela regex. Em caso afirmativo,
crio uma nova data, através da regex.

Note que temos os \$2, \$1 e \$3. Estes são os resultados "capturados", em
seqüência, quando utilizamos uma expressão regular em um valor que confere com a
mesma (você deve ter visto no Rubular). Bom, você talvez esteja se perguntando
porque criamos a data contendo primeiro o mês e depois o dia. Bom, isso acontece
pois, por padrão, datas em javascript são criadas no formato "mm/dd/yyyy".
Legal, então temos uma nova data.

Agora, vamos verificar se ela está correta. E, para isso, verificamos se os
valores que o usuário passou são os mesmos da data criada. Mas como estes
valores não seriam os mesmos se a data acabou de ser criada? Simples, digamos
que seja criada uma data assim: "10/32/2009", ao invés de disparar um erro (já
que nao temos dia 32 no mês de Outubro), será criada uma data assim
"11/01/2009". Nice, uh?

O javascript adiciona um dia na data, para compensar o valor maior passado.
Neste caso fica fácil, o valor que foi passado na função não confere com a data
criada pelo Javascript. E é justamente esta verificação que fazemos na próxima
linha, comparando mês, dia e ano. Na comparação de mês, precisamos adicionar +1
pois a função `getMonth()` retorna o mês de Janeiro como 0 (zero), então é
necessário compensar este comportamento.

Se tudo ocorrer bem, a função irá retornar `true`, indicando que a data está
correta, caso contrário, a saída será `false`.

Ufa! Acho que conseguimos! Apesar do post longo (acho que fui verboso demais),
esta técnica é simples e eficaz (para validações deste tipo, do lado do
cliente).

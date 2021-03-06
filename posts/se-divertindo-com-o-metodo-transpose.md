---
title: Se divertindo com o método transpose
publish_date: 2014-09-19
description: Embora eu tenha usado poucas vezes, o método Array#transpose do ruby é muito interessante. Dependendo da sua forma de uso, pode apresentar soluções muito poderosas.
---

Embora eu tenha usado poucas vezes, o método
[Array#transpose](http://http://www.ruby-doc.org/core-2.1.2/Array.html#method-i-transpose)
do ruby é muito interessante. Dependendo da sua forma de uso, pode apresentar
soluções muito poderosas.

```ruby
names = %w(matias jose mateus)
# => ["matias", "jose", "mateus"]

last_names = %w(leidemer gomes lorandi)
# => ["leidemer", "gomes", "lorandi"]

[names, last_names].transpose
# => [["matias", "leidemer"], ["jose", "gomes"], ["mateus", "lorandi"]]
```

Neste exemplo, o método _junta_ os primeiros nomes definidos em `names` junto
com os sobrenomes definidos em `last_names`, baseado nos índices de cada
nome/sobrenome.

Usando o construtor do
[Hash](http://www.ruby-doc.org/core-2.1.2/Hash.html#method-c-5B-5D), podemos
criar uma estrutura ainda mais interessante:

```ruby
result = [names, last_names].transpose
# => [["matias", "leidemer"], ["jose", "gomes"], ["mateus", "lorandi"]]

Hash[result]
# => {"matias"=>"leidemer", "jose"=>"gomes", "mateus"=>"lorandi"}
```

A utilização faz mais sentido quando você possui uma coleção de dados e precisa,
por exemplo, identificar cada tipo de dado. Aqui, com o uso da classe
[OpenStruct](http://www.ruby-doc.org/stdlib-2.0/libdoc/ostruct/rdoc/OpenStruct.html),
fica fácil de criar uma estrutura.

```ruby
require 'ostruct'

columns = %w(title description published_at)
# => ["title", "description", "published_at"]

data = ["Super Post", "Big description here", Date.new(2014, 5, 8)]
# => ["Super Post", "Big description here", 2014-05-08 00:00:00 -0300]

hash = Hash[[columns, data].transpose]
# => {"title"=>"Super Post", "description"=>"Big description here", "published_at"=>2014-05-08 00:00:00 -0300}

blog = OpenStruct.new hash
# => #<OpenStruct title="Super Post", description="Big description here", published_at=2014-05-08 00:00:00 -0300>

blog.title
# => "Super Post"

blog.description
# => "Big description here"

blog.published_at
# => 2014-05-08 00:00:00 -0300
```

Lots of fun.

---
title: "Como escrever um código mais limpo — Nomes Significativos"
author: "Cristiano Raffi Cunha"
date: 2019-09-29T20:57:04.102Z
lastmod: 2024-04-03T08:30:11-03:00
description: ""
categories:
  - Boas Práticas
tags:
  - Clean Code

images:
  - /posts/boas-praticas/bons-nomes/images/2019-09-29_como-escrever-um-código-mais-limponomes-significativos_0.png
---

![](./images/2019-09-29_como-escrever-um-código-mais-limponomes-significativos_0.png#center)

### O que é um Código Limpo?

Um código limpo é aquele que é fácil de ser lido, que você não tem medo de pôr a mão, os nomes fazem sentido, funções com uma única responsabilidades, e outros fatores que abordarei nessa série de artigos sobre qualidade de código.

#### Por que?

Como devs geralmente trabalhamos em grupo, ou temos que revisar um código que escrevemos um tempo atrás.
Quando este código não está com uma qualidade legal, você perde muito tempo para entender, com isso cai sua produtividade e gera mais custos para o projeto, e menos horas de sono!
E além do mais, quem aqui gosta de dar manutenção em código mal escrito?

### Dê Nomes Significativos

Esse é o ponto mais importante para ter um código limpo. Escolher os seus nomes com cuidado para que tenham significado resolve grande parte dos problemas.

![](./images/2019-09-29_como-escrever-um-código-mais-limponomes-significativos_1.jpeg#center)

#### Variáveis

Estamos em no Século XXI, não precisamos mais poupar memoria ram para rodar nossos sistemas em C. Não será a quantidade de caracteres das variáveis que deixará seu software mais lento!
Então nada de criar variáveis com nomes incompletos, que só você vai lembrar(ou não);

```csharp
const u = 'Cristiano'//Não faça
const username = 'Cristiano';// FAÇA ISSO POR FAVOR!

---------------------------------------------------

int numPess = 0; //Não faça
int numeroDePessoas = 0; // FAÇA ISSO POR FAVOR!

---------------------------------------------------

codCli = 56; //Não faça
codigoDoCliente = 56; // FAÇA ISSO POR FAVOR!

---------------------------------------------------
```

Variáveis booleanas precisam de uma atenção especial, pois dependendo do nome, pode dificultar a leitura do código. Procure escolher nomes que possam ser respondidos com Sim ou não.

```csharp
if(user){...}//O que siginifica user?
if(isUser){...}

if(cadastrar){...}//Cadastrar? 
if(podeCadastrar){...}
```

#### Funções

Nomes de funções seguem o mesmo padrão das variáveis, devem descrever de forma clara o que ela faz, a grande diferença é que eles serão sempre verbos(ações).

```csharp
ObterDadosDoCliente(int idDoClient){...}
LimparCache(){...}

CreateUser(){...}
UpdateScore(int newScore){..}
```

As que retornan valores booleanos devem ter uma nomenclatura diferente, para que o “leitor” consiga compreender sem muito esforço.

```csharp
isAdmin(clientId){...}
userExist(userId){...}

Usuario.Existe(){...}
Veiculo.PodeEntrar(){...}
```

#### Português x Inglês

![](./images/2019-09-29_como-escrever-um-código-mais-limponomes-significativos_2.jpeg#center)

Essa é a briga eterna que jamais teremos um vencedor. Existem várias discussões e artigos falando sobre o assunto, inclusive indico o artigo: [Programar em português ou inglês? That’s the question! — Carlos Schults](http://carlosschults.net/pt/programar-portugues-ou-ingles/).

Creio que a maior parte do mercado escreve o projeto em inglês, mas, em alguns casos específicos, com muita regra de negócio, e uma área muito específica, seria legal “codar” em português, para facilitar a comunicação com os especialistas no negócio, ter uma [linguagem oblíqua](https://medium.com/@vsveras/domain-driven-design-linguagem-ub%C3%ADqua-9a7d2b3a0f74) ao produto.

A única coisa que devemos combinar é: não escrever um pouco de cada, por favor, não escreva funções “getUsuario”; “updateValores”. Ou variáveis “priceWithDEsconto”, “nameUsuario”.

> **Você sabe que está criando um código limpo quando cada rotina que você lê se mostra como o que você esperava — Princípio de Ward**

![](./images/2019-09-29_como-escrever-um-código-mais-limponomes-significativos_3.png#center)

Nesse artigo eu trouxe o que considero mais importante no desenvolvimento que são bons nomes. Utilizei como referência o Livro do Uncle Bob, Código Limpo, e um pouco da experiência nesses poucos anos como desenvolvedor.

Se você discorda de algo ou quiser conversar, pode me mandar um email, ou me procurar nas redes sociais, você pode encontrar tudo isso no meu site: [https://cristianoprogramador.com](https://cristianoprogramador.com)

Obrigado ;D

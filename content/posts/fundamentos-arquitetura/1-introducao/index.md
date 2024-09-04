---
title: "Introdução - Fundamentos da Arquitetura de Software"
author: "Cristiano Raffi Cunha"
date: 2024-07-26
lastmod: 2024-07-26
description: "O artigo apresenta uma introdução ao papel do arquiteto de software, destacando a complexidade de definir a arquitetura, os principais papéis de um arquiteto e a importância de tomar decisões equilibradas entre riscos, custos e estratégias de negócio."
draft: false
tableOfContents: false
categories:
  - Arquitetura
  - Engenharia
images:
  - /posts/fundamentos-arquitetura/1-introducao/images/capa.png
  
---

![](./images/capa.png#center)

Este é o primeiro artigo que escrevo sobre o livro [**Fundamentos da arquitetura de Software: uma abordagem de engenharia**](https://www.amazon.com.br/Fundamentos-Arquitetura-Software-Abordagem-Engenharia/dp/8550819859/), a ideia é ir colocando um resumo do capítulo e alguns pontos de atenção, e a gente ir passando por todos, até o fim do livro.

Comecei a ler o livro por causa do Clube do Livro do [**Lucas Gertel**](https://www.linkedin.com/in/lucas-gertel/), lá na plataforma ele esta colocando seu resumo(se quiser participar, só se cadastrar na [**plataforma**](https://nextgendevelopers.com.br/)), a ideia aqui é fazer o mesmo.

Te convido a participar da leitura do livro, é um ótimo livro para quem quer compreender melhor o mundo de Arquitetura de Software

> **Arquitetura é sobre algo importante… seja lá o que for. — Ralph Johnson**

## O que faz um Arquiteto de Software?

Logo no início do capítulo, já temos um dos grandes questionamentos: O que faz um Arquiteto de Software? O que é Arquitetura de Software?

Em outras áreas, ou até mesmo como desenvolvedor, a gente tem uma idea de qual o papel, e qual o escopo de trabalho, mas como arquiteto, não temos esse conceito definido, até mesmo pois é um papel que vem mudando muito durante os anos, principalmente após o surgimentos dos microsserviços, antes o foco era mais na parte puramente técnica do software, agora, é a orquestração de todas as “caixinhas” que compõe os sistemas.

Mas não podemos sair sem uma definição mínima de quais os principais papéis de um arquiteto, e no livro ele traz um diagrama, claro que não tem como ser completo, pois pode mudar para cada contexto, mas já consegue dar uma idea inicial.

![-](https://fundamentalsofsoftwarearchitecture.com/images/book/fosa_0101.png)


### Arquitetura de Software

> **"Tudo em Arquitetura de software é uma concessão" — Primeira Lei da Arquitetura de Software**

Entender Arquitetura de Software é fundamental para exercer o papel de arquiteto com eficácia. A Arquitetura de Software refere-se à estrutura de componentes de um sistema, suas responsabilidades e como eles interagem. Estes componentes são responsáveis por aspectos chave do sistema e como estes se relacionam pode fazer toda a diferença no resultado final.

Arquitetura de Software é o esqueleto estrutural que define como um sistema de software é organizado e como seus componentes interagem entre si. Ela abrange um conjunto de decisões significativas sobre a organização do sistema, incluindo a seleção dos elementos estruturais e suas interfaces, além do comportamento coletivo dos elementos. 

### O que esperar de um Arquiteto?

Assim como o conceito de Arquitetura, definir o que se espera de um arquiteto também é desafiador. Em vez de uma definição única, o livro apresenta uma lista dos principais pontos que esperamos de um arquiteto:

- Tomar decisões de arquitetura e analisá-las continuamente
- Ter conhecimento do domínio do negócio
- Possuir boas soft-skills
- Lidar bem com questões políticas
- Saber negociar

### Insights da Live na Eximia

Muitas das coisas adicionadas neste artigo, também vieram de uma live que rolou da Eximia, foi bem no momento que estava lendo este capítulo, vale a pena ver a live, tem muitos insights que não consegui compilar aqui, fora a vasta experiência dos palestrantes [Fernando Paiva](https://www.linkedin.com/in/fernandoneiva/) e [Gabriel  Kohlrausch](https://www.linkedin.com/in/gabrielsk/). 


{{< youtube F4OSaXKcFe4 >}}


**Essencial ou completamente dispensáveis?**

Antes de definir o papel do arquiteto, é fundamental compreender o que é Arquitetura. Temos várias definições, cada uma em diferentes níveis, o que pode gerar confusão. No entanto, algumas ideias centrais são comuns:

- A Arquitetura foca em componentes, responsabilidades e relacionamentos.
- Bons diagramas representam essas ideias, e é essencial utilizar frameworks como C4 Model para essa representação.

Inclusive, se quiser saber mais sobre C4 Model, eu jã falei bastante sobre o assunto: [Documentando arquiteturas com C4 Model](https://www.youtube.com/live/X7UKXcS6OVI?si=6QBOfZ9Pptu0o71B)

**Principais Responsabilidades de um Arquiteto:**

- Buscar sempre o menor risco e custo, focando nas estratégias de negócio.
- Tornar tudo visível e compreensível para todas as partes interessadas.
  - Ter uma boa documentção, que é realmente usada, e não só mais um processo.

**Comunicação e Descoberta:**

Um dos maiores desafios e responsabilidades do arquiteto é a comunicação. É preciso descobrir e documentar sistemas e criar consensos entre as partes interessadas. A documentação como o *Architecture Haiku* e ferramentas como o *ADR* (Architecture Decision Record) ajudam muito nesse processo.

**Essência do Papel do Arquiteto:**

- Não é apenas um desenvolvedor sênior promovido, nem alguém que sabe tudo e toma todas as decisões.
- É uma função de alta especialização que requer um profundo entendimento tanto técnico quanto de negócio.
- O arquiteto deveria estar imerso no time, ajudando com provas de conceito e mantendo uma comunicação constante e clara, inclusive para receber feedbacks e insights das decisões que foram tomadas.

### Conclusão

A Arquitetura de Software é, de muitas formas, uma arte de concessões e trade-offs. Entender os limites e saber quando adaptar ou mudar é crucial. Este capítulo introdutório do livro nos dá um visão da complexidade e importância da função do arquiteto de software, no livro ele aborda mais alguns conceitos, mas só a ideia de definir sobre Arquitetura e o papel do Arquiteto, já são o bastante para este "artigo". Nos próximos artigos, continuaremos a explorar mais detalhadamente esses temas.

Espero que este resumo tenha sido útil e aguardo você nos próximos capítulos!
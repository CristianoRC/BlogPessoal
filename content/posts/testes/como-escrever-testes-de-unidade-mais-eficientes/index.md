---
title: "10 passos para escrever testes de unidade mais eficientes"
author: "Cristiano Raffi Cunha"
date: 2020-05-31T14:02:34.413Z
lastmod: 2024-04-03T08:30:24-03:00
description: ""
categories:
  - Testes
tags:
  - Testes de unidade
images:
  - /posts/testes/como-escrever-testes-de-unidade-mais-eficientes/images/2020-05-31_10-passos-para-escrever-testes-unitários-mais-eficientes_0.png
  
---

![](./images/2020-05-31_10-passos-para-escrever-testes-unitários-mais-eficientes_0.png#center)

### Nome dos metodos

Eles devem seguir um padrão durante todo o projeto, assim como os métodos de sua aplicação. A ideia é que você entenda o que o teste faz sem precisar abri-lo.

Podemos separar o nome em três partes: Unity of work, Condição e Esperado, por exemplo, Usuários não registrados devem ser redirecionados para tela de cadastro. Se você está com dificuldade de dar um nome, talvez seu teste esteja fazendo coisa de mais.

### O que devemos testar

Essa é a questão mais difícil, e creio que não exista uma resposta 100% correta para ela.

Se você está começando nos testes agora eu sempre indico dois pontos principais para você testar.

- Teste primeiro o ponto que gera mais valor para sua aplicação, por exemplo, um dos pontos mais importantes do e-comerce é o de finalização da compra, o checkout, é um dos melhores lugares para iniciar seus testes / focar.
- Sempre que ocorrer um bug em sua aplicação, crie testes!
    Se possível, escreva testes antes, e depois refatore o código até o bug “sumir”.

Sempre priorize a escrita de código no domínio da sua aplicação, em suas regras de negócio, como cálculos e validações.

### Teste casos de falha

Sim, o mundo não é perfeito, os usuários inserem valores “errados”, as vezes um serviço externo pode cair…

Além de testar os cacos de sucesso, precisamos testar os casos de falha, para saber como nossa aplicação se comporta, e até mesmo podermos mapear e testar fluxos alternativos.

![](./images/2020-05-31_10-passos-para-escrever-testes-unitários-mais-eficientes_1.png#center)

### Nada de Copiar e colar!

Um erro muito comum ao fazer testes, é copiar a base do teste anterior para fazer o atual, isso tem um “nome”, Don’t repeat yoursef(DRY), já tive muito problema por escrever testes ruins, e quando a aplicação era refatorada, perdia algumas horas refatorando os testes também…

Para resolver esse problema, criar classes e métodos que gere objetos básicos para seu teste, como cliente http, mock de serviços e objetos preenchidos de forma genérica. Existem dois designes patterns que podem te auxiliar nisso, o Builder e o Factory.

### Como organizar seu teste

Seu método de teste deve separado em três etapas.

Arrange: momento onde você vai configurar a base do teu teste, onde você vai fazer a conexão com o banco de dados, criar os objetos e serviços básicos para rodar o teste.

Act: este é o momento onde você vai executada a ação principal que esta sendo testada.

Assert: aqui é onde verificamos se as evidências da ação executada estão com os valores que esperamos.

```csharp
// arrange     
double currentBalance = 10.0;
double withdrawal = 1.0;
double expected = 9.0;
var account = new CheckingAccount("JohnDoe", currentBalance);

// act
account.Withdraw(withdrawal);

// assert
Assert.AreEqual(expected, account.Balance);
```

### Asserts

Eles são tão importantes que merecem um tópico.

O bom é fazer as verificações em um único objeto, e de preferência usar poucos asserts. Cada teste deve ser responsável por apenas uma coisa.

Procure usar ferramentas como o [FluentAssertions](https://fluentassertions.com/) do C#, elas facilitam a leitura dos testes.

```csharp
//Ex:
string actual = "ABCDEFGHI";
actual.Should().StartWith("AB").And.EndWith("HI").And.Contain("EF").And.HaveLength(9);
```

### Escreva um código testável

![](./images/2020-05-31_10-passos-para-escrever-testes-unitários-mais-eficientes_2.png#center)

Uma das melhores coisas que aprendi na programação foram os princípios SOLID(listados na imagem acima). Se você seguir esses princípios, grande parte dos seus problemas resolverão.

O princípio mais importante para a escrita de um código testável, é o da inversão de dependência, onde ao invés de você instancia um serviço de envio de email(exemplo) diretamente na sua classe, você pede que ele seja injetado no construtor dela. Então no momento do teste você consegue criar um serviço de envio de email Fake que sempre da erro, ou sucesso, para criar seus casos de teste.

### Crie guidelines

Crie Guidelines para os testes, para não ficar uma bagunça, consistência é a chave! É muito ruim trabalhar em um projeto onde cada um escreve o teste de um modo diferente. Não devemos dar menos importância para padronização só porque é um teste.

### TDD

![](./images/2020-05-31_10-passos-para-escrever-testes-unitários-mais-eficientes_3.png#center)

TDD é uma técnica onde você escreve seu código guiado a tastes. Você trabalha com pequenos ciclos, escreve o teste, vê ele falhar, refatora, vê ele passar e por aí vai, se quiser saber mais sobre, da uma olhada nesse vídeo aqui: [TDD // Dicionário do Programador](https://www.youtube.com/watch?v=bLdEypr2e-8).

Estou acostumado com o TDD onde usamos baby steps, onde pensamos e desenvolvemos a solução uma parte de cada vez. No entanto, esses dias, tive que escrever testes para um código que já tinha sido criado, e não é a mesma coisa. Você escreve os testes, e geralmente esquece de alguns, pois não pensa em todos os casos de falha e de erro. E ainda temos o problema de escrever testes enviesados, as vemos podemos ta fazendo um teste passar pensando que é o fluxo normal, mas na realidade é um bug.

### Code review

Este ultimo tópico não tem muito a ver com a escrita do código, mas sim com a revisão dele. 
Checklist do code review dos testes:

- O nome realmente descreve o senário?
- O teste contém arrange, act e assert?
- Se for testes unitários, eles estão apenas em uma camada de projeto, ou ele testa mais de uma ao mesmo tempo?
- O(a) Dev “mocka” todas as dependências?(testes de unidade)
- O(a) Dev “mocka” serviços externos?
- Asserts são apenas em um objeto?
- Temos retição de código?

Esses foram alguns pontos que aprendi estudando e, na prática, de como escrever testes mais eficientes. Se você discorda de algo, ou pensas que faltou algum ponto, pode comentar ou entrar com contado por alguma das minhas redes sociais, seu feedback será bem-vindo.

Para encontrar todas as minhas redes sociais, basta acessar meu site: [https://www.cristianoprogramador.com/](https://www.cristianoprogramador.com/)

#### Referências

[Conceitos básicos sobre o teste de unidade - Visual Studio](https://docs.microsoft.com/pt-br/visualstudio/test/unit-test-basics?view=vs-2019 "https://docs.microsoft.com/pt-br/visualstudio/test/unit-test-basics?view=vs-2019")

[Google Testing Blog](https://testing.googleblog.com/ "https://testing.googleblog.com/")

[Test-Driven DevelopmentTeste e Design no Mundo Real com .NET — Mauricio Aniche](https://www.casadocodigo.com.br/pages/sumario-tdd-dotnet)

Livro: Princípios, Padrões e Práticas Ágeis em C# — Robert C. Martin

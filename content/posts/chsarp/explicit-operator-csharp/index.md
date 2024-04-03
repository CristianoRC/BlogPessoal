---
title: "Explicit operator - C#"
author: "Cristiano Raffi Cunha"
date: 2019-06-02T19:43:43.012Z
lastmod: 2024-04-03T08:30:02-03:00
description: ""
draft: false
categories:
  - CSharp
tags:
  - C#
  - .NET

---

![](./images/capa.png#center)

Em C# temos duas conversões(cast), as implícitas(Em breve farei um artigo sobre) e as explicitas. A linguagem já traz algumas conversões prontas, mas você pode implementar a suas, até mesmo com suas classes.

### Explicit

No casting explícito, o desenvolvedor precisa informar o tipo no qual a sua variável está sendo convertida, isso geralmente acontece quando os tipos que você está fazendo a conversão não tem 100% de compatibilidade.

```csharp
int meuInteiro = (int)2.5d;
```

Nesse caso o double 2,5 perderia o 0,5 na conversão, ela tem que ser explícita para o desenvolvedor ficar ciente do que está acontecendo.

### implementação

Para o exemplo, implementei o cast entre moedas(Dólar / Real). Basicamente às duas classes tem as mesmas propriedades e no momento do cast faremos a conversão dos valores, e as mudanças das propriedades.
 No exemplo não utilizaremos nenhum serviço para conversão de moeda, apenas peguei o valor de 1 Real em Dólar($ 0,25477) no dia que estou escrevendo este artigo.

```csharp
public class Real
{
    public Real(decimal valor)
    {
        Valor = valor;
        Nome = "Real brasileiro";
        Codigo = "BRL";
        }

    public string Nome { get; private set; }
    public string Codigo { get; private set; }
    public decimal Valor { get; private set; }
}
```

```csharp
public class Dolar
{
    public Dolar(decimal valor)
    {
        Valor = valor;
        Nome = "United States dollar";
        Codigo = "USD";
    }

    public string Nome { get; private set; }
    public string Codigo { get; private set; }
    public decimal Valor { get; private set; }
}
```

Com às duas classes em mão precisamos fazer os operadores de cast. Os operadores são métodos públicos, retornam o tipo que deve ser convertido, e recebe por parâmetro uma variável do seu tipo. Além desses detalhes, no método precisamos colocar as palavras reservadas: explicit operator.

#### **Real:**

A assinatura do método de conversão explicita de Real para Dólar ficará assim:

```csharp
public static explicit operator Dolar(Real real){...}
```

Como os construtores das duas classes preenchem as propriedades de texto, só precisaremos nos preocupar com a conversão. É simples, vamos pegar o valor em real e multiplicar por 0.25477. Com esses dados já podemos criar um objeto do tipo Dólar e fazer o retorno do método de conversão.

```csharp
public static explicit operator Dolar(Real real)
{
    var cotacaoDolar = 0.25477m;
    var conversao = real.Valor * cotacaoDolar;
    return new Dolar(conversao);
}
```

#### Dólar:

A base é a mesma do Real, a única diferença será na conversão doas moedas. Ao converter de Dólar para real pegaremos o valor em dólar e dividir pela cotação.

```csharp
public static explicit operator Real(Dolar dolar)
{
   var cotacaoDolar = 0.25477m;
   var conversao = dolar.Valor / cotacaoDolar;
   return new Real(conversao);
}
```

### Como usar na prática?

Após a implementação dos métodos de cast, já está tudo pronto, já podemos utilizar.

Para fazer o cast explícito é bem fácil, é da mesma forma que exemplifiquei no início do projeto do cast de double para inteiro.

#### Conversão de Real para Dólar:

```csharp
Real real = new Real(152);
Dolar dolar = (Dolar)real;
```

Feito isso, a sua variável(dólar) já terá o valor corrigido de acordo com a cotação. Para converter a variável dólar para real novamente, funciona do mesmo modo.

```csharp
Real real = new Real(152);
Dolar dolar = (Dolar)real;
Real novoReal = (Real)dolar;
```

Implementei um exemplo em um projeto em console para demonstrar a funcionalidade, se você quiser testar, copie o [código fonte](https://gist.github.com/CristianoRC/f5901f81a7cbf933409dc5700bbfa7ae) e rode no [try.dot.net](https://try.dot.net).

Isso aí gurizada, se achar algum problema ou quiser conversar, você pode encontrar todas as redes sociais no meu site: [https://cristianoprogramador.com](https://cristianoprogramador.com).

#### Obrigado!

#### Referências

Livro: Microsoft Visual C# 2013 — Passo a Passo
Capítulo: 22—Sobrecarga de operadores

[Palavra-chave explicit - Referência de C#](https://docs.microsoft.com/pt-br/dotnet/csharp/language-reference/keywords/explicit "https://docs.microsoft.com/pt-br/dotnet/csharp/language-reference/keywords/explicit")

[implicit - Referência de C#](https://docs.microsoft.com/pt-br/dotnet/csharp/language-reference/keywords/implicit "https://docs.microsoft.com/pt-br/dotnet/csharp/language-reference/keywords/implicit")

[Palavra-chave operator - Referência de C#](https://docs.microsoft.com/pt-br/dotnet/csharp/language-reference/keywords/operator "https://docs.microsoft.com/pt-br/dotnet/csharp/language-reference/keywords/operator")

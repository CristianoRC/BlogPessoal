---
title: "Gerando dados aleatórios para seus testes de unidade — Bogus C#"
author: "Cristiano Raffi Cunha"
date: 2020-01-25T02:37:35.893Z
lastmod: 2024-04-03T08:30:17-03:00
description: ""
categories:
  - Testes
  - CSharp
tags:
  - C#
  - .NET
  - Testes de unidade

---

![](./images/capa.png#center)

O Bogus é uma lib feita para .NET que gera dados aleatórios, e uma das grandes aplicações dela é o uso em testes de unidade. Para saber mais dessa biblioteca open source você pode acessar o repositório: [https://github.com/bchavez/Bogus](https://github.com/bchavez/Bogus)

### Como Funciona

Podemos criar um faker genérico, que seria apenas uma classe que gera os dados, ou criar um que através de regras ele preenche uma classe específica.

#### Instalação

O pacote está disponível no Nuget, então basta acessar o link: [https://www.nuget.org/packages/Bogus/](https://www.nuget.org/packages/Bogus/)

```bash
dotnet add package Bogus
```

#### Faker Genérico

Para instanciar você precisa apenas selecionar a linguagem que os dados serão gerados, por padrão se não passar argumentos para o construtor será Inglês.

```csharp
var faker = new Faker("pt_BR");
```

Após a instância ser criada é simples, basta chamar as propriedades e métodos disponíveis. Essas informações são agrupadas por categorias como endereços e financeiro. Para obter todas as categorias disponíveis, acesse o [repositório](http://dotnet%20add%20package%20Bogus%20--version%2028.4.4).

```csharp
var faker = new Faker("pt_BR");

Console.WriteLine(faker.Address.City());

Console.WriteLine(faker.Person.Cpf());

Console.WriteLine(faker.Company.Cnpj());
```

A biblioteca também permite você gerar dados específicos do Brasil como CPF e CNPJ basta importar o namespace Bogus.Extensions.Brazil.

Uma das saídas foi:

```bash
Município de Felicianodo Sul
611.020.712-85
47.105.797/0001-55
```

Você também pode gerar números e textos aleatórios.

```csharp
var faker = new Faker("pt_BR");

Console.WriteLine(faker.Random.Word());

Console.WriteLine(faker.Random.Decimal());

Console.WriteLine(faker.Random.Int());

Console.WriteLine(faker.Finance.Amount(1, 100));
```

Saída:

```bash
seamless
0.9765836233164110
826689666
94.80
```

#### Faker para Classes

Para o exemplo, criei uma classe pessoa, bem simples.

```csharp
public String CPF { get; set; }

public String Nome { get; set; }

public string UrlDaFoto { get; set; }

public IPAddress IpDeAcesso { get; set; }

public string NumeroDaConta { get; set; }

public decimal Saldo { get; set; }
```

Para a criação, devemos instanciar um faker, mas, agora passando o tipo, e em seguida algumas propriedades e regras para a geração dos valores.

```csharp
var faker = new Faker<Pessoa>()
```

Para informar que a geração de valores e necessária para todas as propriedades, devemos alterar o valor de StrincMode para true.

```csharp
var faker = new Faker<Pessoa>().StrictMode(true)
```

No exemplo criarei regras para todos os campos, é bem simples, basicamente vamos chamando o método RuleFor que recebe por parâmetro, duas “arrow functions”, onde a primeira é para você selecionar a propriedade onde a regra será aplicada, e a segunda é qual o valor que ela deve receber. Por padrão essa segunda função recebe um faker por parâmetro, para você gerar os dados de forma aleatória, mas, se quiser passar um dado estático também é possível.
Exemplo de dado estático: .RuleFor(p => p.Nome, f => “Olá”)

```csharp
var faker = new Faker<Pessoa>("pt_BR").StrictMode(true)
.RuleFor(p => p.CPF, f => f.Person.Cpf())
.RuleFor(p => p.Nome, f => f.Person.FullName)
.RuleFor(p => p.UrlDaFoto, f => f.Person.Avatar)
.RuleFor(p => p.IpDeAcesso, f => f.Internet.IpAddress().ToString())
.RuleFor(p => p.NumeroDaConta, f => f.Finance.Account())
.RuleFor(p => p.Saldo, f => f.Finance.Amount(1, 10000));
```

Para gerar uma nova classe já preenchida você chama a classe Generate do faker. Também podemos gerar o número de pessoas que quisermos passando a quantidade por parâmetro.

```csharp
var pesoa = faker.Generate();
var pesoas = faker.Generate(5)//Retorna uma lista de pessoas
```

Conteúdo da variável Pessoa

```json
{
  "CPF": "108.641.241-98",
  "Nome": "Amelia Batista",
  "UrlDaFoto": "https://s3.amazonaws.com/uifaces/faces/twitter/markjenkins/128.jpg",
  "IpDeAcesso": "133.193.69.146",
  "NumeroDaConta": "72381984",
  "Saldo": 886.92
}
```

Se quiser saber tópicos mais avançados e boas práticas na utilização da lib, acessa o link da documentação, a documentação é bem legal vai te ajudar: [https://github.com/bchavez/Bogus#advanced-topics-guidance-and-best-practices](https://github.com/bchavez/Bogus#advanced-topics-guidance-and-best-practices)

É isso aí pessoal, se precisar de ajuda pode me mandar um email, ou me procurar nas redes sociais, você pode encontrar tudo isso no meu site: [https://cristianoprogramador.com](https://cristianoprogramador.com)

Obrigado ;D

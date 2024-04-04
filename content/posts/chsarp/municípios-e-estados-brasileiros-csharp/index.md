---
title: "Trabalhando com municípios e estados brasileiros — C#"
author: "Cristiano Raffi Cunha"
date: 2017-09-15T23:11:53.808Z
lastmod: 2024-04-03T08:29:19-03:00
description: ""
draft: false
categories:
  - CSharp
tags:
  - C#
  - .NET
images:
  - /posts/chsarp/images/capa.png

---

![](./images/capa.png)

Com a biblioteca [DotCEP](https://www.nuget.org/packages/DotCEP/) esse trabalho se torna muito fácil e prático, você não perderá tempo pensando em como trabalhar com essas informações no seu projeto e focará no que realmente lhe “custará” mais tempo.

A busca por Estados e municípios não necessita de conexão com a internet, pois, é utilizado um banco de dados local para realizar as buscas das informações.

### DotCEP.Localidades.Estado

> Propriedades: Código, Sigla e Nome

**Listagem dos estados brasileiros**

```csharp
DotCEP.Localidades.Estado.ObterListaDeEstados();
```

Saída: [Resultado](https://gist.github.com/CristianoRC/f48212320d461f2030b8faa004ef26e1)

**Você também pode buscar o nome, código e a sigla.**

```csharp
DotCEP.Localidades.Estado.ObterNomeDoEstado(43)
Saída:Rio Grande do Sul

DotCEP.Localidades.Estado.ObterNomeDoEstado("SP")
Saída:Sao Paulo

DotCEP.Localidades.Estado.ObterCodigoDoEstado("RS")
Saída:43

DotCEP.Localidades.Estado.ObterSiglaDoEstado(43)
Saída:RS

DotCEP.Localidades.Estado.ObterSiglaDoEstado("Sao Paulo")
Saída:SP
```

### DotCEP.Localidades.Municipio

> Propriedades: Código, Código do Estado e Nome

**Listagem dos municípios brasileiros:** Você pode executar essa busca de três modos: Sem passar parâmetros que retornará todos os municípios brasileiros, passando por parâmetro a UF(Unidades federativas do Brasil) do estado ou passando a sigla do estado como string, isso retornará todos os municípios dele.

```csharp
DotCEP.Localidades.Municipio.ObterListaDeMunicipio();

DotCEP.Localidades.Municipio.ObterListaDeMunicipio(DotCEP.UF.RS);

DotCEP.Localidades.Municipio.ObterListaDeMunicipio("RS");
```

Saida: [Resultado](https://gist.github.com/CristianoRC/092b8b3610d628dba95675260298a042)

**Obtenção do código do município:** Para a obtenção do código do município você precisar passar duas informações por parâmetro, o nome e a UF do seu estado, deve ser passado essas duas informações pois, no Brasil Uma em cada 11 cidades do país tem uma homônima.

```csharp
DotCEP.Localidades.Municipio.ObterCodigoDoMunicipio("Bom Jesus",DotCEP.UF.PI)
//Saída: 4302303
```

**Nome do município:**Passando o código do município ele retornará o seu nome.

```csharp
DotCEP.Localidades.Municipio.ObterNomeDoMunicipio(3550308)
//Saída: São Paulo
```

**Informações de um um município**

```csharp
DotCEP.Localidades.Municipio municipioBase = new DotCEP.Localidades.Municipio();

municipioBase = DotCEP.Localidades.Municipio.ObterInformacoesDoMunicipio(4314407);
//ou
municipioBase = DotCEP.Localidades.Municipio.ObterInformacoesDoMunicipio("Pelotas",DotCEP.UF.RS);

Console.WriteLine(String.Format("{0} {1} {2}", municipioBase.Codigo, municipioBase.CodigoEstado, municipioBase.Nome));
//Saída: 4314407 43 Pelotas

```

Você pode obter mais informações sobre a utilização e instalação da biblioteca DotCEP na [Wiki](https://github.com/CristianoRC/DotCEP/wiki) do projeto.
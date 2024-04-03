---
title: "Extensions Methods — C#"
author: "Cristiano Raffi Cunha"
date: 2017-09-14T23:35:06.826Z
draft: false
categories:
  - CSharp
tags:
  - C#
  - .NET

---

![](./images/capa.png)

Extensions Methods é uma funcionalidade foi implementada no C# 3.0, e que pode facilitar muito a sua vida. Os Extensions Methods(Métodos de extensão), permite que você “adicione” funcionalidades em um objeto, string, int, DateTime entre outros já existentes, sem precisar modificar, recompilar ou até mesmo criar um tipo derivado, e são chamados do mesmo modo que os definidos no tipo.

A criação de Métodos de extensão, e bem simples, basicamente ele é um método estático, que o seu primeiro parâmetro vai informar o objeto no qual vai atuar, e ele deve vir acompanhado com modificador **this**.

`public static int ObterNumeroDeCaracteres(this string entrada)`

Como exemplo eu vou criar um extension method, que obtém o dia da semana em português, de uma data qualquer passada para um DateTime.

```csharp
using System;
using System.Globalization;

namespace ExtensionMethodsDate
{
	internal static class Extension
	{
		internal static string ObterDiaDaSemana(this DateTime data)
		{
			int diaDaSemana = (int)data.DayOfWeek;

			return DateTimeFormatInfo.CurrentInfo.DayNames[diaDaSemana];
		}
	}
}

```

Nesse método **ObterDiaDaSemana**, é passado uma data qualquer por meio de um DateTime, que chamei de data, é obtido o dia da semana como valor inteiro, e logo após e feita a busca em uma lista com os dias da semana em português utilizando como ID o valor retirado do dia da semana.

> Não foi retornado diretamente o valor de DayOfWeek pois, ele retornaria a string em inglês.

```csharp
using System;
using ExtensionMethodsDate;

namespace ExtensionMethods
{
	class MainClass
	{
		public static void Main(string[] args)
		{
			DateTime dataVerificacao;

			dataVerificacao = Convert.ToDateTime("07/09/1822");

			Console.WriteLine(dataVerificacao.ObterDiaDaSemana());
			Console.ReadKey();
		}
	}
}

```

A utilização é muito fácil, a única coisa que você deve ter atenção, e a importação do namespace, no qual o método de extensão foi escrito, no meu caso, o namespace do software é **ExtensionMethods**, e o método de extensão **ExtensionMethodsDate**, foi feita apenas a importação utilizando a diretiva using para funcionar corretamente.

Mais informações sobre o assunto, você encontra na [documentação da Microsoft](https://msdn.microsoft.com/pt-br/library/bb383977.aspx), até a próxima.

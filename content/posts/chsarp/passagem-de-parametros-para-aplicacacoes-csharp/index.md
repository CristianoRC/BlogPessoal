---
title: "Passagem de parâmetros para a aplicação — C#"
author: "Cristiano Raffi Cunha"
date: 2019-02-04T16:07:32.023Z
lastmod: 2024-04-03T08:29:43-03:00
description: "Como passar comandos do CLI para dentro da sua aplicação .NET C#."
draft: false
categories:
  - CSharp
tags:
  - .NET
images:
  - /posts/chsarp/images/2019-02-04_passagem-de-parâmetros-para-a-aplicação-c-sharp_0.png

---

![](./images/2019-02-04_passagem-de-parâmetros-para-a-aplicação-c-sharp_0.png#center)

### Onde pode ser usado

Com o crescimento da plataforma .Net no Linux com o .NET Core, a linguagem C# se torna mais uma ferramenta disponível para criação de CLI apps. Podendo aproveitar os conhecimentos anteriormente adquiridos na linguagem e na plataforma. 
As ferramentas de linha de comando podem ser utilizadas internamente para automatizar tarefas dentro da sua empresa, ou do seu dia a dia. Podem ser empacotadas e distribuídas para todos os usuários, pois, o .NET core tem uma funcionalidade que [exporta a ferramenta e suas dependências](https://dotnetthoughts.net/how-to-create-a-self-contained-dotnet-core-application/), sem precisar que o cliente instale o Runtime, mesmo o app ficando mais pesado pode ser uma solução.

Para o exemplo, utilizarei uma lib chamada [CommandLineParser](https://www.nuget.org/packages/CommandLineParser/). Você até pode fazer o parse na mão para poucas propriedades, mas conforme vai aumentando o número de parâmetros, configurar na mão vai ficando uma tarefa quase que impossível.

### Como funciona

Para quem não tem ideia de onde esses valores vem, eles dão entrada pelo parâmetro “string[] args” do método Main.

![](./images/2019-02-04_passagem-de-parâmetros-para-a-aplicação-c-sharp_1.png#center)

Se eu rodar a aplicação e logo após passar valores ‘aleatórios’, eles aparecerão na sua aplicação no parâmetro args, a cada espaço em branco que você coloca, ele adiciona um novo texto no array. Exemplo, se eu rodar o comando:

``` bash
dotnet run ola mundo
```

Percorrendo o array args, teremos dois valores ola, e mundo.

#### Tipos de parâmetros

Temos dois tipos, o booleano e o texto. Os booleanos geralmente utilizados como flag como rodar o app mostrando os logs, verbose mode (-v ou --verbose), e do tipo texto que pode ser o nome de um arquivo que deve ser utilizado no processo (-f arquivo.txt ou --file arquivo.txt). Também temos a opção do parâmetro ser obrigatório ou não no caso dos textos, e setar um valor padrão nos booleanos. É por isso que indico o uso da lib, pois ela já faz todo esse tratamento, você apenas se preocupa em criar os parâmetros e suas propriedades e usa-los.

### Configuração da aplicação

Para início de conversa vamos instalar a lib que faz o parse dos parâmetros para você.

```bash
dotnet add package CommandLineParser
```

Vamos separar em duas partes: criação dos parâmetros, em uma classe Options, e a outra a utilização desses dados da Options no seu método Main.

#### Parâmetros

Para configurar os parâmetros, criarei uma classe específica para isso, onde cada uma de suas propriedades vai representar um: Verbose; Color; Title; Name.

```csharp
namespace parametros
{
    public class Options
    {
        public bool Verbose { get; set; }

        public string Color { get; set; }

        public string Title { get; set; }

        public string Name { get; set; }
    }
}
```

Bom após criar a classe com as propriedades, precisamos configura-las para informar as mensagens de ajuda, se é necessária ou não e por aí vai. Para isso a lib utiliza data annotation. Se você não quiser configurar nada a fundo, você deve apenas sinalizar sua propriedade.

```csharp
[Option]

public bool Verbose { get; set; }
```

No vamos utilizar a sobrecarga do Option que tem os parâmetros de short name, long name, e vamos setar as propriedades de required e text help.

**Short name**: Letra para identificar o parâmetro, exemplo muito utilizado é o do verbose, que o pessoal utiliza a letra v, esse tipo de parâmetro sempre é precedido de apenas um sinal de menos. Ex: meuApp -v

**Long name**: Palavra sem espaço, utilizada para identificar o parâmetro. Utilizarei o mesmo exemplo do verbose, que geralmente é utilizado como --verbose. Se você precisar utilizar mais de uma palavra para identificar o parâmetro, como deve trocar o espaço em branco por hífen, ou o[lowerCamelCase](https://pt.wikipedia.org/wiki/CamelCase), na configuração e na utilização. 
Ex: [ meuApp --meu-nome Cristiano ] ou [ … --meuNome Cristiano ]

**Required**: Valor booleano passado na configuração da propriedade, que não deixa seu app executar se esse comando não for passado, ele apresentará uma mensagem na linha de comando.

```log
ERROR(S):
Required option 't, title' is missing.
Required option 'n, name' is missing.
```

**Text help**: Mensagem que aparecerá ao lado de seu parâmetro na linha de comando quando executado o --help ou -h. Ex: meuApp --help

```
-v, --verbose Executar mostrando detalhes

-c, --color Cor da fonte

-t, --title Required. Título para mostrar em modo ‘verboso’

-n, --name Required. Seu nome Completo ex. ‘Cristiano Cunha’
```

**Obs**: Se você precisa passar um texto com espaços como parâmetro, você precisa coloca-lo entre aspas, pois, se não o parser vai pegar somente a primeira palavra.
Ex: meuApp --meu-nome ‘Cristiano Raffi Cunha’

#### Configurações dos parâmetros

```csharp
using CommandLine;

namespace parametros
{
    public class Options
    {
        [Option('v', "verbose", Required = false, HelpText = "Executar mostrando detalhes")]
        public bool Verbose { get; set; }

        [Option('c', "color", Required = false, HelpText = "Cor da fonte")]
        public string Color { get; set; }

        [Option('t', "title", Required = true, HelpText = "Título para mostrar em modo 'verboso'")]
        public string Title { get; set; }

        [Option('n', "name", Required = true, HelpText = "Seu nome Completo ex. 'Cristiano Cunha'")]
        public string Name { get; set; }
    }
}
```

Depois que você colocar o data annotation sobre suas propriedades, só falta o último passo, que é executar o parse desses dados no seu método Main e utiliza-los.

#### Consumindo os dados

```csharp
using System;
using CommandLine;

namespace parametros
{
    class Program
    {
        static void Main(string[] args)
        {

            Parser.Default.ParseArguments<Options>(args)
                .WithParsed(options =>
                {
                    Console.Title = options.Title;
                    
                    if (options.Verbose)
                    {
                        if (!string.IsNullOrEmpty(options.Color))
                        {
                            Enum.TryParse(options.Color, true, out ConsoleColor consoleColor);
                            Console.ForegroundColor = consoleColor;
                        }

                        Console.Clear();
                        Console.WriteLine($"Título informado: {options.Title}\n");
                        Console.WriteLine($"Nome completo: {options.Name}");
                        Console.ReadKey();
                    }
                });
        }
    }
}
```

Basicamente você vai chamar o método ParseArguments, passando como argumento os valores que sua aplicação recebe, nesse caso o args, e no tipo você deve passar o nome da sua classe com as propriedades, que no caso chamei de Options. Após o parse ser feito, chamei o método WithParsed, passando uma arrow function que tem como parâmetro as propriedades com o parse feito. Essa arrow function funciona como um callback, uma [Action](https://docs.microsoft.com/pt-br/dotnet/api/system.action-1?view=netframework-4.7.2) em C#.
Com esses valores em mãos, você já pode tomar as decisões, e setar as configurações que deseja.

Espero ter ajudado, se precisar de ajuda pode entrar em contato pelas redes sociais ou por email: Contato@cristianoprogramador.com

Obrigado!

[Cristianoprogramador.com](https://Cristianoprogramador.com)

### Referências

[Action Delegate (System)](https://docs.microsoft.com/pt-br/dotnet/api/system.action-1?view=netframework-4.7.2 "https://docs.microsoft.com/pt-br/dotnet/api/system.action-1?view=netframework-4.7.2")

[commandlineparser/commandline](https://github.com/commandlineparser/commandline "https://github.com/commandlineparser/commandline")

[CommandLineParser 2.4.3](https://www.nuget.org/packages/CommandLineParser/ "https://www.nuget.org/packages/CommandLineParser/")

[CamelCase - Wikipédia, a enciclopédia livre](https://pt.wikipedia.org/wiki/CamelCase "https://pt.wikipedia.org/wiki/CamelCase")

[https://dotnetthoughts.net/how-to-create-a-self-contained-dotnet-core-application/](https://dotnetthoughts.net/how-to-create-a-self-contained-dotnet-core-application/)

---
title: "Primeiros passos com C# no Linux"
author: "Cristiano Raffi Cunha"
date: 2017-10-03T23:04:35.606Z
description: ""
draft: false
categories:
  - CSharp
  - Linux
tags:
  - C#
  - .NET

---

![](./images/capa.png)

Muitos desenvolvedores de software ainda tem a ideia que o desenvolvimento de software para a plataforma .NET só pode ser feito através do sistema operacional Windows, mas isso não é uma realidade há muito tempo. Desde 2004 já é possível desenvolver para C# no sistema operacional do pinguim, utilizando o [Mono](https://www.mono-project.com/), projeto criado por Miguel De Icaza, que também foi o criador do [Xamarin](https://www.lambda3.com.br/2016/10/o-que-e-xamarin/) e do Gnome, oprojeto ainda existe, e me ajudou bastante na migração para o Linux, pois, essa era a única opção.

Tudo mudou em 2014, quando a Microsoft em parceria com a comunidade iniciou o desenvolvimento da plataforma .NET Core, plataforma que é open source e da suportes para Linux, Windows e Mac. Antes dependíamos de projetos de terceiros como o Mono para trabalha com o .NET fora do Windows.

É legal você dar uma pesquisada sobre as diferenças entre, o Mono, Xamarin, .NET Full, .NET Core e .NET Standard.

![](./images/2018-12-02_primeiros-passos-com-c-sharp-no-linux_1.jpg#center)

### Primeiros passos

Beleza, agora que já derrubamos esse grande mito que o .NET só funciona no Windows, o que fazer, por onde iniciar, uso o .NET Core, Mono…
Se você pretende desenvolver para a web, eu indico iniciar pelo .Net Core. O Mono é uma boa se você precisa desenvolver aplicativos utilizando o [Windows Forms](https://docs.microsoft.com/pt-br/dotnet/framework/winforms/), pois o .NET Core só da suporte a ele no Windows.

Entendi, mas como dar os primeiros passos com C# no linux? Tem que baixar o Visual Studio? Preciso usar só o terminal?

Se você está pensando em desenvolver C# no Linux possivelmente já teve algum contato com o terminal. Se o terminal não te da “medo”, basta fazer a [instalação do SDK](https://dotnet.microsoft.com/download) e você conseguirá trabalhar de maneira fácil com C#, utilizando o editor de texto de sua preferência e poucos comandos, vais consegue criar, e rodar uma aplicação.

Todos os comandos você pode encontrar na [documentação do CLI](https://docs.microsoft.com/pt-br/dotnet/core/tools/?tabs=netcore2x)

Se você não é muito fã de linha de comando e editores de texto, existem alternativas ao famoso Visual Studio.

[**Mono Develop**](https://www.monodevelop.com/): Logo que migrei para o Linux, comecei a utilizar a IDE, ela é muito leve, roda nos três sistemas operacionais, e da suporte para o desenvolvimento web e desktop. Com uma boa interface e leve, é uma ótima pedida para quem não tem um computador muito parrudo e não gosta muito da linha de comando.

[**Visual Studio Code**](https://code.visualstudio.com/): Bom, esse já caiu nas graças de todo mundo, ele oferece um ótimo ambiente para quem precisa trabalhar com C# nas três plataformas. Utilizando o [OmniSharp](https://www.omnisharp.net/) e algumas extensões, ele vira quase uma IDE, podendo até mesmo debugar o seu código de uma manei fácil. Em alguns casos você terá que usar a linha de comando, para tarefas específicas, mas não é nada de mais o CLI do .NET é muito fácil de utilizar. Utilizei o vscode por mais de um ano, no meu dia a dia e tive poucos problemas. É uma boa pedida para quem quer algo leve e que te dê uma produtividade legal.

[**Rider**](https://www.jetbrains.com/rider/): Rider é uma IDE da JetBrains, utilizo ele no meu dia, e creio que essa é a melhor ferramenta para quem trabalha com C#. Já vem com [ReSharper](https://www.jetbrains.com/resharper/), e muitas funcionalidades de uma grande IDE, se aproximando muito do Visual Studio. Ao contrário das outras ele é paga, e bem pesada, tenho 8GB de RAM e mesmo assim da umas “engasgadas”, mas indico utilizar a ferramenta, é muito completa, você que utiliza o Visual Studio para o desenvolvimento “normal”, coisas corriqueiras, não terá muitos problemas na hora de migrar.

### Problemas que você pode vir a ter

Mesmo o .NET Core indo para seu terceiro ano, ainda temos alguns problemas, métodos e classes do framework que ainda não foram migradas para o Linux e, bibliotecas de terceiros que ainda não migraram para .[NET Standard](https://docs.microsoft.com/pt-br/dotnet/standard/net-standard) (Especificações que servem para padronizar uma lib, para que ela possa rodar no .NET Full e no Core sem precisar de alterações).

### Instalação:

Recentemente gravei um vídeo falando sobre como configurar seu ambiente de desenvolvimento C# no Linux, usando o Visual Studio Code, da uma olhada, pode te ajudar.

{{< youtube cp1hOefnfKo >}}


### Conclusão:

Já foi o tempo em que era quase impossível trabalhar com .NET no Linux, hoje essa barreira é muito baixa. Mesmo não tendo muita experiência na área, consegui fazer essa mudança de sistema operacional sem muita “dor”.

Se você esta querendo virar a chave para usar o Linux, mas tem “medo”, crie uma máquina virtual, instale uma distro que seja de fácil configuração como o Ubuntu ou Linux Mint. Brinque com os ambientes de desenvolvimento que mencionei, e também com a linha de comando, até você achar julgar que está preparado para mudar.

Se precisar de ajuda, pode entrar em contato, terei o maior prazer em ajudar, conversar, trocar experiências…

Email: [contato@cristianoprogramador.com](mailto:contato@cristianoprogramador.com)

![](/post/img/2018-12-02_primeiros-passos-com-c-sharp-no-linux_2.gif#layoutTextWidth)

### Referências:

[Guia do .NET Core](https://docs.microsoft.com/pt-br/dotnet/core/ "https://docs.microsoft.com/pt-br/dotnet/core/")[Miguel de Icaza - Wikipedia](https://en.wikipedia.org/wiki/Miguel_de_Icaza "https://en.wikipedia.org/wiki/Miguel_de_Icaza")[Rider, uma IDE .NET pra Linux e Mac](http://gabsferreira.com/rider-a-ide-net-pra-linux-e-mac/ "http://gabsferreira.com/rider-a-ide-net-pra-linux-e-mac/")[Mono (projeto) - Wikipédia, a enciclopédia livre](https://pt.wikipedia.org/wiki/Mono_%28projeto%29 "https://pt.wikipedia.org/wiki/Mono_(projeto)")[Difference Between .NET Framework and .NET Core](https://www.c-sharpcorner.com/article/difference-between-net-framework-and-net-core/ "https://www.c-sharpcorner.com/article/difference-between-net-framework-and-net-core/")[.NET Standard](https://docs.microsoft.com/pt-br/dotnet/standard/net-standard "https://docs.microsoft.com/pt-br/dotnet/standard/net-standard")

[https://www.lambda3.com.br/2016/10/o-que-e-xamarin](https://www.lambda3.com.br/2016/10/o-que-e-xamarin/)

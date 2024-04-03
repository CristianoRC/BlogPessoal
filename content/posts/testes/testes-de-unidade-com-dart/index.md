---
title: "Testes de unidade — Dart"
author: "Cristiano Raffi Cunha"
date: 2019-04-24T20:13:03.563Z
lastmod: 2024-04-03T08:29:53-03:00
description: ""
draft: false
categories:
  - Dart
  - Testes
tags:
  - Flutter
  - Testes de unidade

---

![](./images/2019-04-24_testes-unitáriosdart_0.png#center)

### Porque devemos fazer testes automatizados?

Quem nunca ficou com receio de refatorar algo com medo de quebrar? Quem nunca passou horas debugando para encontrar um erro, que poderia ter sido facilmente encontrado em um teste automatizado? E os testes manuais, quantas vezes você refez após alterar algo? Além de tudo isso, com a criação dos testes, e principalmente com o uso de [TDD](https://pt.wikipedia.org/wiki/Test_Driven_Development), a qualidade do seu software crescer, e muito!

### O que precisamos

Para criar e executar os testes unitários na linguagem Dart, precisamos instalar o pacote [test](https://pub.dartlang.org/packages/test). Para instalar é bem simples: abra o seu arquivo pubspec.yaml, e na parte de dependências, você coloca o nome do pacote e a sua versão.

``` yaml
dev_dependencies:

test: ^1.6.1
```

Instalei a dependência apenas como desenvolvimento dev_dependencies, para quando sua aplicação for publicada, esse pacote não subir junto.

Se você estiver utilizando o editor de texto [vscode](https://code.visualstudio.com/), ele “automagicamente” vai baixar e instalar o pacote, se não, basta você ir pelo terminal até a pasta onde se encontra o arquivo de dependências pubspec.yaml, e executar o comando:

``` bash
pub get
```

Se você estiver utilizando o [Flutter](https://flutter.dev/), é o seguinte comando:

``` bash
flutter packages get
```

### Criando a função

A ideia é criar um método para calcular desconto, e fazer alguns testes. A função retorna o valor com desconto aplicado, e tem como entrada um **valor inicial,**o**valor do desconto,**e um booleano informando se o valor do desconto é em **porcentagem**, ou em **reais**.

``` dart
double calcularDesconto(
    double valorInicial, double desconto, bool ehPorcentagem) {
  if (desconto <= 0)
    throw new ArgumentError("O desconto deve ser maior que zero!");

  if (valorInicial <= 0)
    throw new ArgumentError("O valor inicial deve ser maior que zero!");

  if (ehPorcentagem) {
    return valorInicial - (valorInicial * desconto / 100);
  }

  return valorInicial - desconto;
}

```

É bem simples, os valores de desconto e inicial devem ser maiores que zero, se for porcentagem, calculamos o valor da e subtraímos do inicial, se não apenas subtraímos o valor inicial do desconto.

Bom, a minha estrutura de arquivos ficou assim, mas você pode organizar da forma que quiser.

```
Projeto
├── testes/
│   ├── teste_Descontos.dart
└── descontos.dart/

```

* Dentro do arquivo desconstos.dart ficou a função calcularDesconto, que mostrei acima.

### Executando os primeiros testes

Para executar os testes precisamos criar uma função main, e dentro dela será executada todos os testes.

Dentro do arquivo de testes precisamos também importar duas dependências, o pacote de testes, e o arquivo Dart onde está sendo implementado a funcionalidade que você quer testar.

```dart
import 'package:test/test.dart';import '../descontos.dart';

void main() {  //Seus testes aqui

}
```

Todos os testes executam dentro de uma função **test.** Ela recebe dois parâmetros, primeiro vem a descrição do teste, e logo após vem uma função onde será executada todas as validações.

```dart
test('Deve clacular desconto corretamente utilizando valores decimais', () {   //Suas validações aqui});
```

Nesse caso estou validando o cálculo de desconto quando os valores são em dinheiro(R$ nesse caso). Basicamente se eu passar um valor sem desconto de **R$ 150**um desconto de**R$ 25**, a função deveria retornar o valor de **R$ 125.**É simples, agora precisamos passar isso para o código.

```dart
test('Deve clacular desconto corretamente utilizando valores decimais', () {
    const desconto = 25.0;
    const valorSemDesconto = 150.0;
    const valorComDesconto = valorSemDesconto - desconto;
    expect(
        calcularDesconto(valorSemDesconto, desconto, false), valorComDesconto);
  });
```

Defini três constantes, que são os valores para o nosso cálculo, e logo após chamei uma função nova para nós, a **expect**. A função recebe dois parâmetros, o primeiro é o resultado que seu algoritmo retornou, e o segundo é o valor que ele deveria retornar. Criei uma constante valorComDesconto, que calculei na mão, e para esse teste passar, o resultado da nossa função deve estar igual à constante valorComDesconto.

```dart
import 'package:test/test.dart';
import '../descontos.dart';

void main() {
  const valorSemDesconto = 150.0;

  test('Deve clacular desconto corretamente utilizando valores decimais', () {
    const desconto = 25.0;
    const valorComDesconto = valorSemDesconto - desconto;
    expect(calcularDesconto(valorSemDesconto, desconto, false),
        equals(valorComDesconto));
  });
}

```

Pronto, já podemos executar nosso primeiro teste!

#### Execução

Para executar os testes, va até à pasta onde está o seu projeto, e executar o seguinte comando:

```bash
pub run test nome_Do_Seu_Arquivo_De_Teste.dart
```

Saída: No nosso caso o teste passou, aí ele retorna um +1

![](./images/2019-04-24_testes-unitáriosdart_1.png#center)

Se você tem uma pasta com vários arquivos de teste, como tenho aqui, você pode executar todos de uma vez só, apenas alterando o comando, ao invés de passar o nome do arquivo por último, você passa o diretório e depois o caractere **‘*’** informando que quer executar todos os arquivos que lá estão.

```bash
pub run test test/*
```

#### Erros

Quando ocorre erro, aparece no terminal algumas informações para ajudar na solução:

![](./images/2019-04-24_testes-unitáriosdart_2.png#center)

Ele mostra para nós o arquivo, linha e descrição do teste onde ocorreu o problema(Por isso é importante ter uma descrição de acordo com o que o teste deve fazer), e os dois valores, o que era esperado, e o que foi calculado.

### Capturando exceptions nos testes

Na nossa função tem duas validações que geram uma exception, que são dos valores de desconto e inicial ≤. Para conseguir validar isso nos testes é um pouco diferente.

Eu coloquei duas validações no mesmo teste, não tem problema nem limites, mas, é importante a sua descrição informar o que está fazendo.

```dart
  test('Deve dar erro ao calcula valor com desconto negativo ou zero', () {
    expect(() => calcularDesconto(valorSemDesconto, -1, true),
        throwsA(TypeMatcher<ArgumentError>()));

    expect(() => calcularDesconto(valorSemDesconto, 0, false),
        throwsA(TypeMatcher<ArgumentError>()));
  });
```

Para pegar exceptions é um pouco diferente, dentro da função que executa os testes temos que usar uma [arrow function](https://www.dartlang.org/guides/language/language-tour#functions) que executa nossa função de cálculo, e o esperado será uma função throwsA, que recebe por parâmetro um TypeMatcher, que é o tipo do erro, que deve ser lançado(throw), na nossa função ele é chamado nesse momento:**throw new ArgumentError(…**

A execução dos testes e os erros serão mostrados do mesmo modo.

### O que devo estudar agora?

Existem outras funcionalidades dos testes, setUp(), tearDown(), e outros detalhes que você pode encontrar na [documentação do pacote](https://pub.dartlang.org/packages/test).

Além da parte de código, eu indico fortemente o estudo de [TDD](https://www.youtube.com/watch?v=bLdEypr2e-8)(Desenvolvimento guiado por testes), isso vai ajudar você escrever códigos cada vez mais limpos, e com uma grande cobertura de testes, da uma olhada nesse vídeo do pessoal do Código fonte, vai te ajudar a entender esse conceito.

{{< youtube bLdEypr2e-8 >}}

**E escreva teste! Com o tempo você verá o retorno desse “tempo perdido”!**

Link do repositório com os exemplos que utilizei: [https://git.io/fjONx](https://git.io/fjONx)

Se tiver dúvidas, podes me achar nas redes sociais, da uma olha no meu site que você encontrar todas as formas.
[https://cristianoprogramador.com](https://cristianoprogramador.com)

Dart é uma tecnologia que comecei a estudar a pouco tempo, e resolvi escrever para ajudar o pessoal que está aprendendo, e também como uma forma de documentar meus estudos, se você encontrou algum erro, ou quer dar uma sugestão de correção fique a vontade, gostarei muito de receber o seu feedback.

Obrigado!

### Referências

[test | Dart Package](https://pub.dartlang.org/packages/test "https://pub.dartlang.org/packages/test")

[A Tour of the Dart Language](https://www.dartlang.org/guides/language/language-tour#functions "https://www.dartlang.org/guides/language/language-tour#functions")

[throwsA function - test_api library - Dart API](https://docs.flutter.io/flutter/package-test_api_test_api/throwsA.html "https://docs.flutter.io/flutter/package-test_api_test_api/throwsA.html")

[Test Driven Development - Wikipédia, a enciclopédia livre](https://pt.wikipedia.org/wiki/Test_Driven_Development "https://pt.wikipedia.org/wiki/Test_Driven_Development")

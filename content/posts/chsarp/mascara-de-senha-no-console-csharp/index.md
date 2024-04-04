---
title: "Utilizando mascara de senha no console - C#"
author: "Cristiano Raffi Cunha"
date: 2017-10-03T23:04:35.606Z
description: ""
draft: false
categories:
  - CSharp
  - Seguranca
tags:
  - C#
  - .NET
images:
  - /posts/chsarp/mascara-de-senha-no-console-csharp/images/capa.png
  
---

![](./images/capa.png)

O C# por padrão não disponibiliza ferramentas para entrada de senhas via console, mas com poucas linhas de código você pode criar uma uma funcionalidade para aumentar a privacidade de sua aplicação.

Para resolver o "problema", utilizaremos o [ConsoleKeyInfo](https://msdn.microsoft.com/pt-br/library/system.consolekeyinfo%28v=vs.110%29.aspx), que basicamente serve para ler a tecla pressionada no console. Para uma leitura correta temos que tomar cuidado em três casos especiaos, pois o CosoleKeyInfo escuta todas as teclas.

- Teclas Del e backspace
- Tecla Enter
- Teclas especiais Shift, Alt, F1 …

A funcionalidade contém três métodos:

- **LerSenha -** Lê as informações passadas via teclado, mostra no console um caractere especial, que pode ser configurado, e por fim retorna uma string contendo as informações inseridas via console.
- **deletarTexto -** Verifica se foi pressionada uma das teclas de deletar caractere, delete ou backspace, para que o último caractere possa ser removido da string e do terminal.
- **verificarCaracterValido -** Verifica se a tecla que foi pressionada é um alfanumérico, pontuação ou símbolo.

```csharp
public static string LerSenha()
{
    StringBuilder pw = new StringBuilder();
    bool caracterApagado = false;

    while (true)
    {
        ConsoleKeyInfo cki = Console.ReadKey(true);

        if (cki.Key == ConsoleKey.Enter)
        {
            Console.WriteLine();
            break;
        }

        if (deletarTexto(cki))
        {
            if (pw.Length != 0)
            {
                Console.Write("\b \b");
                pw.Length--;

                caracterApagado = true;
            }
        }
        else
        {
            caracterApagado = false;
        }

        if (!caracterApagado && verificarCaracterValido(cki))
        {
            Console.Write('•');
            pw.Append(cki.KeyChar);
        }
    }

    return pw.ToString();
}

private static bool verificarCaracterValido(ConsoleKeyInfo tecla)
{
    if (char.IsLetterOrDigit(tecla.KeyChar) || char.IsPunctuation(tecla.KeyChar) ||
        char.IsSymbol(tecla.KeyChar))
    {
        return true;
    }
    else
    {
        return false;
    }

}

private static bool deletarTexto(ConsoleKeyInfo tecla)
{
    if (tecla.Key == ConsoleKey.Backspace || tecla.Key == ConsoleKey.Delete)
        return true;
    else
        return false;
}
```

O método de leitura têm um StringBuilder que é onde ficam os caracteres válidos inseridos pelo usuário, uma variável de controlo para saber se o caractere pressionado é o Del ou Backspace, e tudo isso rodando em um loop infinito, cuja condição de saída é a tecla Enter.

Observações:

- Console.Write(“\b \b”) : Remove o último caractere da linha no terminal
- Tecla Enter pw.Length- - : Remove o último caractere da string de retorno do método de leitura.

O código para fazer a leitura é bem simples, mas você pode fazer outras implementações, como a leitura retornando uma string Hash md5, que você pode [encontrar aqui](https://gist.github.com/CristianoRC/fe41af87e3cad3c76c277b4f6926dfb0).

Esse foi um exemplo de senha, que pode ser bem útil para sua aplicação console. Se tiver dúvidas pode comentar no artigo, ou entrar em contato por e-mail: [Contato@cristianoprogramador.com](mailto:contato@cristianoprogramador.com)
[https://cristianoprogramador.com](https://cristianoprogramador.com)
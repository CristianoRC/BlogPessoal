---
title: "LocalHost na web de maneira fácil"
author: "Cristiano Raffi Cunha"
date: 2019-03-20T22:19:58.469Z
lastmod: 2024-04-03T08:29:49-03:00
description: ""
draft: false
categories:
  - Dicas
tags:
  - Redes

---

![](./images/2019-03-20_localhost-na-web-de-maneira-fácil_0.png#center)

Quem nunca faz um projeto pessoal, ou para faculdade, precisou mostrar para alguém mas, não conseguiu?

Em algumas situações, nós não podemos abrir as portas do roteador e/ou configurar o firewall. Para resolver esse problema, e facilitar a nossa vida, foram criados serviços que com poucas linhas, ou cliques conseguimos expor nosso site e/ou serviços na web.

Esses serviços utilizam o SSH port forwarding, também conhecido como SSH tunneling. Ao invés de você abrir as portas da sua rede, o que não é algo muito seguro para se fazer, ele cria um túnel [SSH](https://pt.wikipedia.org/wiki/Secure_Shell) entre o seu “localhost” e um servidor que fica encarregado de expor essa porta para web.

![](./images/2019-03-20_localhost-na-web-de-maneira-fácil_1.png#center)

De uma olhada [nesse vídeo](https://www.youtube.com/watch?v=AtuAdk4MwWw), é em Inglês, mas, se você for devagar e prestando atenção nas imagens, vai conseguir entender bem o conceito de SSH Tunneling.

#### Serveo

Utilizaremos o Serveo, como serviço para expor nosso localhost para a web, ele é free, e não precisa de cadastro para utilizar. Abaixo um texto resumindo o funcionamento desse serviço:

> O Serveo é um servidor SSH apenas para encaminhamento de porta remota. Quando um usuário se conecta ao Serveo, ele recebe uma URL pública que qualquer pessoa pode usar para se conectar ao seu servidor localhost.
> (Tradução do texto informativo do [Site do Serveo](https://serveo.net/#intro))

### Como utilizar

Para poder dar seguimento, você precisa ter instalado um cliente SSH no seu computador, no Linux e Mac, indico a instalação do [OpenSSH](https://www.openssh.com/), no Windows, algumas versões do sistema já trazem ele instalado, e pode usa-lo pelo PowerShell.

#### Redirecionamento

Para fazer esse redirecionamento de porta via SSH, utilizamos o argumento
 -R utilizado para redirecionamento, seguido da porta que será exposta na WEB(80), o IP local, que pode ser substituído por localhost, e a porta que o seu serviço esta rodando no “localhost”. Por último, o destino, que é o servidor que iremos conectar: serveo.net.

```bash
ssh -R 80: localhost: 80 serveo.net
```

![](./images/2019-03-20_localhost-na-web-de-maneira-fácil_2.png#center)

Executando o comando, ele irá conectar com os servidores do serveo, e mostrará no terminal o link que foi gerado para que possam acessar o seu “localhost” remotamente.

O link segue sempre um padrão: NomeAleatorio.serveo.net:porta, porta que pode ser omitida dependendo da situação, no exemplo acima, estou expondo a porta 80, que não precisa ser colocada no caso de sites. Se você tentar acessar [cristianoprogramador.com](https://cristianoprogramador.com/) ou [cristianoprogramador.com:80](https://cristianoprogramador.com:80) é a mesma coisa, pois seu navegador resolve isso.

#### Subdomínio específico

Bom, no exemplo acima ele gerou um valor aleatório para o subdomínio, mas, você pode escolher, no meu caso utilizo cristianorc.serveo.net. Para fazer isto, basta alterar o bind address, valor que anteriormente não setamos.

```bash
ssh -R subdominio.serveo.net:80: localhost: 80 serveo.net
```

Com isso ele geraria um um link **subdominio.serveo.net:80**, que quando acessada mostrará o conteúdo contido no seu localhost:80.

![](./images/2019-03-20_localhost-na-web-de-maneira-fácil_3.png#center)

### Indo além

Acima falamos um pouco sobre as instruções básicas do redirecionamento de porta, mas, podemos fazer algumas configurações mais avançadas:

* Utilizar domínio personalizado
* Mantenha a conexão ativa
* Reconectar automaticamente;
* Criar seu próprio servidor Serveo;

Se você quiser aprender mais sobre essas configurações, você pode ir diretamente no site do [Serveo.net](https://serveo.net/). No momento não pretendo trazer os conteúdos mais avançados, mas, se precisar de ajuda para fazer as configurações, podes entrar em contato pelo e-mail: [contato@cristianoprogramador.com](https://mailto:contato@cristianoprogramador.com).

Pode me achar também nas minhas redes sociais, da uma olha no meu site que você encontrar todas as formas.[
https://cristianoprogramador.com](https://cristianoprogramador.com)

OBrigado ;D

### Referências:

[SSH port forwarding - Example, command, server config | SSH.COM](https://www.ssh.com/ssh/tunneling/example "https://www.ssh.com/ssh/tunneling/example")

[Serveo: expose local servers to the internet using SSH](https://serveo.net "https://serveo.net")

[ngrok - secure introspectable tunnels to localhost](https://ngrok.com "https://ngrok.com")

[OpenSSH](https://www.openssh.com/ "https://www.openssh.com/")

[Beginners Guide to Port Forwarding](https://www.youtube.com/watch?v=jfSLxs40sIw)

[SSH Tunneling Explained](https://www.youtube.com/watch?v=AtuAdk4MwWw)

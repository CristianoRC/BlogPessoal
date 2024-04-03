---
title: "Servidores para quem tem preguiça — Docker"
author: "Cristiano Raffi Cunha"
date: 2019-01-06T02:52:50.911Z
lastmod: 2024-04-03T08:29:35-03:00
description: ""
draft: false
categories:
  - Docker
  - Linux
  
---

![](./images/2019-01-06_servidores-para-quem-tem-preguiçadocker_0.png#center)

Nem todo mundo gosta de criar e configurar servidores para testar novas tecnologias. O Docker veio para resolver o problema dos “preguiçosos”, que querem utilizar aquele banco de dados novo, ou quer testar aquele serviço que lançaram, mas na hora que vai ver o tanto de coisa que tem que configurar, abandona tudo, “joga a toalha”.

Utiliza-lo para criar servidores para estudos é legal, mas não é a principal função. Docker é uma ótima ferramenta para padronizar ambientes de desenvolvimento e produção, e automatização dos processos de build.

O Docker basicamente é uma máquina virtual evoluída(Claro que não é só isso), ele utiliza o seu sistema operacional para criar o servidor, mas continua sendo isolado do seu sistema operacional, ao contrário de uma vm que virtualiza o sistema operacional, gerando mais gasto de memória e processamento para seu computador.

![](./images/2019-01-06_servidores-para-quem-tem-preguiçadocker_1.png#center)

Nós já sabemos o que é o tal de Docker, a ferramenta que gerencia os containers, mas o que eles são?
Container representa cada um dos serviços que está rodando, a imagem a cima representa eles como App A e por aí vai. Cada um deles roda um serviço, e um não interfere no outro, você pode ter dois bancos do PostgreSQL rodando e um nem saber que o outro existe.

Além de criar os seus containers para distribuir, ou para poder apagar e recriar quando quiser, existem os chamados Docker registry, que oferecem imagens prontas para executar, o mais famoso deles é o [Docker Hub](https://hub.docker.com/). Entra lá e da uma olhada na quantidade de imagens que você pode utilizar e colocar o seu serviço no ar em poucos segundo!

![](./images/2019-01-06_servidores-para-quem-tem-preguiçadocker_2.png#center)

Bom já chega de teoria, e vamos passar para a prática! Vamos colocar nosso primeiro container no ar!

Antes de tudo temos que instalar o docker, ele roda nos três principais sistemas operacionais do mercado: [**Windows**](https://docs.docker.com/docker-for-windows/install/) **,** [**Linux**](https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-18-04-pt) **e** [**Mac**](https://docs.docker.com/docker-for-mac/install/#install-and-run-docker-for-mac)

Para facilitar vamos usar a linha de comando, no Linux e no Mac você pode usar o Terminal e no Windows o powerShell. Para testar se a instalação está correta e o serviço do docker esta rodando abra o seu terminal digite: docker.
A saída deve ser parecida com a imagem abaixo.

![](./images/2019-01-06_servidores-para-quem-tem-preguiçadocker_3.png#center)

### Containers na prática

A ideia é colocar no ar um servidor de postgreSQL, e vocês verão o quão fácil e rápido é esse procedimento.
Vou pegar a imagem do servidor lá no [Docker Hub](https://hub.docker.com/), é só entrar no site e buscar por PostgreSQL. Escolhi a [imagem oficial](https://hub.docker.com/_/postgres).

#### Docker pull

Vamos dar nossos primeiros comandos, não se preocupe em gravar nada, apenas entender o funcionamento! O primeiroDocker para quem tem preguiça deles vai ser o docker pull**,**comando que faz o download da imagem do registry para a seu computador, no caso do Postgre, o Docker Hub informa que o comando é:

```bash
docker pull postgres
```

Essa é a parte mais demorada, ele irá baixar todos os arquivos necessários, mas isso é executado uma vez quando vai baixar a imagem, na hora de executar o container não temos todo esse processo.

![](./images/2019-01-06_servidores-para-quem-tem-preguiçadocker_4.png#center)

#### Docker images

Para verificar todas as imagens que você baixou para seu computador, você tem que executar o comando

```bash
docker images
```

![](./images/2019-01-06_servidores-para-quem-tem-preguiçadocker_5.png#center)

#### Docker run

Se a imagem já está na sua máquina, agora é só colocar o serviço no ar! Para isso o comando utilizado é o **docker run,** esse é o comando mais complexo que vamos aprender, mas também não é coisa de outro mundo. Ele cria o seu container, e a dificuldade que existe são os parâmetros de criação, mas se você for no site do Docker Hub lá tem toda uma documentação desses parâmetros para você criar do modo que deseja.

`docker run --name nomeDoContainer -e POSTGRES_PASSWORD=suaSenhaAqui -d postgres`

Agora vamos por partes entender esse comando:

--name serve para setar o nome do container, que não deve conter espaços.

-e utilizado para passagem de variáveis de ambiente, que nesse caso vamos passar um valor para a variável de senha do Postgre, setando a variável de ambiente POSTGRES_PASSWORD.

-d faz o container rodar em background, ele vai iniciar o container, te retornar o id, e ele vai continuar rodando. Depois faça alguns testes, se você rodar sem esse parâmetro o container vai ficar rodando enquanto você tiver com o terminal aberto, quando fechar o container é desligado.

Por último, o nome da imagem que nesse caso é postgres.

E pronto seu servidor está no ar, passando os parâmetros dessa forma toda vez que o serviço do Docker é iniciado, o seu container inicia junto.

#### Docker ps

Para ter certeza se seu servidor está no ar, vamos usar o comando para listar todos os containers em funcionamento, **docker ps**, se utilizarmos o parâmetro -a, iremos listar todos nossos container ligados ou desligados.

```bash
docker ps
docker ps -a
```

![](./images/2019-01-06_servidores-para-quem-tem-preguiçadocker_6.png#center)![](./images/2019-01-06_servidores-para-quem-tem-preguiçadocker_7.png#center)

obs: criei um contaier de teste e desliguei, só para mostrar o comando com o parâmetro -a.

#### Acessando o servidor

E pronto você já pode acessar o seu servidor, usando o usuário padrão do banco, nesse caso postgres e a senha que você passou pro parâmetro, suaSenhaAqui. Ta, mas qual o ip que o meu container ficou? Para saber o ip do servidor você pode rodar esse comando, que irá mostrar o ip ao lado do nome de cada container, nome que você deve passar na hora da criação do container com o parâmetro --name.

```bash
docker inspect -f ‘{{.Name}} — {{.NetworkSettings.IPAddress }}’ $(docker ps -aq)
```

![](./images/2019-01-06_servidores-para-quem-tem-preguiçadocker_8.png#center)

### Controle dos containers

Depois de criado, você pode parar, executar e excluir seus containers quando quiser com três comandos.

#### docker stop

O comando docker stop para temporariamente o seu container, e ele recebe como parâmetro o nome do container.

```bash 
docker stop nomeDoSeuContainer
```

#### docker start

Ele volta a executar o container que você parou, e ele também recebe por parâmetro o nome do container, que você pode encontrar dando o comando **docker ps -a**

```bash
docker start nomeDoSeuContainer
````

#### docker rm

para aplicar esse comando você precisa dar um stop no container antes, e uma vez feito não tem mais volta.

```bash
docker rm nomeDoSeuContainer
```

### Quero aprender mais e agora?

É claro que com esses conhecimentos adquiridos você não vai sair colocando docker em produção, mas já é um início para você que não gosta de fazer trabalho repetitivo.
Se você quer aprender mais sobre, indico três fontes, [a documentação do docker](https://docs.docker.com/), o excelente material feito pelo Linux Tips, que é onde estou aprendendo sobre o assunto, [da uma olhada no canal dele](https://www.youtube.com/user/linuxtipscanal)! Por último, um [vídeo sobre os primeiros passos, lá do pessoal da pagar.me.](https://www.youtube.com/watch?v=hCMcQfGb4cA)

Trouxe um pouco do que estou estudando do Docker, se você precisar de ajuda para dar os primeiros passos, pode entrar em contato por email: contato@cristianoprogramador.com

Muito obrigado!
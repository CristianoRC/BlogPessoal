---
title: "Estratégia de backup de YubiKey: por que duas chaves, não uma"
author: "Cristiano Raffi Cunha"
date: 2026-08-12T00:00:00-03:00
lastmod: 2026-08-12T00:00:00-03:00
description: "Chave em hardware não se clona. Quantas YubiKeys ter, o que dá e o que não dá para duplicar entre elas, e como testar a reserva antes de precisar dela."
draft: false
categories:
  - Segurança
tags:
  - YubiKey
  - FIDO2
  - SSH
  - GitHub
  - Backup
images:
  - /posts/seguranca/estrategia-backup-yubikey/images/capa.png
---

![capa](./images/capa.png#center)

Chave em hardware não se clona. É isso que torna a YubiKey útil e é isso também que transforma um dispositivo perdido em uma conta inacessível. Não são dois fatos, é o mesmo fato visto de dois ângulos.

Então backup, aqui, quase nunca é cópia. Para a parte mais usada da chave não existe export da privada, não existe arquivo para guardar no cofre, não existe suporte da Yubico que recupere. O que existe é uma **segunda chave, cadastrada em paralelo**, gerando o próprio par dentro do próprio hardware.

Isso vale para tudo que você põe no dispositivo: passkey de login, segundo fator, TOTP, SSH, assinatura de commits, certificado corporativo. O [guia de SSH e assinatura de commits](/posts/seguranca/yubikey-github-ssh-macos/) cobre um desses usos. Aqui está a estratégia que vale para todos.

## Duas é necessidade, três é recomendação

Uma chave só não é uma configuração, é um ponto único de falha esperando a data. Perdeu, quebrou, foi resetada por engano: acabou. **Duas é o mínimo que torna o arranjo sobrevivível**, e é o número que você precisa ter em mãos *antes* de sair habilitando a chave como fator em qualquer lugar.

A terceira é recomendação, e o que a justifica é o acidente que leva as duas primeiras juntas. A mochila roubada com o laptop e a reserva dentro. O incêndio ou o alagamento em casa. A mudança em que a caixa "diversos" não chegou. Duas chaves na mesma casa protegem contra perder uma chave, não contra perder a casa.

Daí a distribuição: a do dia a dia no chaveiro, a reserva em casa mas longe da primeira, e a terceira fora de casa, no trabalho, na casa de um familiar ou no cofre de um banco. Se for para ter só duas, que a segunda já fique fora do alcance do mesmo acidente.

## O que se duplica e o que não se duplica

Cada applet da chave segue uma regra, e é isso que define o trabalho de manter a reserva em dia. São os mesmos nomes que aparecem quando você roda `ykman info`:

| Applet | Duplicável? | Como fica nas duas chaves |
| --- | --- | --- |
| FIDO2 (passkeys, SSH `-sk`) | Não | Cada chave gera o próprio par; registre as duas em cada serviço |
| PIV | Só se gerar fora | `ykman piv keys import` nas duas. Gerada com `generate`, a privada não sai: `export` devolve só a pública |
| OpenPGP | Só se gerar fora | Gere no GnuPG, guarde o backup offline, e `keytocard` em cada uma |
| OATH (TOTP) | Sim | O segredo é do serviço: `ykman oath accounts add` nas duas, lendo o mesmo QR code |

A regra prática sai daí: o que dá para duplicar, duplique na hora do cadastro, com as duas chaves na mesa. O que não dá, caso do FIDO2, que é justamente o mais usado hoje, exige registrar a reserva serviço por serviço. É por isso que "depois eu configuro" não funciona: depois significa refazer o cadastro em vinte lugares, com a chave que você ainda tem.

## Onde a chave é fator

Antes de guardar a reserva na gaveta, faça o inventário. A pergunta é simples: se a principal sumir hoje, o que eu não consigo mais abrir?

A lista costuma ser maior do que parece: passkey de login do Google, Microsoft e Apple; segundo fator do GitHub, AWS, Cloudflare; o gerenciador de senhas, que é o pior de todos, porque é de onde sairiam as senhas para recuperar o resto; VPN e login da empresa; os códigos TOTP guardados na chave; chave SSH e assinatura de commits.

Cada item dessa lista é um cadastro que a reserva também precisa ter. Uma reserva registrada em metade dos serviços não é uma reserva. É a lista dos serviços que você vai perder.

Guarde os recovery codes de cada serviço junto com a chave que fica fora de casa. Eles são a via de acesso quando não sobrou nenhum dispositivo, e não adianta guardá-los na mesma gaveta que as chaves.

## O detalhe do SSH: um `application=` por chave

Se você usa o fluxo FIDO2 para SSH, há uma armadilha específica. Ao gerar a chave da reserva, mude o application id junto com o nome do arquivo:

```bash
ssh-keygen -t ed25519-sk \
  -O resident \
  -O application=ssh:github-backup \
  -C "voce@exemplo.com (backup)" \
  -f ~/.ssh/id_ed25519_sk_github_backup \
  -N ""
```

O `ssh-keygen -K`, que recupera credenciais residentes numa máquina nova, deriva o nome do arquivo do application id, cortando o prefixo `ssh:`. Então `ssh:github` vira `id_ed25519_sk_rk_github` e `ssh:github-backup` vira `id_ed25519_sk_rk_github-backup`.

Se as duas chaves usarem `ssh:github`, os arquivos disputam o mesmo nome. Recuperando as duas na mesma máquina, o `ssh-keygen` pergunta se pode sobrescrever. Se você responder que não, ele não pula para a próxima credencial, encerra o download ali. Você termina com um arquivo só, sem saber de qual chave ele veio, na máquina nova e sem acesso.

Application ids distintos também são o que torna legível a saída de `ykman fido credentials list` seis meses depois.

## Testar a reserva

Backup que nunca foi usada é suposição. A cada poucos meses, desplugue a principal e use a reserva de verdade. Ver que ela aparece na lista de dispositivos cadastrados não prova nada.

Faça um login completo no serviço que mais doeria perder, que costuma ser o gerenciador de senhas. Se você usa o fluxo SSH, teste as duas pontas:

```bash
ssh -T git@github.com
```

```bash
cd /tmp && git init teste-backup && cd teste-backup
git config user.signingkey ~/.ssh/id_ed25519_sk_github_backup.pub
git commit --allow-empty -m "test: backup key"
git log --show-signature -1
```

O esperado é `Good "git" signature for <seu e-mail>`. Se aparecer `No principal matched`, falta a linha dessa chave no `allowed_signers`, e o teste já valeu o tempo que levou.

```bash
cd /tmp && rm -rf teste-backup
```

A chave que fica fora de casa entra no rodízio uma vez por ano, quando você passar perto dela. É pouco, e ainda assim é melhor do que descobrir na emergência que ela nunca chegou a ser registrada.

## Quando uma chave se perde

Trate como comprometida, mesmo achando que ela caiu no sofá. Quem estiver com ela em mãos consegue usar tudo que não exige PIN.

Vá pelo inventário, serviço por serviço, removendo o dispositivo perdido de cada um. Duas coisas costumam escapar nessa hora.

A primeira é que o mesmo serviço guarda a chave em mais de um lugar, em telas diferentes. Segundo fator numa página, passkey em outra, chave de acesso a repositório em outra. Você apaga em uma tela, vê o dispositivo sumir da lista e acha que acabou, mas os outros registros continuam valendo. No GitHub, por exemplo, a mesma chave física aparece em três cadastros distintos, dois em **SSH and GPG keys** e um em **Password and authentication**.

A segunda é a sua máquina, que continua apontando para uma chave que não existe mais. No caso do SSH, é a linha dela no `~/.ssh/allowed_signers` e o `IdentityFile` no `~/.ssh/config`. Cada uso que você configurou tem um arquivo assim para limpar.

Por último, promova: a reserva vira principal, a que estava fora de casa vira reserva, e você compra a terceira. Um sistema de três chaves que não é reposto depois do primeiro incidente vira um sistema de duas, e você acabou de aprender do jeito caro por que duas é o mínimo.

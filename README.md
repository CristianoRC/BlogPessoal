# Blog Pessoal

Blog técnico do Cristiano Raffi Cunha, publicado em [blog.cristianoprogramador.com](https://blog.cristianoprogramador.com).

Site estático feito com [Hugo](https://gohugo.io/), tema [Lowkey](https://github.com/nixentric/Lowkey-Hugo-Theme) (versão adaptada, `enchanted-lowkey`) e deploy automático no GitHub Pages.

## Requisitos

- **Hugo extended** 0.110.0 ou superior (o build do GitHub Actions usa a 0.154.5). A versão extended é obrigatória porque o tema processa CSS com PostCSS.
- **Node.js** com npm, para as dependências de build do CSS (Tailwind, PostCSS, autoprefixer, cssnano).
- **Dart Sass** só no CI. Localmente não é necessário.

No macOS:

```bash
brew install hugo
```

## Rodando local

```bash
npm install          # só na primeira vez
npm start            # equivale a: hugo server -D
```

O `-D` inclui os rascunhos (`draft: true`). O site sobe em <http://localhost:1313>.

Para gerar os arquivos finais em `public/`:

```bash
hugo --minify
```

## Deploy

Todo push na `main` dispara o workflow [deploy.yml](.github/workflows/deploy.yml), que instala o Hugo, roda `npm ci`, faz o build com `--minify` e publica no GitHub Pages. Também é possível disparar na mão pela aba Actions (`workflow_dispatch`).

O domínio customizado vem do arquivo [CNAME](CNAME). Se ele for removido do repositório, o Pages volta a servir no domínio padrão do GitHub.

## Configuração

| Arquivo | Conteúdo |
| --- | --- |
| [config/_default/hugo.toml](config/_default/hugo.toml) | baseURL, idioma, paginação, realce de código, Disqus |
| [config/_default/params.toml](config/_default/params.toml) | descrição, avatar, favicon, emoji, giscus |
| [config/_default/menus.toml](config/_default/menus.toml) | menu do topo e links das redes sociais |

Os comentários hoje usam Disqus. O tema também suporta [giscus](https://giscus.app), que é desligado por padrão em `params.toml`.

## Licença

O tema em `themes/enchanted-lowkey/` é MIT, do [Nixentric](https://github.com/nixentric/Lowkey-Hugo-Theme). Os textos e imagens dos posts são de autoria do Cristiano Raffi Cunha.

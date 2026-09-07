# Site da Neo Clínica

Site institucional da Neo Clínica, centro de saúde e especialidades com sede
em Marília/SP e atendimento em Garça/SP. HTML estático puro: sem framework,
sem dependência de terceiros, sem build obrigatório para funcionar.

**Prévia publicada:** https://filipejefte.github.io/neo-clinica-site/

## Como está organizado

```
src/dados.mjs      tudo o que o site diz sobre a clínica (única fonte de verdade)
src/artigos.mjs    textos da seção Orientações
src/chrome.mjs     head, cabeçalho, rodapé, ícones, CSP
src/paginas.mjs    corpo de cada página
build.mjs          gera as 19 páginas, o sitemap e o robots.txt
tools/check.mjs    verificação estática (roda no CI a cada push)
tools/og.html      fonte da imagem de compartilhamento (assets/img/og.png)
assets/            css, js, fontes (hospedadas aqui mesmo) e imagens
```

As páginas na raiz e em `areas/` e `orientacoes/` são geradas. Para editar
conteúdo, mude os arquivos em `src/` e gere de novo.

## Comandos

```
node build.mjs --preview    prévia: noindex, dados pendentes marcados "a confirmar"
node build.mjs              produção: indexável; recusa gerar com dado pendente
node tools/check.mjs        verificação estática
```

Não há `npm install`. Basta Node 20 ou superior.

## Dados a confirmar com a clínica

O build de prévia lista as pendências ao final. Hoje são:

- razão social e CNPJ;
- inscrição da clínica no CRM-SP e nome/CRM do diretor técnico (obrigatórios
  em publicidade médica, Resolução CFM 2.336/2023);
- nome, CRM, RQE e formação de cada profissional, com autorização individual
  (nenhum nome é publicado antes da conferência no CFM);
- sala ou andar do endereço de Marília (o número 113 tem mais de um ocupante);
- endereço, dias e áreas atendidas em Garça;
- convênios aceitos e formas de pagamento;
- disponibilidade de teleconsulta;
- e-mail institucional e encarregado de dados (LGPD);
- logotipo em vetor (o site usa uma marca provisória em SVG);
- domínio definitivo. Os endereços óbvios com "neoclinica" já pertencem a
  três empresas homônimas; a escolha precisa ser feita antes da publicação.

Cada item corresponde a um campo `null` em `src/dados.mjs`. Preenchido o
campo, a marcação some.

## Segurança e privacidade

O GitHub Pages não permite cabeçalhos HTTP próprios, então tudo o que dá para
fazer no documento está feito no documento:

- `Content-Security-Policy` em `<meta>` com `default-src 'none'`, sem
  `unsafe-inline`: nenhum estilo ou script inline, nenhum recurso de terceiros;
- fontes hospedadas no próprio site (nenhuma chamada ao Google Fonts);
- nenhum cookie, nenhum contador de audiência, nenhum `localStorage`;
- nenhum formulário envia dados: o compositor de agendamento só monta um link
  `wa.me` que o visitante abre por conta própria;
- `referrer no-referrer` e `rel="noopener noreferrer"` em todo link externo;
- nenhum mapa incorporado (o link abre o Google Maps em nova aba);
- o verificador falha se aparecer estilo inline, script externo, link sem
  HTTPS, termo vedado na publicidade médica ou qualquer dado do ambiente de
  trabalho (caminhos, usuário, máquina, e-mail pessoal);
- o workflow do CI roda só com `contents: read` e sem segredos;
- sem dependências de npm: nada a atualizar, nada a comprometer.

O que o Pages não cobre: `frame-ancestors` e `X-Frame-Options` (só valem em
cabeçalho HTTP). Ao migrar para um domínio próprio, configurar esses cabeçalhos
no provedor.

## Publicar em produção

1. Preencher os campos `null` em `src/dados.mjs` e trocar `CLINICA.origem`
   pelo domínio definitivo.
2. `node build.mjs` (sem `--preview`). O build recusa gerar enquanto houver
   pendência ou o domínio estiver marcado como a definir.
3. `node tools/check.mjs`.
4. Enviar os arquivos ao provedor (ou apontar o domínio para o Pages).
5. Cadastrar o endereço do site na ficha do Google, no Instagram e no Facebook.

**Atenção:** o site de prévia leva `noindex` em todas as páginas e
`Disallow: /` no `robots.txt`, para não concorrer em busca com o domínio da
clínica. Um site de produção gerado com `--preview` seria invisível.

## Conformidade

O conteúdo segue a Resolução CFM 2.336/2023 e o Código de Ética Médica: sem
promessa de resultado, sem preço, sem depoimento, sem nota de avaliação, sem
título de especialista antes da conferência do RQE. O verificador bloqueia os
termos mais comuns, mas não substitui a revisão da clínica.

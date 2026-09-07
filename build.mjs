/* =========================================================================
   Gerador do site da Neo Clínica.

   Lê os dados em src/dados.mjs e src/artigos.mjs, monta cada página com
   src/paginas.mjs e o chrome compartilhado de src/chrome.mjs, e grava HTML
   estático puro na raiz. O site publicado não depende deste script nem de
   nenhuma dependência externa para funcionar.

     node build.mjs              produção: indexável, recusa dado pendente
     node build.mjs --preview    prévia: noindex, marca dados "a confirmar"
   ========================================================================= */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AREAS } from './src/dados.mjs';
import { ARTIGOS } from './src/artigos.mjs';
import { contexto, shell } from './src/chrome.mjs';
import * as PG from './src/paginas.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const PREVIEW = process.argv.includes('--preview');
const ctx = contexto({ preview: PREVIEW });

if (!PREVIEW && /A-DEFINIR/.test(ctx.origem)) {
  console.error('Produção recusada: defina CLINICA.origem em src/dados.mjs (o domínio ainda está marcado como A DEFINIR).');
  process.exit(1);
}

const paginas = [
  PG.inicio(ctx),
  PG.areas(ctx),
  ...AREAS.map(a => PG.area(ctx, a)),
  PG.equipe(ctx),
  PG.unidades(ctx),
  PG.agendamento(ctx),
  PG.orientacoes(ctx),
  ...ARTIGOS.map(a => PG.orientacao(ctx, a)),
  PG.contato(ctx),
  PG.privacidade(ctx),
  PG.naoEncontrada(ctx)
];

for (const pg of paginas) {
  const html = shell({ p: pg.p, ctx, body: pg.body, ld: pg.ld });
  const destino = join(ROOT, pg.p.path);
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, html);
}

/* sitemap e robots: a prévia pede para não ser indexada. */
const publicas = paginas.filter(pg => pg.p.path !== '404.html');
const hoje = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicas.map(pg => `  <url><loc>${ctx.origem}/${pg.p.path === 'index.html' ? '' : pg.p.path}</loc><lastmod>${hoje}</lastmod></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(ROOT, 'sitemap.xml'), sitemap);
writeFileSync(join(ROOT, 'robots.txt'), PREVIEW
  ? 'User-agent: *\nDisallow: /\n'
  : `User-agent: *\nAllow: /\nSitemap: ${ctx.origem}/sitemap.xml\n`);

/* Relatório */
const unicas = [...new Set(ctx.pendencias)];
console.log(`${paginas.length} páginas geradas em modo ${PREVIEW ? 'prévia' : 'produção'} (${ctx.origem}).`);
if (unicas.length) {
  console.log(`${unicas.length} dado(s) a confirmar com a clínica:`);
  unicas.forEach(x => console.log('  • ' + x));
  if (!PREVIEW) {
    console.error('\nProdução recusada: preencha os campos em src/dados.mjs ou gere com --preview.');
    process.exitCode = 1;
  }
}

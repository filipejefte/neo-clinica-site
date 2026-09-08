/* =========================================================================
   Verificação estática do site gerado. Falha (código 1) se encontrar:
   - link interno para arquivo inexistente ou âncora inexistente;
   - JSON-LD inválido;
   - página sem lang, title, description, canonical, h1 único ou CSP;
   - qualquer coisa que a CSP proibiria: estilo inline, <style>, manipulador
     on*, javascript:, script ou folha de estilo de terceiros;
   - link externo em nova aba sem noopener noreferrer;
   - svg sem aria-hidden nem rótulo;
   - travessão ou meia-risca na copy (decisão editorial);
   - termos vedados ou arriscados na publicidade médica (Resolução CFM
     2.336/2023 e Código de Ética Médica);
   - identificação obrigatória (diretor técnico, CRM) ausente do rodapé;
   - vazamento de dados do ambiente de trabalho (caminhos, usuário, máquina,
     e-mail pessoal) em qualquer arquivo publicável.

   Uso:  node tools/check.mjs
   ========================================================================= */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SKIP = new Set(['src', 'tools', 'dist', 'node_modules', '.git', '.claude', 'interno']);
const PUBLICAVEIS = /\.(html|css|js|mjs|xml|txt|json|yml|yaml|md|svg|ps1|gitignore)$/;

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) { continue; }
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) { walk(p, acc); }
    else { acc.push(p); }
  }
  return acc;
}

const problems = [];
const note = (file, msg) => problems.push(`${relative(ROOT, file).replace(/\\/g, '/')}: ${msg}`);

const idsOf = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));

const arquivos = walk(ROOT);
const pages = arquivos.filter(f => f.endsWith('.html'));
const idCache = new Map();
const idsFor = (file) => {
  if (!idCache.has(file)) { idCache.set(file, idsOf(readFileSync(file, 'utf8'))); }
  return idCache.get(file);
};

/* --- vazamento de dados do ambiente: vale para todo arquivo publicável --- */
const vazamentos = [
  [/[A-Z]:\\/, 'caminho absoluto do Windows'],
  [/\\Users\\|\/Users\//, 'caminho de perfil de usuário'],
  [/AppData/i, 'caminho AppData'],
  [/Projetos/, 'nome da pasta de trabalho'],
  [/@gmail\.com|@hotmail\.com|@outlook\.com/i, 'e-mail pessoal'],
  [/scratchpad|tool-results/i, 'caminho de ferramenta']
];
/* Identificadores pessoais (nome da máquina, usuário, e-mail, nome do autor)
   ficam em interno/identificadores.txt, fora do repositório, uma expressão
   regular por linha. Assim o próprio verificador não os publica. */
const extra = join(ROOT, 'interno', 'identificadores.txt');
if (existsSync(extra)) {
  for (const linha of readFileSync(extra, 'utf8').split(/\r?\n/)) {
    const t = linha.trim();
    if (t && !t.startsWith('#')) { vazamentos.push([new RegExp(t, 'i'), 'identificador pessoal']); }
  }
}
for (const f of arquivos) {
  if (!PUBLICAVEIS.test(f) || /\.woff2$/.test(f)) { continue; }
  const txt = readFileSync(f, 'utf8');
  for (const [re, label] of vazamentos) {
    if (re.test(txt)) { note(f, `vazamento de dado do ambiente (${label})`); }
  }
}

let modoRobots = null;

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const own = idsOf(html);
  idCache.set(page, own);
  const e404 = page.endsWith('404.html');

  /* --- links e âncoras --- */
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(href)) { continue; }
    if (href.startsWith('#')) {
      if (href.length > 1 && !own.has(href.slice(1))) { note(page, `âncora interna inexistente: ${href}`); }
      continue;
    }
    const [file, hash] = href.split('#');
    const target = resolve(dirname(page), file);
    if (!existsSync(target)) { note(page, `link quebrado: ${href}`); continue; }
    if (hash && target.endsWith('.html') && !idsFor(target).has(hash)) { note(page, `âncora inexistente no destino: ${href}`); }
  }

  /* --- links externos em nova aba --- */
  for (const m of html.matchAll(/<a\s[^>]*>/g)) {
    const tag = m[0];
    if (/target="_blank"/.test(tag) && !/rel="noopener noreferrer"/.test(tag)) { note(page, `link em nova aba sem noopener noreferrer: ${tag.slice(0, 80)}`); }
    const href = tag.match(/href="([^"]+)"/);
    if (href && /^http:\/\//.test(href[1])) { note(page, `link sem HTTPS: ${href[1]}`); }
  }

  /* --- JSON-LD --- */
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (err) { note(page, `JSON-LD inválido: ${err.message}`); }
  }

  /* --- metadados obrigatórios --- */
  if (!/<html lang="pt-BR">/.test(html)) { note(page, 'atributo lang ausente ou diferente de pt-BR'); }
  if (!/<title>[^<]{10,}<\/title>/.test(html)) { note(page, 'title ausente ou curto demais'); }
  const desc = html.match(/<meta name="description" content="([^"]*)"/);
  if (!desc) { note(page, 'meta description ausente'); }
  else if (desc[1].length < 70 || desc[1].length > 320) { note(page, `meta description com ${desc[1].length} caracteres (ideal 70 a 320)`); }
  if (!/<link rel="canonical"/.test(html)) { note(page, 'canonical ausente'); }
  if (!/<meta property="og:image" content="https:\/\//.test(html)) { note(page, 'og:image ausente ou relativa'); }
  const robots = html.match(/<meta name="robots" content="([^"]+)"/);
  if (!robots) { note(page, 'meta robots ausente'); }
  else if (modoRobots === null) { modoRobots = robots[1]; }
  else if (robots[1] !== modoRobots) { note(page, `meta robots divergente das demais páginas (${robots[1]})`); }

  const h1 = [...html.matchAll(/<h1[\s>]/g)].length;
  if (h1 !== 1) { note(page, `${h1} elementos h1 (deve haver exatamente 1)`); }

  /* --- o que a CSP proibiria --- */
  if (!/<meta http-equiv="Content-Security-Policy" content="default-src 'none'/.test(html)) { note(page, 'CSP ausente ou permissiva'); }
  if (/\sstyle="/.test(html)) { note(page, 'atributo style inline (bloqueado pela CSP)'); }
  if (/<style[\s>]/.test(html)) { note(page, 'bloco <style> inline (bloqueado pela CSP)'); }
  if (/\son[a-z]+="/i.test(html)) { note(page, 'manipulador de evento inline (bloqueado pela CSP)'); }
  if (/javascript:/i.test(html)) { note(page, 'URL javascript:'); }
  for (const m of html.matchAll(/<script\s[^>]*src="([^"]+)"/g)) {
    if (/^(https?:)?\/\//.test(m[1])) { note(page, `script de terceiros: ${m[1]}`); }
  }
  for (const m of html.matchAll(/<link\s[^>]*href="([^"]+)"[^>]*>/g)) {
    if (/^(https?:)?\/\//.test(m[1]) && !/rel="canonical"/.test(m[0])) { note(page, `recurso externo no head: ${m[1]}`); }
  }
  if (/<iframe|<embed|<object/i.test(html)) { note(page, 'conteúdo incorporado de terceiros'); }

  /* --- identificação obrigatória em publicidade médica --- */
  if (!e404 && !/Diretor técnico:/.test(html)) { note(page, 'identificação do diretor técnico ausente no rodapé'); }
  if (!e404 && !/CRM-SP/.test(html)) { note(page, 'inscrição no CRM ausente no rodapé'); }
  if (!e404 && !/não substituem a consulta médica/.test(html)) { note(page, 'aviso de caráter educativo ausente'); }

  /* --- svg decorativo sem rótulo --- */
  for (const m of html.matchAll(/<svg\s([^>]*)>/g)) {
    const attrs = m[1];
    if (!/aria-hidden="true"/.test(attrs) && !/role="img"/.test(attrs) && !/aria-label=/.test(attrs)) { note(page, 'svg sem aria-hidden nem rótulo acessível'); }
  }

  /* --- vícios de escrita --- */
  const copy = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  const emDash = (copy.match(/—/g) || []).length;
  if (emDash) { note(page, `${emDash} travessão(ões) na copy; separe as frases`); }
  const enDash = (copy.match(/–/g) || []).length;
  if (enDash) { note(page, `${enDash} meia-risca(s) na copy; use "a" ou "até"`); }

  /* --- termos vedados ou arriscados na publicidade médica --- */
  const banned = [
    [/garant(imos|ia|ido)/i, 'promessa ou garantia de resultado'],
    [/100%/, 'percentual absoluto'],
    [/melhor\s+(cl[íi]nica|m[ée]dic|equipe|atendimento)/i, 'superlativo/comparativo'],
    [/n[ºo°]?\s*1\s+(em|de)\b|l[íi]der\s+em|refer[êe]ncia\s+em/i, 'autoatribuição de liderança'],
    [/\bcura(r|do|da)?\b|milagr/i, 'promessa de cura'],
    [/resolvem?\s+(a\s+maior\s+parte|todos|tudo|qualquer)/i, 'promessa de resolução'],
    [/\bforma\s+mais\s+(simples|segura|eficaz|r[áa]pida|f[áa]cil)/i, 'superlativo de método'],
    [/promo[çc][ãa]o|desconto|parcel|R\$\s?\d/i, 'preço, desconto ou condição de pagamento'],
    [/consulta\s+gr[áa]tis|consulta\s+gratuita|sem\s+custo/i, 'oferta de gratuidade'],
    [/antes\s+e\s+depois/i, 'imagem ou promessa antes e depois'],
    [/especialista/i, 'título de especialista (exige RQE conferido)'],
    [/depoimento|nossos\s+pacientes\s+dizem|avalia[çc][ãa]o\s+\d[.,]\d/i, 'depoimento ou nota de avaliação'],
    [/sem\s+dor|indolor/i, 'promessa de ausência de dor'],
    [/tecnologia\s+de\s+ponta|[úu]ltima\s+gera[çc][ãa]o|exclusiv/i, 'autopromoção de equipamento ou exclusividade']
  ];
  for (const [re, label] of banned) {
    if (re.test(copy)) { note(page, `possível violação da publicidade médica: ${label}`); }
  }
}

console.log(`${pages.length} páginas e ${arquivos.length} arquivos verificados.`);
if (problems.length) {
  console.log(`\n${problems.length} problema(s):`);
  problems.forEach(p => console.log('  • ' + p));
  process.exitCode = 1;
} else {
  console.log('Nenhum problema encontrado.');
}

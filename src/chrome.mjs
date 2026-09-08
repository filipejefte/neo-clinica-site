/* =========================================================================
   "Chrome" compartilhado: head, cabeçalho, gaveta, rodapé e utilitários de
   marcação. Nenhuma página escreve isso por conta própria; tudo passa por
   shell().

   Segurança do HTML gerado (o GitHub Pages não permite cabeçalhos HTTP
   próprios, então o que dá para fazer no documento é feito aqui):
   - Content-Security-Policy em <meta>, sem 'unsafe-inline': nenhum estilo
     nem script inline, nenhum recurso de terceiros (fontes hospedadas no
     próprio site);
   - referrer no-referrer, links externos com noopener noreferrer;
   - nenhum formulário envia dados a servidor: o único formulário monta um
     link de WhatsApp e abre em nova aba.
   ========================================================================= */

import { CLINICA, NAV, UNIDADES, AREAS } from './dados.mjs';

/* As duas cores do logotipo, amostradas do núcleo dos traços na arte oficial
   da clínica. Toda a paleta do site deriva delas (ver assets/css/site.css). */
export const MALVA = '#C997B8';
export const ROXO = '#64446E';

/* Escapa texto para atributo ou conteúdo HTML. */
export const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* Contexto de build: modo, origem absoluta das URLs e pendências. */
export function contexto({ preview }) {
  const origem = preview ? CLINICA.origemPrevia : CLINICA.origem;
  const pendencias = [];
  return {
    preview,
    origem,
    pendencias,
    /* Valor confirmado ou marcador "a confirmar". Em produção, registra a
       pendência para que o build recuse publicar com dado faltando. */
    pend(valor, rotulo) {
      if (valor !== null && valor !== undefined && valor !== '') { return esc(valor); }
      pendencias.push(rotulo);
      return preview
        ? `<span class="pend" title="Dado a confirmar com a clínica antes da publicação">${esc(rotulo)}</span>`
        : '';
    }
  };
}

/* Link de WhatsApp para o número oficial, com mensagem pré-preenchida. */
export const wa = (texto) =>
  `https://wa.me/${CLINICA.whatsapp}?text=${encodeURIComponent(texto)}`;

export const WA_PADRAO = 'Olá! Quero agendar uma consulta na Neo Clínica.';

/* Atributos padrão de link externo: nova aba, sem opener nem referrer. */
export const EXT = 'target="_blank" rel="noopener noreferrer"';

/* ---------- ícones (SVG inline, sem dependências) ------------------------ */
const svg = (inner, size = 20, vb = 24) =>
  `<svg class="i" width="${size}" height="${size}" viewBox="0 0 ${vb} ${vb}" fill="none" aria-hidden="true" focusable="false">${inner}</svg>`;

export const ICON = {
  arrow: svg('<path d="M4 12h16M13 5l7 7-7 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>', 18),
  external: svg('<path d="M10 5H5v14h14v-5M14 5h5v5M19 5l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>', 15),
  /* Glifo oficial do WhatsApp (traçado do Simple Icons, licença CC0). */
  whatsapp: svg('<path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>'),
  phone: svg('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>'),
  pin: svg('<path d="M12 22s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12Z" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="10" r="2.6" stroke="currentColor" stroke-width="1.6"/>'),
  clock: svg('<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v5l3.5 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'),
  instagram: svg('<rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/>'),
  check: svg('<path d="M5 12.5 9.5 17 19 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>', 18),
  alert: svg('<path d="M12 3 2.5 20h19L12 3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 9v5M12 16.5v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>', 18),
  shield: svg('<path d="M12 3 5 6v5c0 4.5 3 8.4 7 9.9 4-1.5 7-5.4 7-9.9V6l-7-3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="m9 12 2 2 4-4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'),
  doc: svg('<path d="M7 3h7l5 5v13H7V3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M14 3v5h5M10 12h6M10 16h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'),
  calendar: svg('<rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" stroke-width="1.6"/><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'),
  chat: svg('<path d="M4 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H10l-5 4v-4a3 3 0 0 1-1-2V6Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8 8h8M8 12h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'),
  menu: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false"><path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  close: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false"><path d="m5 5 12 12M17 5 5 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',

  /* Ícones das áreas de atendimento, desenhados para o site. */
  flor: svg('<path d="M6.5 5v5.5a5.5 5.5 0 0 0 11 0V5l-2.6 2.2L12 4.2 9.1 7.2 6.5 5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 16v6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 20.5c-2.6 0-4.6-1.5-5.2-3.8 2.6 0 4.6 1.5 5.2 3.8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>', 28),
  urso: svg('<circle cx="12" cy="13" r="7.5" stroke="currentColor" stroke-width="1.6"/><circle cx="6" cy="6.5" r="2.6" stroke="currentColor" stroke-width="1.6"/><circle cx="18" cy="6.5" r="2.6" stroke="currentColor" stroke-width="1.6"/><circle cx="9.6" cy="12" r=".9" fill="currentColor"/><circle cx="14.4" cy="12" r=".9" fill="currentColor"/><path d="M10.8 15.2c.7.8 1.7.8 2.4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>', 28),
  coracao: svg('<path d="M12 20.5s-8-4.9-8-11A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5c0 6.1-8 11-8 11Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M5 12.5h3.5l1.5-2.5 2 5 1.5-3.5h5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>', 28),
  mente: svg('<path d="M12 4c2.3 2.4 3.5 5 3.5 7.6 0 2.8-1.2 5.3-3.5 7.4-2.3-2.1-3.5-4.6-3.5-7.4C8.5 9 9.7 6.4 12 4Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M5.5 9.5c3 .5 5.2 2.8 5.9 6.2-3-.5-5.3-2.8-5.9-6.2ZM18.5 9.5c-3 .5-5.2 2.8-5.9 6.2 3-.5 5.3-2.8 5.9-6.2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M4 15.5c1.5 3 4.4 4.7 8 4.7s6.5-1.7 8-4.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>', 28)
};

/* Símbolo do logotipo, redesenhado em vetor a partir da arte oficial da
   clínica: as iniciais "n" e "c" com duas cabeças em anel e um alvo roxo
   dentro do "c". Os raios, larguras de traço e posições foram medidos pixel
   a pixel na arte original (711 px) e transpostos para este sistema de
   coordenadas; conferido por sobreposição por diferença.

   Coordenadas na arte original (711 px) → aqui: (x - 44, y - 235.5).
     cabeças   centro (115,5 · 263) e (194 · 263), raio médio 15,5, traço 16
     "n"       arco centro (98,75 · 342,5), raio médio 42,25, traço 18
     "c"       centro (194 · 352), raio médio 52,5, traço 18, abertura à direita
     alvo      centro (194 · 352), raio médio 18,25, traço 14,5

   O arquivo vetorial original, quando enviado pela clínica, substitui estes
   traçados (ver README). */
export const SIMBOLO_VIEWBOX = '3.5 4 208 175.5';

/* Traços em malva: as duas cabeças em anel, o "n" e o "c". */
const SIMBOLO_MALVA =
  '<circle cx="71.5" cy="27.5" r="15.5" stroke-width="16"/>' +
  '<circle cx="150" cy="27.5" r="15.5" stroke-width="16"/>' +
  '<path d="M12.5 170.5V107a42.25 42.25 0 0 1 84.5 0v63.5" stroke-width="18"/>' +
  '<path d="M200 100.5a52.5 52.5 0 1 0 0 32" stroke-width="18"/>';
/* O alvo, em roxo, concêntrico ao "c". */
const SIMBOLO_ROXO = '<circle cx="150" cy="116.5" r="18.25" stroke-width="14.5"/>';

export const SIMBOLO = (cls = 'brand__symbol') =>
  `<svg class="${cls}" viewBox="${SIMBOLO_VIEWBOX}" fill="none" aria-hidden="true" focusable="false">` +
  `<g class="sym" stroke-linecap="round">${SIMBOLO_MALVA}</g>` +
  `<g class="sym-alvo">${SIMBOLO_ROXO}</g>` +
  '</svg>';

/* Lockup do logotipo: símbolo, "Neo" em roxo sobre "Clínica" em malva, e o
   slogan sob um fio, como no original. */
export const LOGO = (cls = 'brand') =>
  `${SIMBOLO(cls + '__symbol')}` +
  `<span class="${cls}__text">` +
  `<span class="${cls}__neo">Neo</span>` +
  `<span class="${cls}__clinica">Clínica</span>` +
  `<span class="${cls}__tag">${esc(CLINICA.slogan)}</span>` +
  '</span>';

/* Favicon SVG embutido (data URI): o símbolo sobre creme. */
const FAVICON = "data:image/svg+xml," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 232 232">' +
  '<rect width="232" height="232" rx="48" fill="#FBF6F2"/>' +
  '<g transform="translate(8.5 24)" fill="none">' +
  `<g stroke="${MALVA}" stroke-linecap="round">${SIMBOLO_MALVA}</g>` +
  `<g stroke="${ROXO}">${SIMBOLO_ROXO}</g>` +
  '</g></svg>');

/* Política de segurança de conteúdo do documento. Sem 'unsafe-inline' em
   nenhuma diretiva; o único destino de formulário é o WhatsApp. */
const CSP = [
  "default-src 'none'",
  "base-uri 'none'",
  "form-action https://wa.me",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'none'",
  "object-src 'none'",
  "frame-src 'none'",
  "manifest-src 'self'",
  'upgrade-insecure-requests'
].join('; ');

/* ---------- blocos reutilizáveis ----------------------------------------- */

/* Botão de WhatsApp com mensagem pré-preenchida. */
export const btnWa = (texto = 'Agendar pelo WhatsApp', msg = WA_PADRAO, cls = 'btn btn--primary') =>
  `<a class="${cls}" href="${wa(msg)}" ${EXT}>${ICON.whatsapp}<span>${esc(texto)}</span></a>`;

/* Endereço de uma unidade em uma linha, com pendências marcadas. */
export function enderecoLinha(u, ctx) {
  if (!u.logradouro) { return ctx.pend(null, `Endereço da unidade ${u.nome} a confirmar`); }
  const partes = [esc(u.logradouro)];
  partes.push(ctx.pend(u.complemento, 'sala/andar a confirmar'));
  if (u.bairro) { partes.push(esc(u.bairro)); }
  partes.push(`${esc(u.cidade)}/${esc(u.uf)}`);
  if (u.cep) { partes.push(`CEP ${esc(u.cep)}`); }
  return partes.filter(Boolean).join(', ');
}

/* Horário de uma unidade como lista. */
export function horarioLista(u, ctx) {
  if (!u.horario) {
    return `<p class="muted">${ctx.pend(null, `Horário de atendimento em ${u.nome} a confirmar`)}</p>`;
  }
  return `<ul class="hours">${u.horario.map(h =>
    `<li><span>${esc(h.dias)}</span><strong>${esc(h.horas)}</strong></li>`).join('')}</ul>`;
}

/* Dados estruturados da clínica (schema.org), só com o que está confirmado. */
export function ldClinica(ctx) {
  const sede = UNIDADES.find(u => u.principal);
  const obj = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${ctx.origem}/#clinica`,
    name: CLINICA.nome,
    alternateName: CLINICA.nomeCompleto,
    slogan: CLINICA.slogan,
    url: `${ctx.origem}/`,
    telephone: CLINICA.telefoneHref,
    image: `${ctx.origem}/assets/img/og.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: sede.logradouro,
      addressLocality: sede.cidade,
      addressRegion: sede.uf,
      postalCode: sede.cep,
      addressCountry: 'BR'
    },
    areaServed: UNIDADES.map(u => ({ '@type': 'City', name: u.cidade })),
    openingHoursSpecification: sede.horario.map(h => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.semana,
      opens: h.abre,
      closes: h.fecha
    })),
    medicalSpecialty: AREAS.map(a => a.nome),
    sameAs: [CLINICA.instagram],
    contactPoint: [{
      '@type': 'ContactPoint',
      telephone: '+' + CLINICA.whatsapp,
      contactType: 'appointments',
      availableLanguage: 'Portuguese'
    }]
  };
  if (CLINICA.razaoSocial) { obj.legalName = CLINICA.razaoSocial; }
  if (CLINICA.cnpj) { obj.taxID = CLINICA.cnpj; }
  if (CLINICA.email) { obj.email = CLINICA.email; }
  return obj;
}

/* ---------- casca da página ---------------------------------------------- */

/* p: { path, titulo, descricao, secao, tituloOg? }
   ctx: contexto(); body: HTML do <main>; ld: objetos JSON-LD extras. */
export function shell({ p, ctx, body, ld = [] }) {
  const rel = p.path.includes('/') ? '../' : '';
  const urlPagina = `${ctx.origem}/${p.path === 'index.html' ? '' : p.path}`;
  const tituloCompleto = p.path === 'index.html'
    ? `${CLINICA.nome} | Centro de saúde e especialidades em Marília e Garça`
    : `${p.titulo} | ${CLINICA.nome}`;
  const robots = ctx.preview ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large';
  const jsonld = [ldClinica(ctx), ...ld]
    .map(o => `<script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n</script>`)
    .join('\n');

  const navLinks = NAV.map(n => {
    const atual = n.href.replace('.html', '') === p.secao ? ' aria-current="page"' : '';
    return `<a class="nav__link" href="${rel}${n.href}"${atual}>${esc(n.rotulo)}</a>`;
  }).join('');
  const drawerLinks = NAV.map(n => {
    const atual = n.href.replace('.html', '') === p.secao ? ' aria-current="page"' : '';
    return `<a class="drawer__link" href="${rel}${n.href}"${atual}>${esc(n.rotulo)}</a>`;
  }).join('');

  const sede = UNIDADES.find(u => u.principal);
  const garca = UNIDADES.find(u => !u.principal);

  const ribbon = ctx.preview
    ? `<div class="ribbon" role="note"><div class="shell">${ICON.alert}<p><strong>Prévia de apresentação.</strong> Protótipo do novo site para apreciação da clínica. Os itens <span class="pend pend--demo">a confirmar</span> serão preenchidos antes da publicação.</p></div></div>`
    : '';

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<meta name="referrer" content="no-referrer">
<meta name="color-scheme" content="light">
<title>${esc(tituloCompleto)}</title>
<meta name="description" content="${esc(p.descricao)}">
<link rel="canonical" href="${urlPagina}">
<meta name="robots" content="${robots}">
<meta name="theme-color" content="#4B2F58">
<meta name="geo.region" content="BR-SP">
<meta name="geo.placename" content="Marília">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${esc(CLINICA.nome)}">
<meta property="og:title" content="${esc(p.tituloOg || tituloCompleto)}">
<meta property="og:description" content="${esc(p.descricao)}">
<meta property="og:url" content="${urlPagina}">
<meta property="og:image" content="${ctx.origem}/assets/img/og.png">
<meta property="og:image:secure_url" content="${ctx.origem}/assets/img/og.png">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(CLINICA.nome)}, ${esc(CLINICA.slogan)}. Centro de saúde e especialidades em Marília e Garça.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.tituloOg || tituloCompleto)}">
<meta name="twitter:description" content="${esc(p.descricao)}">
<meta name="twitter:image" content="${ctx.origem}/assets/img/og.png">
<link rel="icon" href="${FAVICON}">
<link rel="apple-touch-icon" href="${rel}assets/img/icone-512.png">
<link rel="preload" href="${rel}assets/fonts/literata.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${rel}assets/fonts/figtree.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${rel}assets/fonts/quicksand-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${rel}assets/css/site.css">
<script src="${rel}assets/js/site.js" defer></script>
${jsonld}
</head>
<body class="page page--${esc(p.secao)}">
<a class="skip" href="#conteudo">Ir para o conteúdo</a>
${ribbon}
<header class="site-head">
  <div class="shell site-head__row">
    <a class="brand" href="${rel}index.html" aria-label="${esc(CLINICA.nome)}, página inicial">
      ${LOGO()}
    </a>
    <nav class="nav" aria-label="Principal">${navLinks}</nav>
    <div class="site-head__cta">
      ${btnWa('Agendar', WA_PADRAO, 'btn btn--primary btn--sm')}
      <button class="burger" type="button" aria-expanded="false" aria-controls="gaveta" aria-label="Abrir menu">${ICON.menu}${ICON.close}</button>
    </div>
  </div>
  <div class="drawer" id="gaveta" hidden>
    <nav class="drawer__nav" aria-label="Menu">${drawerLinks}</nav>
    <div class="drawer__foot">
      ${btnWa('Agendar pelo WhatsApp')}
      <a class="btn btn--ghost" href="tel:${CLINICA.telefoneHref}">${ICON.phone}<span>${esc(CLINICA.telefone)}</span></a>
    </div>
  </div>
</header>

<main id="conteudo" tabindex="-1">
${body}
</main>

<footer class="site-foot">
  <div class="shell">
    <div class="foot__grid">
      <div class="foot__brand">
        <a class="brand brand--foot" href="${rel}index.html" aria-label="${esc(CLINICA.nome)}, página inicial">
          ${LOGO()}
        </a>
        <p>Centro de saúde e especialidades. Atendimento em Marília e Garça, com agendamento pelo WhatsApp.</p>
        <p class="foot__social"><a href="${CLINICA.instagram}" ${EXT}>${ICON.instagram}<span>${esc(CLINICA.instagramUsuario)}</span></a></p>
      </div>
      <div class="foot__col">
        <h2 class="foot__title">Unidade Marília</h2>
        <p>${enderecoLinha(sede, ctx)}</p>
        ${horarioLista(sede, ctx)}
      </div>
      <div class="foot__col">
        <h2 class="foot__title">Unidade Garça</h2>
        <p>${enderecoLinha(garca, ctx)}</p>
        ${horarioLista(garca, ctx)}
      </div>
      <div class="foot__col">
        <h2 class="foot__title">Contato</h2>
        <ul class="foot__list">
          <li><a href="${wa(WA_PADRAO)}" ${EXT}>${ICON.whatsapp}<span>WhatsApp ${esc(CLINICA.whatsappFormatado)}</span></a></li>
          <li><a href="tel:${CLINICA.telefoneHref}">${ICON.phone}<span>${esc(CLINICA.telefone)}</span></a></li>
          <li><a href="${rel}agendamento.html">${ICON.calendar}<span>Como agendar</span></a></li>
          <li><a href="${rel}privacidade.html">${ICON.shield}<span>Privacidade</span></a></li>
        </ul>
      </div>
      <div class="foot__col">
        <h2 class="foot__title">Navegação</h2>
        <ul class="foot__list foot__list--nav">
          ${NAV.map(n => `<li><a href="${rel}${n.href}">${esc(n.rotulo)}</a></li>`).join('\n          ')}
        </ul>
      </div>
    </div>
    <div class="foot__legal">
      <p>${ctx.pend(CLINICA.razaoSocial, 'Razão social a confirmar')}</p>
      <p>CNPJ ${ctx.pend(CLINICA.cnpj, 'a confirmar')}</p>
      <p>Inscrição da clínica no CRM-SP ${ctx.pend(CLINICA.registroCRM, 'a confirmar')}</p>
      <p>Diretor técnico: ${ctx.pend(CLINICA.diretorTecnico, 'nome e CRM a confirmar')}</p>
      <p>As informações deste site têm caráter educativo e não substituem a consulta médica. Em caso de urgência, ligue 192 (SAMU).</p>
      <p>© ${new Date().getFullYear()} ${esc(CLINICA.nome)}. Todos os direitos reservados.</p>
    </div>
  </div>
</footer>

<div class="mobile-bar" aria-label="Contato rápido">
  ${btnWa('Agendar pelo WhatsApp', WA_PADRAO, 'btn btn--primary btn--block')}
</div>
</body>
</html>
`;
}

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
  whatsapp: svg('<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.2 15.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-3.2 4.3c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.2 5 4.4 2.5 1 3 .8 3.5.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.5-.9-.8-1.5-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.5-.4-.5-.6-.5h-.7Z" fill="currentColor"/>'),
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
  flor: svg('<path d="M12 21c0-4 0-7 0-9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 12c-3.5 0-6-2.5-6-6 3.5 0 6 2.5 6 6Zm0 0c3.5 0 6-2.5 6-6-3.5 0-6 2.5-6 6Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 12c-2.2 3-5.6 4.2-8 3.5 1-3 3.4-4.7 8-3.5Zm0 0c2.2 3 5.6 4.2 8 3.5-1-3-3.4-4.7-8-3.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>', 28),
  urso: svg('<circle cx="12" cy="13" r="7.5" stroke="currentColor" stroke-width="1.6"/><circle cx="6" cy="6.5" r="2.6" stroke="currentColor" stroke-width="1.6"/><circle cx="18" cy="6.5" r="2.6" stroke="currentColor" stroke-width="1.6"/><circle cx="9.6" cy="12" r=".9" fill="currentColor"/><circle cx="14.4" cy="12" r=".9" fill="currentColor"/><path d="M10.8 15.2c.7.8 1.7.8 2.4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>', 28),
  coracao: svg('<path d="M12 20.5s-8-4.9-8-11A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5c0 6.1-8 11-8 11Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M5 12.5h3.5l1.5-2.5 2 5 1.5-3.5h5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>', 28),
  mente: svg('<path d="M9.5 21v-3.2A7.5 7.5 0 1 1 18 11.8l1.6 2.7H18v2.5a2 2 0 0 1-2 2h-1.5V21" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M11.5 14.5c0-2.2 1.5-3 1.5-4.5a2 2 0 1 0-4 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>', 28)
};

/* Marca: dois círculos que se sobrepõem, o abraço que o slogan "Amor & Saúde"
   sugere. Substituir pelo logotipo vetorial da clínica quando ele for
   fornecido (ver README). */
export const MARCA = (cls = 'brand__mark') =>
  `<svg class="${cls}" viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">` +
  '<circle cx="15" cy="20" r="11" class="mark-a"/>' +
  '<circle cx="25" cy="20" r="11" class="mark-b"/>' +
  '<path d="M20 11.5a11 11 0 0 1 0 17 11 11 0 0 1 0-17Z" class="mark-c"/>' +
  '</svg>';

/* Favicon SVG embutido (data URI), sem arquivo externo. */
const FAVICON = "data:image/svg+xml," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">' +
  '<rect width="40" height="40" rx="9" fill="#FBF6F1"/>' +
  '<circle cx="15" cy="20" r="11" fill="#B5789D"/>' +
  '<circle cx="25" cy="20" r="11" fill="#3B2140" fill-opacity=".92"/>' +
  '<path d="M20 11.5a11 11 0 0 1 0 17 11 11 0 0 1 0-17Z" fill="#F3D9E6"/>' +
  '</svg>');

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
    ? `<div class="ribbon" role="note"><div class="shell">${ICON.alert}<p><strong>Prévia de apresentação.</strong> Este endereço é um protótipo do novo site para apreciação da clínica. Itens marcados como <span class="pend pend--demo">a confirmar</span> serão preenchidos com as informações oficiais antes da publicação.</p></div></div>`
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
<meta name="theme-color" content="#3B2140">
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
<link rel="preload" href="${rel}assets/fonts/fraunces.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${rel}assets/fonts/figtree.woff2" as="font" type="font/woff2" crossorigin>
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
      ${MARCA()}
      <span class="brand__text"><span class="brand__name">Neo Clínica</span><span class="brand__tag">${esc(CLINICA.slogan)}</span></span>
    </a>
    <nav class="nav" aria-label="Principal">${navLinks}</nav>
    <div class="site-head__cta">
      ${btnWa('Agendar', WA_PADRAO, 'btn btn--primary btn--sm')}
      <button class="burger" type="button" aria-expanded="false" aria-controls="gaveta" aria-label="Abrir menu">${ICON.menu}${ICON.close}</button>
    </div>
  </div>
</header>
<div class="drawer" id="gaveta" hidden>
  <nav class="drawer__nav" aria-label="Menu">${drawerLinks}</nav>
  <div class="drawer__foot">
    ${btnWa('Agendar pelo WhatsApp')}
    <a class="btn btn--ghost" href="tel:${CLINICA.telefoneHref}">${ICON.phone}<span>${esc(CLINICA.telefone)}</span></a>
  </div>
</div>

<main id="conteudo" tabindex="-1">
${body}
</main>

<footer class="site-foot">
  <div class="shell">
    <div class="foot__grid">
      <div class="foot__brand">
        <a class="brand brand--foot" href="${rel}index.html" aria-label="${esc(CLINICA.nome)}, página inicial">
          ${MARCA()}
          <span class="brand__text"><span class="brand__name">Neo Clínica</span><span class="brand__tag">${esc(CLINICA.slogan)}</span></span>
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
    </div>
    <div class="foot__legal">
      <p>${ctx.pend(CLINICA.razaoSocial, 'Razão social a confirmar')} · CNPJ ${ctx.pend(CLINICA.cnpj, 'a confirmar')} · Inscrição da clínica no CRM-SP ${ctx.pend(CLINICA.registroCRM, 'a confirmar')}</p>
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

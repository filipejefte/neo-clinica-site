/* =========================================================================
   Corpo de cada página. Cada função devolve { p, body, ld }:
   - p: metadados (path, titulo, descricao, secao);
   - body: HTML do <main>;
   - ld: objetos JSON-LD específicos da página (o da clínica entra sempre).
   ========================================================================= */

import { CLINICA, AREAS, EQUIPE, UNIDADES, FAQ, PASSOS } from './dados.mjs';
import { ARTIGOS } from './artigos.mjs';
import { esc, wa, WA_PADRAO, EXT, ICON, btnWa, enderecoLinha, horarioLista } from './chrome.mjs';

const sede = UNIDADES.find(u => u.principal);
const garca = UNIDADES.find(u => !u.principal);
const areaPor = (slug) => AREAS.find(a => a.slug === slug);

const dataLonga = (iso) => {
  const [a, m, d] = iso.split('-').map(Number);
  const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  return `${d} de ${meses[m - 1]} de ${a}`;
};

/* ---------- blocos --------------------------------------------------------- */

const crumbs = (rel, itens) =>
  `<nav class="crumbs" aria-label="Você está em"><ol>` +
  `<li><a href="${rel}index.html">Início</a></li>` +
  itens.map(([rotulo, href]) => href
    ? `<li><a href="${rel}${href}">${esc(rotulo)}</a></li>`
    : `<li aria-current="page">${esc(rotulo)}</li>`).join('') +
  `</ol></nav>`;

const ldCrumbs = (ctx, itens) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [['Início', 'index.html'], ...itens].map(([nome, href], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: nome,
    item: `${ctx.origem}/${href === 'index.html' ? '' : href}`
  }))
});

const areaCard = (a, rel) => `
<article class="card card--area">
  <span class="card__icon">${ICON[a.icone]}</span>
  <p class="eyebrow">${esc(a.curto)}</p>
  <h3 class="card__title"><a href="${rel}areas/${a.slug}.html">${esc(a.nome)}</a></h3>
  <p>${esc(a.resumo)}</p>
  <span class="card__more">Saiba mais ${ICON.arrow}</span>
</article>`;

const artigoCard = (art, rel) => {
  const a = areaPor(art.area);
  return `
<article class="card card--post">
  <p class="eyebrow">${esc(a.nome)}</p>
  <h3 class="card__title"><a href="${rel}orientacoes/${art.slug}.html">${esc(art.titulo)}</a></h3>
  <p>${esc(art.resumo)}</p>
  <p class="card__meta"><time datetime="${art.data}">${dataLonga(art.data)}</time> · ${art.leitura} min de leitura</p>
</article>`;
};

const faqList = (itens, ctx) => `
<div class="faq">${itens.map(f => `
  <details class="faq__item">
    <summary>${esc(f.q)}</summary>
    <div class="faq__body"><p>${f.a ? esc(f.a) : ctx.pend(null, f.pend)}</p></div>
  </details>`).join('')}
</div>`;

const ctaBand = (rel, titulo = 'Fale com a equipe', texto = 'Tire dúvidas sobre áreas, convênios e horários. A equipe responde pelo WhatsApp nos dias e horários de atendimento.') => `
<section class="band">
  <div class="shell band__grid">
    <div>
      <h2 class="band__title">${esc(titulo)}</h2>
      <p class="band__text">${esc(texto)}</p>
    </div>
    <div class="band__actions">
      ${btnWa('Agendar pelo WhatsApp', WA_PADRAO, 'btn btn--light')}
      <a class="btn btn--outline" href="tel:${CLINICA.telefoneHref}">${ICON.phone}<span>${esc(CLINICA.telefone)}</span></a>
      <a class="band__link" href="${rel}agendamento.html">Ver como funciona o agendamento ${ICON.arrow}</a>
    </div>
  </div>
</section>`;

const unidadeCard = (u, ctx, rel, escuro) => `
<article class="unit ${escuro ? 'unit--dark' : 'unit--soft'}">
  <p class="eyebrow">${u.principal ? 'Sede' : 'Atendimento também em'}</p>
  <h3 class="unit__title">${esc(u.nome)}</h3>
  <p class="unit__addr">${ICON.pin}<span>${enderecoLinha(u, ctx)}</span></p>
  <div class="unit__hours">${ICON.clock}${horarioLista(u, ctx)}</div>
  <div class="unit__actions">
    ${u.mapa ? `<a class="btn ${escuro ? 'btn--outline' : 'btn--ghost'} btn--sm" href="${u.mapa}" ${EXT}>Abrir no mapa ${ICON.external}</a>` : ''}
    <a class="unit__link" href="${rel}unidades.html">Detalhes da unidade ${ICON.arrow}</a>
  </div>
</article>`;

/* Maquete de conversa usada como ilustração do hero: nenhum dado real. */
const chatMock = () => `
<div class="chatmock" aria-hidden="true">
  <div class="chatmock__head"><span class="chatmock__dot"></span><span>Neo Clínica</span><small>WhatsApp</small></div>
  <div class="chatmock__body">
    <p class="bubble bubble--out">Olá! Quero agendar uma consulta em pediatria, em Marília.</p>
    <p class="bubble bubble--in">Oi! Temos horários na quarta às 10h e na quinta às 15h30. Qual prefere?</p>
    <p class="bubble bubble--out">Quarta às 10h.</p>
    <p class="bubble bubble--in">Confirmado. Traga a caderneta da criança e o cartão de vacinas. Até lá!</p>
  </div>
</div>`;

/* ---------- páginas --------------------------------------------------------- */

export function inicio(ctx) {
  const rel = '';
  const p = {
    path: 'index.html',
    secao: 'inicio',
    titulo: 'Início',
    tituloOg: `${CLINICA.nome} | ${CLINICA.slogan}`,
    descricao: 'Neo Clínica, centro de saúde e especialidades em Marília e Garça. Ginecologia e obstetrícia, pediatria e neonatologia, clínica médica e geriatria e saúde mental. Agende pelo WhatsApp.'
  };
  const body = `
<section class="hero">
  <div class="shell hero__grid">
    <div class="hero__copy">
      <p class="eyebrow eyebrow--rose">Centro de saúde e especialidades · Marília e Garça</p>
      <h1 class="hero__title">Cuidado médico para cada fase da vida, <em>perto de casa.</em></h1>
      <p class="lead">Ginecologia e obstetrícia, pediatria e neonatologia, clínica médica e geriatria e saúde mental, em consultas com tempo para ouvir e explicar. No centro de Marília e agora também em Garça.</p>
      <div class="hero__actions">
        ${btnWa('Agendar pelo WhatsApp')}
        <a class="btn btn--ghost" href="${rel}areas.html">Ver áreas de atendimento</a>
      </div>
      <ul class="facts">
        <li>${ICON.pin}<span>${esc(sede.logradouro)}, ${esc(sede.bairro)}, ${esc(sede.cidade)}</span></li>
        <li>${ICON.clock}<span>${esc(sede.horario[0].dias)}, ${esc(sede.horario[0].horas)}</span></li>
        <li>${ICON.chat}<span>Agendamento pelo WhatsApp ${esc(CLINICA.whatsappFormatado)}</span></li>
      </ul>
    </div>
    <div class="hero__art">
      <div class="orb orb--a"></div>
      <div class="orb orb--b"></div>
      ${chatMock()}
    </div>
  </div>
</section>

<section class="section" id="areas">
  <div class="shell">
    <div class="section__head">
      <p class="eyebrow">Áreas de atendimento</p>
      <h2 class="section__title">Da gestação à maturidade, na mesma clínica</h2>
      <p class="section__intro">Quatro áreas que se complementam. A mesma família pode acompanhar a gravidez, a primeira consulta do bebê, a pressão dos avós e a saúde mental de quem cuida de todos.</p>
    </div>
    <div class="grid grid--4">${AREAS.map(a => areaCard(a, rel)).join('')}</div>
  </div>
</section>

<section class="section section--soft" id="como-agendar">
  <div class="shell">
    <div class="section__head">
      <p class="eyebrow">Como agendar</p>
      <h2 class="section__title">Marcar consulta leva menos de um minuto</h2>
      <p class="section__intro">Sem cadastro, sem aplicativo. Uma mensagem no WhatsApp e a equipe cuida do resto.</p>
    </div>
    <ol class="steps">${PASSOS.map((s, i) => `
      <li class="step">
        <span class="step__num">${i + 1}</span>
        <h3 class="step__title">${esc(s.titulo)}</h3>
        <p>${esc(s.texto)}</p>
      </li>`).join('')}
    </ol>
    <div class="section__actions">
      ${btnWa('Começar pelo WhatsApp')}
      <a class="btn btn--ghost" href="${rel}agendamento.html">Montar a mensagem de agendamento</a>
    </div>
  </div>
</section>

<section class="section" id="unidades">
  <div class="shell">
    <div class="section__head">
      <p class="eyebrow">Unidades</p>
      <h2 class="section__title">Duas cidades, o mesmo jeito de atender</h2>
      <p class="section__intro">A sede fica no centro de Marília, de fácil acesso. Em Garça, o atendimento tem agenda própria.</p>
    </div>
    <div class="grid grid--2">
      ${unidadeCard(sede, ctx, rel, true)}
      ${unidadeCard(garca, ctx, rel, false)}
    </div>
  </div>
</section>

<section class="section section--soft" id="orientacoes">
  <div class="shell">
    <div class="section__head section__head--row">
      <div>
        <p class="eyebrow">Orientações</p>
        <h2 class="section__title">Respostas para as dúvidas que mais aparecem no consultório</h2>
      </div>
      <a class="btn btn--ghost" href="${rel}orientacoes.html">Todas as orientações ${ICON.arrow}</a>
    </div>
    <div class="grid grid--3">${ARTIGOS.slice(0, 3).map(a => artigoCard(a, rel)).join('')}</div>
  </div>
</section>

<section class="section" id="perguntas">
  <div class="shell shell--narrow">
    <div class="section__head">
      <p class="eyebrow">Perguntas frequentes</p>
      <h2 class="section__title">Antes de marcar</h2>
    </div>
    ${faqList(FAQ, ctx)}
  </div>
</section>

${ctaBand(rel)}`;
  return { p, body, ld: [] };
}

export function areas(ctx) {
  const rel = '';
  const p = {
    path: 'areas.html',
    secao: 'areas',
    titulo: 'Áreas de atendimento',
    descricao: 'As áreas de atendimento da Neo Clínica em Marília e Garça: ginecologia e obstetrícia, pediatria e neonatologia, clínica médica e geriatria e saúde mental.'
  };
  const body = `
<section class="page-head">
  <div class="shell">
    ${crumbs(rel, [['Áreas de atendimento']])}
    <p class="eyebrow eyebrow--rose">Áreas de atendimento</p>
    <h1 class="page-head__title">Quatro áreas, uma clínica para a família inteira</h1>
    <p class="lead">Cada área tem uma página com o que é atendido, o que levar na primeira consulta e as perguntas mais comuns. Se não souber por onde começar, mande uma mensagem e a equipe orienta.</p>
  </div>
</section>
<section class="section section--tight">
  <div class="shell">
    <div class="grid grid--2">${AREAS.map(a => `
      <article class="card card--area card--wide">
        <span class="card__icon">${ICON[a.icone]}</span>
        <p class="eyebrow">${esc(a.curto)}</p>
        <h2 class="card__title"><a href="${rel}areas/${a.slug}.html">${esc(a.nome)}</a></h2>
        <p>${esc(a.para)}</p>
        <ul class="ticks">${a.itens.slice(0, 4).map(i => `<li>${ICON.check}<span>${esc(i)}</span></li>`).join('')}</ul>
        <span class="card__more">Ver a página da área ${ICON.arrow}</span>
      </article>`).join('')}
    </div>
  </div>
</section>
${ctaBand(rel, 'Não sabe qual área procurar?', 'Descreva o que sente ou o que precisa. A equipe indica a área certa e os horários disponíveis.')}`;
  return { p, body, ld: [ldCrumbs(ctx, [['Áreas de atendimento', 'areas.html']])] };
}

export function area(ctx, a) {
  const rel = '../';
  const p = {
    path: `areas/${a.slug}.html`,
    secao: 'areas',
    titulo: a.nome,
    descricao: `${a.nome} na Neo Clínica, em Marília e Garça. ${a.resumo} Agende pelo WhatsApp.`
  };
  const relacionados = ARTIGOS.filter(x => x.area === a.slug).slice(0, 3);
  const outras = AREAS.filter(x => x.slug !== a.slug);
  const msg = `Olá! Quero agendar uma consulta em ${a.nome} na Neo Clínica.`;
  const body = `
<section class="page-head page-head--area">
  <div class="shell page-head__grid">
    <div>
      ${crumbs(rel, [['Áreas de atendimento', 'areas.html'], [a.nome]])}
      <p class="eyebrow eyebrow--rose">${esc(a.curto)}</p>
      <h1 class="page-head__title">${esc(a.nome)}</h1>
      <p class="lead">${esc(a.para)}</p>
      <div class="hero__actions">
        ${btnWa(`Agendar em ${a.nome.split(' e ')[0]}`, msg)}
        <a class="btn btn--ghost" href="${rel}agendamento.html">Como funciona o agendamento</a>
      </div>
    </div>
    <div class="page-head__art"><span class="card__icon card__icon--xl">${ICON[a.icone]}</span></div>
  </div>
</section>

<section class="section section--tight">
  <div class="shell split">
    <div class="split__main">
      <h2 class="h2">O que é atendido</h2>
      <ul class="ticks ticks--lg">${a.itens.map(i => `<li>${ICON.check}<span>${esc(i)}</span></li>`).join('')}</ul>

      <h2 class="h2">Perguntas comuns</h2>
      ${faqList(a.perguntas, ctx)}
    </div>
    <aside class="split__aside">
      <div class="note">
        <p class="eyebrow">Primeira consulta</p>
        <h3 class="note__title">O que levar</h3>
        <p>${esc(a.primeiraConsulta)}</p>
      </div>
      <div class="note note--soft">
        <p class="eyebrow">Onde</p>
        <p>${ICON.pin}<span>${esc(sede.nome)}: ${enderecoLinha(sede, ctx)}</span></p>
        <p>${ICON.pin}<span>${esc(garca.nome)}: ${ctx.pend(null, 'áreas atendidas em Garça a confirmar')}</span></p>
        <p>${ICON.clock}<span>${esc(sede.horario[0].dias)}, ${esc(sede.horario[0].horas)}</span></p>
      </div>
    </aside>
  </div>
</section>

${relacionados.length ? `
<section class="section section--soft">
  <div class="shell">
    <div class="section__head section__head--row">
      <div>
        <p class="eyebrow">Orientações</p>
        <h2 class="section__title">Orientações em ${esc(a.nome)}</h2>
      </div>
      <a class="btn btn--ghost" href="${rel}orientacoes.html">Todas as orientações ${ICON.arrow}</a>
    </div>
    <div class="grid grid--3">${relacionados.map(x => artigoCard(x, rel)).join('')}</div>
  </div>
</section>` : ''}

<section class="section">
  <div class="shell">
    <p class="eyebrow">Outras áreas</p>
    <div class="grid grid--3">${outras.map(x => areaCard(x, rel)).join('')}</div>
  </div>
</section>
${ctaBand(rel)}`;
  const ld = [
    ldCrumbs(ctx, [['Áreas de atendimento', 'areas.html'], [a.nome, p.path]]),
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: `${a.nome} | ${CLINICA.nome}`,
      url: `${ctx.origem}/${p.path}`,
      description: p.descricao,
      inLanguage: 'pt-BR',
      about: { '@id': `${ctx.origem}/#clinica` },
      medicalAudience: { '@type': 'MedicalAudience', audienceType: 'Patient' }
    }
  ];
  return { p, body, ld };
}

export function equipe(ctx) {
  const rel = '';
  const p = {
    path: 'equipe.html',
    secao: 'equipe',
    titulo: 'Equipe',
    descricao: 'A equipe médica da Neo Clínica, em Marília e Garça: ginecologia e obstetrícia, pediatria e neonatologia, clínica médica e geriatria e saúde mental, com identificação de CRM e RQE.'
  };
  const body = `
<section class="page-head">
  <div class="shell">
    ${crumbs(rel, [['Equipe']])}
    <p class="eyebrow eyebrow--rose">Equipe</p>
    <h1 class="page-head__title">Médicas e médicos que atendem com tempo para explicar</h1>
    <p class="lead">Quatro áreas que conversam entre si. Cada profissional é identificado com nome, CRM e registro de qualificação (RQE), como determina a Resolução CFM 2.336/2023.</p>
  </div>
</section>
<section class="section section--tight">
  <div class="shell">
    <div class="grid grid--2">${EQUIPE.map(m => {
      const a = areaPor(m.area);
      return `
      <article class="card card--person">
        <div class="person__head">
          <span class="person__avatar" aria-hidden="true">${ICON[a.icone]}</span>
          <div>
            <p class="eyebrow">${esc(a.nome)}</p>
            <h2 class="card__title">${ctx.pend(m.nome, 'Profissional a confirmar')}</h2>
          </div>
        </div>
        <dl class="person__data">
          <div><dt>CRM-SP</dt><dd>${ctx.pend(m.crm, 'a confirmar')}</dd></div>
          <div><dt>RQE</dt><dd>${ctx.pend(m.rqe, 'a confirmar')}</dd></div>
          <div><dt>Formação</dt><dd>${ctx.pend(m.formacao, 'a confirmar')}</dd></div>
        </dl>
        <p>${esc(a.resumo)}</p>
        <div class="card__actions">
          ${btnWa(`Agendar`, `Olá! Quero agendar uma consulta em ${a.nome} na Neo Clínica.`, 'btn btn--primary btn--sm')}
          <a class="card__more" href="${rel}areas/${a.slug}.html">Página da área ${ICON.arrow}</a>
        </div>
      </article>`;
    }).join('')}
    </div>
    <p class="fineprint">A foto e a biografia de cada profissional entram nesta página com autorização individual. Nenhum dado de profissional é publicado antes da conferência no Conselho Federal de Medicina.</p>
  </div>
</section>
${ctaBand(rel, 'Quer marcar com uma área específica?', 'Diga a área e a unidade de preferência. A equipe confirma os horários disponíveis.')}`;
  return { p, body, ld: [ldCrumbs(ctx, [['Equipe', 'equipe.html']])] };
}

export function unidades(ctx) {
  const rel = '';
  const p = {
    path: 'unidades.html',
    secao: 'unidades',
    titulo: 'Unidades',
    descricao: `As unidades da Neo Clínica: sede na ${sede.logradouro}, ${sede.bairro}, Marília/SP, e atendimento em Garça/SP. Endereços, horários e como chegar.`
  };
  const unidadeBloco = (u) => `
<section class="section section--tight" id="${u.id}">
  <div class="shell split split--rev">
    <div class="split__main">
      <p class="eyebrow eyebrow--rose">${u.principal ? 'Sede' : 'Atendimento também em'}</p>
      <h2 class="h2 h2--lg">${esc(u.nome)}</h2>
      <dl class="datalist">
        <div><dt>${ICON.pin}<span>Endereço</span></dt><dd>${enderecoLinha(u, ctx)}</dd></div>
        <div><dt>${ICON.clock}<span>Horário</span></dt><dd>${horarioLista(u, ctx)}</dd></div>
        <div><dt>${ICON.doc}<span>Como chegar</span></dt><dd>${ctx.pend(u.referencia, 'Ponto de referência a confirmar')}</dd></div>
        ${u.principal ? '' : `<div><dt>${ICON.calendar}<span>Agenda</span></dt><dd>${ctx.pend(null, 'Áreas atendidas em Garça e dias de atendimento a confirmar')}</dd></div>`}
      </dl>
      <div class="hero__actions">
        ${btnWa(`Agendar em ${u.nome}`, `Olá! Quero agendar uma consulta na Neo Clínica, unidade ${u.nome}.`)}
        ${u.mapa ? `<a class="btn btn--ghost" href="${u.mapa}" ${EXT}>Abrir no Google Maps ${ICON.external}</a>` : ''}
      </div>
    </div>
    <div class="split__aside">
      <div class="mapcard ${u.principal ? '' : 'mapcard--soft'}" aria-hidden="true">
        <span class="mapcard__pin">${ICON.pin}</span>
        <span class="mapcard__city">${esc(u.cidade)}</span>
        <span class="mapcard__uf">${esc(u.uf)}</span>
      </div>
    </div>
  </div>
</section>`;
  const body = `
<section class="page-head">
  <div class="shell">
    ${crumbs(rel, [['Unidades']])}
    <p class="eyebrow eyebrow--rose">Unidades</p>
    <h1 class="page-head__title">Onde a Neo Clínica atende</h1>
    <p class="lead">A sede fica no centro de Marília, em endereço de fácil acesso. Em Garça, o atendimento acontece em dias definidos, com agenda própria. Nas duas cidades, o agendamento é pelo mesmo WhatsApp.</p>
  </div>
</section>
${unidadeBloco(sede)}
${unidadeBloco(garca)}
${ctaBand(rel)}`;
  return { p, body, ld: [ldCrumbs(ctx, [['Unidades', 'unidades.html']])] };
}

export function agendamento(ctx) {
  const rel = '';
  const p = {
    path: 'agendamento.html',
    secao: 'agendamento',
    titulo: 'Agendamento',
    descricao: 'Agende sua consulta na Neo Clínica pelo WhatsApp. Escolha a área, a unidade (Marília ou Garça) e o período de preferência; a equipe responde com os horários disponíveis.'
  };
  const chip = (name, value, rotulo, checked) =>
    `<label class="chip"><input type="radio" name="${name}" value="${esc(value)}"${checked ? ' checked' : ''}><span>${esc(rotulo)}</span></label>`;
  const body = `
<section class="page-head">
  <div class="shell">
    ${crumbs(rel, [['Agendamento']])}
    <p class="eyebrow eyebrow--rose">Agendamento</p>
    <h1 class="page-head__title">Agende sua consulta pelo WhatsApp</h1>
    <p class="lead">Monte a mensagem abaixo e envie. A equipe responde com os horários disponíveis na unidade escolhida. Prefere ligar? O telefone fixo está no fim da página.</p>
  </div>
</section>

<section class="section section--tight">
  <div class="shell split">
    <div class="split__main composer" data-composer data-composer-phone="${CLINICA.whatsapp}" data-composer-base="${esc(WA_PADRAO)}">
      <fieldset class="composer__group">
        <legend>Área de atendimento</legend>
        <div class="chips">${AREAS.map((a, i) => chip('area', a.nome, a.nome, i === 0)).join('')}${chip('area', 'Ainda não sei, preciso de orientação', 'Ainda não sei', false)}</div>
      </fieldset>
      <fieldset class="composer__group">
        <legend>Unidade</legend>
        <div class="chips">${UNIDADES.map((u, i) => chip('unidade', u.nome, u.nome, i === 0)).join('')}</div>
      </fieldset>
      <fieldset class="composer__group">
        <legend>Período de preferência</legend>
        <div class="chips">${chip('periodo', 'Manhã', 'Manhã', true)}${chip('periodo', 'Tarde', 'Tarde', false)}${chip('periodo', 'Qualquer horário', 'Qualquer horário', false)}</div>
      </fieldset>
      <div class="composer__out">
        <p class="eyebrow">Sua mensagem</p>
        <output class="composer__preview" data-composer-preview aria-live="polite">${esc(WA_PADRAO)}</output>
        <a class="btn btn--primary btn--lg" href="${wa(WA_PADRAO)}" ${EXT} data-composer-link>${ICON.whatsapp}<span>Enviar pelo WhatsApp</span></a>
        <p class="fineprint">Nada do que você escolhe aqui fica guardado neste site. A mensagem só existe quando você a envia pelo WhatsApp, para o número ${esc(CLINICA.whatsappFormatado)}.</p>
      </div>
    </div>
    <aside class="split__aside">
      <div class="note">
        <p class="eyebrow">Como funciona</p>
        <ol class="minilist">${PASSOS.map(s => `<li><strong>${esc(s.titulo)}.</strong> ${esc(s.texto)}</li>`).join('')}</ol>
      </div>
      <div class="note note--soft">
        <p class="eyebrow">Prefere ligar?</p>
        <p><a class="biglink" href="tel:${CLINICA.telefoneHref}">${ICON.phone}<span>${esc(CLINICA.telefone)}</span></a></p>
        <p class="muted">${esc(sede.horario[0].dias)}, ${esc(sede.horario[0].horas)}.</p>
      </div>
      <div class="note note--soft">
        <p class="eyebrow">Convênios</p>
        <p>${ctx.pend(CLINICA.convenios, 'Convênios aceitos e formas de pagamento a confirmar')}</p>
      </div>
    </aside>
  </div>
</section>

<section class="section section--soft">
  <div class="shell">
    <div class="section__head">
      <p class="eyebrow">Primeira consulta</p>
      <h2 class="section__title">O que levar, por área</h2>
    </div>
    <div class="grid grid--2">${AREAS.map(a => `
      <article class="card">
        <span class="card__icon">${ICON[a.icone]}</span>
        <h3 class="card__title"><a href="${rel}areas/${a.slug}.html">${esc(a.nome)}</a></h3>
        <p>${esc(a.primeiraConsulta)}</p>
      </article>`).join('')}
    </div>
  </div>
</section>`;
  return { p, body, ld: [ldCrumbs(ctx, [['Agendamento', 'agendamento.html']])] };
}

export function orientacoes(ctx) {
  const rel = '';
  const p = {
    path: 'orientacoes.html',
    secao: 'orientacoes',
    titulo: 'Orientações',
    descricao: 'Orientações de saúde escritas pela equipe da Neo Clínica: pré-natal, cuidados com o bebê, saúde mental e condições crônicas. Textos informativos, que não substituem consulta.'
  };
  const body = `
<section class="page-head">
  <div class="shell">
    ${crumbs(rel, [['Orientações']])}
    <p class="eyebrow eyebrow--rose">Orientações</p>
    <h1 class="page-head__title">O que a equipe mais explica no consultório</h1>
    <p class="lead">Textos curtos, escritos para responder às dúvidas que aparecem com mais frequência. Eles têm caráter informativo e não substituem a consulta.</p>
  </div>
</section>
<section class="section section--tight">
  <div class="shell">
    <div class="grid grid--3">${ARTIGOS.map(a => artigoCard(a, rel)).join('')}</div>
  </div>
</section>
${ctaBand(rel, 'Ficou com uma dúvida que não está aqui?', 'Mande pelo WhatsApp. Se for caso de consulta, a equipe já indica a área e os horários.')}`;
  return { p, body, ld: [ldCrumbs(ctx, [['Orientações', 'orientacoes.html']])] };
}

export function orientacao(ctx, art) {
  const rel = '../';
  const a = areaPor(art.area);
  const p = {
    path: `orientacoes/${art.slug}.html`,
    secao: 'orientacoes',
    titulo: art.titulo,
    descricao: art.resumo
  };
  const outros = ARTIGOS.filter(x => x.slug !== art.slug).sort((x, y) => (x.area === art.area ? -1 : 0) - (y.area === art.area ? -1 : 0)).slice(0, 3);
  const body = `
<article class="post">
  <header class="page-head page-head--post">
    <div class="shell shell--narrow">
      ${crumbs(rel, [['Orientações', 'orientacoes.html'], [art.titulo]])}
      <p class="eyebrow eyebrow--rose"><a href="${rel}areas/${a.slug}.html">${esc(a.nome)}</a></p>
      <h1 class="page-head__title">${esc(art.titulo)}</h1>
      <p class="lead">${esc(art.resumo)}</p>
      <p class="post__meta"><time datetime="${art.data}">${dataLonga(art.data)}</time> · ${art.leitura} min de leitura · Equipe Neo Clínica</p>
    </div>
  </header>
  <div class="shell shell--narrow">
    <div class="prose">${art.corpo}</div>
    <div class="note note--soft post__disclaimer">
      <p class="eyebrow">Aviso</p>
      <p>Este texto tem caráter educativo e não substitui a consulta médica. Cada caso é avaliado individualmente. Em situação de urgência, ligue 192 (SAMU) ou procure o pronto-socorro mais próximo.</p>
    </div>
    <div class="post__cta">
      <p>Quer conversar sobre isso em consulta?</p>
      ${btnWa(`Agendar em ${a.nome.split(' e ')[0]}`, `Olá! Li a orientação "${art.titulo}" e quero agendar uma consulta em ${a.nome}.`)}
    </div>
  </div>
</article>
<section class="section section--soft">
  <div class="shell">
    <div class="section__head section__head--row">
      <div>
        <p class="eyebrow">Continue lendo</p>
        <h2 class="section__title">Outras orientações</h2>
      </div>
      <a class="btn btn--ghost" href="${rel}orientacoes.html">Todas as orientações ${ICON.arrow}</a>
    </div>
    <div class="grid grid--3">${outros.map(x => artigoCard(x, rel)).join('')}</div>
  </div>
</section>`;
  const ld = [
    ldCrumbs(ctx, [['Orientações', 'orientacoes.html'], [art.titulo, p.path]]),
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: art.titulo,
      description: art.resumo,
      datePublished: art.data,
      dateModified: art.data,
      inLanguage: 'pt-BR',
      about: a.nome,
      mainEntityOfPage: `${ctx.origem}/${p.path}`,
      image: `${ctx.origem}/assets/img/og.png`,
      author: { '@type': 'Organization', name: CLINICA.nome, '@id': `${ctx.origem}/#clinica` },
      publisher: { '@type': 'Organization', name: CLINICA.nome, '@id': `${ctx.origem}/#clinica` }
    }
  ];
  return { p, body, ld };
}

export function contato(ctx) {
  const rel = '';
  const p = {
    path: 'contato.html',
    secao: 'contato',
    titulo: 'Contato',
    descricao: `Fale com a Neo Clínica: WhatsApp ${CLINICA.whatsappFormatado}, telefone ${CLINICA.telefone}, Instagram ${CLINICA.instagramUsuario}. Sede na ${sede.logradouro}, ${sede.bairro}, Marília/SP, e atendimento em Garça.`
  };
  const body = `
<section class="page-head">
  <div class="shell">
    ${crumbs(rel, [['Contato']])}
    <p class="eyebrow eyebrow--rose">Contato</p>
    <h1 class="page-head__title">Fale com a Neo Clínica</h1>
    <p class="lead">Para agendar, tirar dúvidas ou remarcar, o caminho mais rápido é o WhatsApp. O telefone fixo atende nos dias e horários da clínica.</p>
  </div>
</section>

<section class="section section--tight">
  <div class="shell">
    <div class="grid grid--3">
      <a class="card card--contact" href="${wa(WA_PADRAO)}" ${EXT}>
        <span class="card__icon">${ICON.whatsapp}</span>
        <p class="eyebrow">WhatsApp</p>
        <span class="card__title">${esc(CLINICA.whatsappFormatado)}</span>
        <p>Agendamentos, dúvidas e remarcações. Abre uma conversa com a equipe.</p>
      </a>
      <a class="card card--contact" href="tel:${CLINICA.telefoneHref}">
        <span class="card__icon">${ICON.phone}</span>
        <p class="eyebrow">Telefone fixo</p>
        <span class="card__title">${esc(CLINICA.telefone)}</span>
        <p>${esc(sede.horario[0].dias)}, ${esc(sede.horario[0].horas)}.</p>
      </a>
      <a class="card card--contact" href="${CLINICA.instagram}" ${EXT}>
        <span class="card__icon">${ICON.instagram}</span>
        <p class="eyebrow">Instagram</p>
        <span class="card__title">${esc(CLINICA.instagramUsuario)}</span>
        <p>Novidades da equipe, orientações e avisos de agenda.</p>
      </a>
    </div>
    <div class="official">
      ${ICON.shield}
      <div>
        <h2 class="h3">Canais oficiais</h2>
        <p>A Neo Clínica atende pelo WhatsApp ${esc(CLINICA.whatsappFormatado)}, pelo telefone ${esc(CLINICA.telefone)} e pelo perfil ${esc(CLINICA.instagramUsuario)}. A clínica não pede pagamento antecipado por mensagem nem dados de cartão para confirmar consulta. Em caso de dúvida sobre um contato, confirme por um destes canais.</p>
        <p>E-mail: ${ctx.pend(CLINICA.email, 'e-mail institucional a confirmar')}</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--soft">
  <div class="shell">
    <div class="section__head">
      <p class="eyebrow">Unidades</p>
      <h2 class="section__title">Onde estamos</h2>
    </div>
    <div class="grid grid--2">
      ${unidadeCard(sede, ctx, rel, true)}
      ${unidadeCard(garca, ctx, rel, false)}
    </div>
  </div>
</section>

<section class="section">
  <div class="shell shell--narrow">
    <div class="section__head">
      <p class="eyebrow">Perguntas frequentes</p>
      <h2 class="section__title">Antes de entrar em contato</h2>
    </div>
    ${faqList(FAQ, ctx)}
  </div>
</section>`;
  return { p, body, ld: [ldCrumbs(ctx, [['Contato', 'contato.html']])] };
}

export function privacidade(ctx) {
  const rel = '';
  const p = {
    path: 'privacidade.html',
    secao: 'privacidade',
    titulo: 'Privacidade',
    descricao: 'Como a Neo Clínica trata os dados de quem visita este site e de quem entra em contato pelo WhatsApp. Sem cookies de rastreamento e sem formulários que armazenem dados.'
  };
  const body = `
<section class="page-head page-head--post">
  <div class="shell shell--narrow">
    ${crumbs(rel, [['Privacidade']])}
    <p class="eyebrow eyebrow--rose">Privacidade</p>
    <h1 class="page-head__title">Aviso de privacidade</h1>
    <p class="lead">Este site foi feito para informar e facilitar o contato. Ele não usa cookies de rastreamento, não tem contadores de visita de terceiros e não guarda nada do que você digita.</p>
  </div>
</section>
<div class="shell shell--narrow">
  <div class="prose">
    <h2>O que este site coleta</h2>
    <p>Nada. As páginas são arquivos estáticos: não há cadastro, formulário que envie dados a um servidor, cookie de rastreamento nem ferramenta de análise de audiência. As fontes tipográficas são servidas pelo próprio site, sem chamada a servidores de terceiros.</p>
    <p>O servidor que hospeda as páginas pode registrar dados técnicos de acesso (como endereço IP e horário) para fins de segurança e funcionamento, conforme a política do provedor de hospedagem.</p>
    <h2>Contato pelo WhatsApp e telefone</h2>
    <p>Ao clicar em um botão de WhatsApp, você é levado ao aplicativo ou ao site do WhatsApp, operado pela Meta, que tem política de privacidade própria. A mensagem sugerida pelo site (área, unidade e período de preferência) só existe quando você decide enviá-la.</p>
    <p>As informações que você compartilha com a clínica para agendar (nome, telefone, área de atendimento, convênio) são usadas apenas para organizar o atendimento e entrar em contato sobre a consulta.</p>
    <h2>Dados de saúde</h2>
    <p>Dados clínicos são tratados apenas no atendimento, com base na Lei Geral de Proteção de Dados (Lei 13.709/2018) e no sigilo previsto no Código de Ética Médica. Eles não circulam por este site.</p>
    <h2>Seus direitos</h2>
    <p>Você pode pedir acesso, correção ou exclusão dos dados que a clínica mantém sobre você, nos limites das obrigações legais de guarda de prontuário. Para isso, fale com a clínica pelos canais da página de contato ou pelo e-mail ${ctx.pend(CLINICA.email, 'e-mail institucional a confirmar')}.</p>
    <p>Encarregado pelo tratamento de dados: ${ctx.pend(null, 'nome e contato do encarregado a confirmar')}.</p>
    <h2>Links externos</h2>
    <p>Os links para Google Maps, WhatsApp e Instagram levam a serviços de terceiros, com políticas próprias. Este site abre esses links sem enviar informação sobre a página de origem.</p>
    <p class="muted">Última atualização: ${dataLonga(new Date().toISOString().slice(0, 10))}.</p>
  </div>
</div>`;
  return { p, body, ld: [ldCrumbs(ctx, [['Privacidade', 'privacidade.html']])] };
}

export function naoEncontrada(ctx) {
  /* Links absolutos: o GitHub Pages serve esta página em qualquer caminho,
     inclusive dentro de subpastas, onde links relativos se perderiam. */
  const o = ctx.origem;
  const p = {
    path: '404.html',
    secao: 'erro',
    titulo: 'Página não encontrada',
    descricao: 'A página que você procurou não existe ou mudou de endereço. Volte ao início da Neo Clínica ou fale com a equipe pelo WhatsApp.'
  };
  const body = `
<section class="page-head page-head--post">
  <div class="shell shell--narrow">
    <p class="eyebrow eyebrow--rose">Erro 404</p>
    <h1 class="page-head__title">Esta página não existe</h1>
    <p class="lead">O endereço pode ter mudado ou ter sido digitado errado. Os caminhos mais procurados estão abaixo.</p>
    <div class="hero__actions">
      <a class="btn btn--primary" href="${o}/">Ir para o início</a>
      <a class="btn btn--ghost" href="${o}/areas.html">Áreas de atendimento</a>
      <a class="btn btn--ghost" href="${o}/agendamento.html">Agendar consulta</a>
    </div>
  </div>
</section>`;
  return { p, body, ld: [] };
}

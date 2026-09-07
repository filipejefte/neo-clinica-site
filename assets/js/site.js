/* =========================================================================
   Neo Clínica — comportamento da página.
   Duas responsabilidades, ambas opcionais (o site funciona sem JavaScript):
   1. menu do celular (gaveta);
   2. compositor da mensagem de agendamento: monta o link do WhatsApp a partir
      das opções marcadas. Nada é enviado nem guardado por este script.
   Sem dependências, sem chamadas de rede, sem cookies nem armazenamento local.
   ========================================================================= */
(function () {
  'use strict';
  var doc = document;
  doc.documentElement.classList.add('has-js');

  /* ---- 1. gaveta ---- */
  var burger = doc.querySelector('.burger');
  var drawer = doc.getElementById('gaveta');
  if (burger && drawer) {
    var setOpen = function (open) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      drawer.hidden = !open;
      doc.body.classList.toggle('drawer-open', open);
    };
    burger.addEventListener('click', function () { setOpen(drawer.hidden); });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) { setOpen(false); }
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !drawer.hidden) { setOpen(false); burger.focus(); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 980 && !drawer.hidden) { setOpen(false); }
    });
  }

  /* ---- 2. compositor da mensagem ---- */
  var comp = doc.querySelector('[data-composer]');
  if (comp) {
    var link = comp.querySelector('[data-composer-link]');
    var out = comp.querySelector('[data-composer-preview]');
    var base = comp.getAttribute('data-composer-base') || '';
    var fone = (comp.getAttribute('data-composer-phone') || '').replace(/\D/g, '');
    var valor = function (nome) {
      var r = comp.querySelector('input[name="' + nome + '"]:checked');
      return r ? r.value : '';
    };
    var atualizar = function () {
      var linhas = [base];
      var area = valor('area'), unidade = valor('unidade'), periodo = valor('periodo');
      if (area) { linhas.push('Área: ' + area); }
      if (unidade) { linhas.push('Unidade: ' + unidade); }
      if (periodo) { linhas.push('Preferência de horário: ' + periodo); }
      var msg = linhas.join('\n');
      if (link && fone) { link.href = 'https://wa.me/' + fone + '?text=' + encodeURIComponent(msg); }
      if (out) { out.textContent = msg; }
    };
    comp.addEventListener('change', atualizar);
    atualizar();
  }
})();

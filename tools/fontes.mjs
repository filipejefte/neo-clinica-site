/* =========================================================================
   Reduz as fontes hospedadas ao que o site realmente usa.

   Duas operações, nesta ordem, com o fontTools do Python:
   1. instancia o eixo óptico da Literata no valor que a folha usa
      (font-optical-sizing: none prende o corte em opsz 14), o que remove o
      eixo e a maior parte do arquivo;
   2. recorta o conjunto de caracteres para o alfabeto que o português
      escreve, mais pontuação e algarismos.

   A Quicksand entra só no wordmark do logotipo, então é recortada ao mesmo
   conjunto: se o wordmark mudar, rodar isto de novo.

   Uso:  node tools/fontes.mjs        (precisa de python com fontTools e brotli)
   ========================================================================= */

import { execFileSync } from 'node:child_process';
import { statSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'assets', 'fonts');

/* Latin básico, acentuação do português, pontuação de texto e algarismos. */
const TEXTO =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' +
  'ÀÁÂÃÇÉÊÍÓÔÕÚÜàáâãçéêíóôõúü' +
  ' .,;:!?()[]{}\'"«»/\\|@#$%&*+-=_<>~^` ­‘’“”…·ºª°€©®';

const FONTES = [
  { arquivo: 'literata.woff2', opsz: 14 },
  { arquivo: 'literata-italic.woff2', opsz: 14 },
  { arquivo: 'figtree.woff2' },
  { arquivo: 'quicksand-700.woff2' }
];

const py = (codigo) => execFileSync('python', ['-c', codigo], { encoding: 'utf8' });

for (const { arquivo, opsz } of FONTES) {
  const caminho = join(DIR, arquivo);
  if (!existsSync(caminho)) { console.log(`  ${arquivo}: ausente, pulando`); continue; }
  const antes = statSync(caminho).size;

  const codigo = [
    'import io',
    'from fontTools.ttLib import TTFont',
    'from fontTools import subset',
    opsz ? 'from fontTools.varLib.instancer import instantiateVariableFont' : '',
    `f = TTFont(r"${caminho}", lazy=False)`,
    /* Instanciar e recortar no mesmo objeto quebra: a tabela de variações
       fica sem entrada para glifos que não variam, e o subset acusa
       KeyError. Gravar e reabrir normaliza as tabelas. */
    opsz ? `f = instantiateVariableFont(f, {"opsz": ${opsz}}, inplace=True, updateFontNames=False)` : '',
    opsz ? 'buf = io.BytesIO()' : '',
    opsz ? 'f.flavor = None' : '',
    opsz ? 'f.save(buf)' : '',
    opsz ? 'buf.seek(0)' : '',
    opsz ? 'f = TTFont(buf, lazy=False)' : '',
    'o = subset.Options()',
    'o.layout_features = ["kern","liga","clig","calt","ccmp","locl","mark","mkmk","rlig"]',
    'o.name_IDs = ["*"]',
    'o.drop_tables = ["DSIG"]',
    'o.retain_gids = False',
    's = subset.Subsetter(options=o)',
    `s.populate(text=${JSON.stringify(TEXTO)})`,
    's.subset(f)',
    'f.flavor = "woff2"',
    `f.save(r"${caminho}")`
  ].filter(Boolean).join('\n');

  py(codigo);
  const depois = statSync(caminho).size;
  const corte = Math.round((1 - depois / antes) * 100);
  console.log(`  ${arquivo.padEnd(24)} ${String(antes).padStart(7)} -> ${String(depois).padStart(6)} bytes  (-${corte}%)`);
}

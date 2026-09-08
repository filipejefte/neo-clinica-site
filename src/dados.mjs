/* =========================================================================
   Dados institucionais da Neo Clínica (Marília/SP, com atendimento em Garça).

   Tudo o que o site diz sobre a clínica sai daqui. Campos com valor `null`
   ainda não foram confirmados com a clínica: no modo prévia eles aparecem
   como "a confirmar"; no modo produção o build recusa gerar o site enquanto
   houver pendência (ver build.mjs).

   Fontes: canais públicos da própria clínica (ficha do Google e perfil do
   Instagram), lidos em 03 e 07/09/2026. Nenhum dado interno. Nenhum nome de
   profissional entra aqui antes da conferência de CRM e RQE no CFM e da
   autorização de cada pessoa.
   ========================================================================= */

export const CLINICA = {
  marca: 'Neo Clínica',
  nome: 'Neo Clínica',
  nomeCompleto: 'Neo Clínica, centro de saúde e especialidades',
  slogan: 'Amor & Saúde',

  // CONFIRMAR: razão social e CNPJ (rodapé e dados estruturados).
  razaoSocial: null,
  cnpj: null,

  // CONFIRMAR: inscrição da clínica no CRM-SP e nome/CRM do diretor técnico.
  // Ambos são obrigatórios em publicidade médica (Resolução CFM 2.336/2023).
  registroCRM: null,
  diretorTecnico: null,

  telefone: '(14) 2030-0594',
  telefoneHref: '+551420300594',
  whatsapp: '5514991407990',
  whatsappFormatado: '(14) 99140-7990',

  // CONFIRMAR: e-mail institucional. Sem ele o site não publica e-mail.
  email: null,

  instagram: 'https://www.instagram.com/neoclinicamarilia/',
  instagramUsuario: '@neoclinicamarilia',

  // CONFIRMAR: convênios aceitos (ou "atendimento particular").
  convenios: null,
  // CONFIRMAR: se há teleconsulta e em quais áreas.
  teleconsulta: null,

  /* Origem absoluta das URLs (canonical, Open Graph, sitemap).
     DOMÍNIO A DEFINIR: os endereços óbvios com "neoclinica" já pertencem a
     três empresas homônimas. Trocar antes do build de produção. */
  origem: 'https://DOMINIO-A-DEFINIR.com.br',
  origemPrevia: 'https://filipejefte.github.io/neo-clinica-site'
};

/* Navegação principal, na ordem em que aparece. */
export const NAV = [
  { href: 'areas.html', rotulo: 'Áreas de atendimento' },
  { href: 'equipe.html', rotulo: 'Equipe' },
  { href: 'unidades.html', rotulo: 'Unidades' },
  { href: 'orientacoes.html', rotulo: 'Orientações' },
  { href: 'contato.html', rotulo: 'Contato' }
];

/* Unidades. Marília é a sede (ficha do Google). Garça foi anunciada apenas no
   Instagram, com dois endereços diferentes em posts distintos: nada é
   publicado até a clínica confirmar qual vale. */
export const UNIDADES = [
  {
    id: 'marilia',
    nome: 'Marília',
    cidade: 'Marília',
    uf: 'SP',
    logradouro: 'Av. Carlos Gomes, 113',
    // CONFIRMAR: sala ou andar. O número 113 abriga mais de um ocupante.
    complemento: null,
    bairro: 'Centro',
    cep: '17501-000',
    // CONFIRMAR: ponto de referência que ajude o paciente a chegar.
    referencia: null,
    horario: [
      { dias: 'Segunda a sexta', horas: '9h às 18h', abre: '09:00', fecha: '18:00',
        semana: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] }
    ],
    mapa: 'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('Neo Clínica, Av. Carlos Gomes, 113, Centro, Marília, SP'),
    principal: true
  },
  {
    id: 'garca',
    nome: 'Garça',
    cidade: 'Garça',
    uf: 'SP',
    // CONFIRMAR: endereço definitivo (dois foram divulgados).
    logradouro: null,
    complemento: null,
    bairro: null,
    cep: null,
    referencia: null,
    // CONFIRMAR: dias e horários de atendimento em Garça.
    horario: null,
    mapa: null,
    principal: false
  }
];

/* Áreas de atendimento, como a própria clínica as apresenta na placa da
   fachada e nas publicações. Os textos descrevem o escopo de cada área sem
   prometer resultado e sem nomear profissional. */
export const AREAS = [
  {
    slug: 'ginecologia-e-obstetricia',
    nome: 'Ginecologia e Obstetrícia',
    curto: 'Saúde da mulher',
    icone: 'flor',
    resumo: 'Consultas de rotina, pré-natal e acompanhamento em cada fase da vida da mulher, incluindo histeroscopia.',
    para: 'Para quem quer manter o acompanhamento ginecológico em dia, está grávida ou planeja engravidar, ou precisa investigar um sintoma que incomoda.',
    itens: [
      'Consulta ginecológica de rotina e exames preventivos',
      'Pré-natal, do início da gestação ao pós-parto',
      'Planejamento familiar e orientação sobre contracepção',
      'Histeroscopia para avaliação do interior do útero',
      'Climatério e menopausa',
      'Investigação de sangramentos, cólicas intensas e dor pélvica'
    ],
    primeiraConsulta: 'Traga exames anteriores, a data da última menstruação e a lista de medicamentos em uso. Se estiver grávida, leve também o resultado do teste de gravidez e a carteira de vacinação.',
    perguntas: [
      { q: 'Com quantas semanas devo começar o pré-natal?', a: 'Assim que a gravidez for confirmada. Começar cedo permite organizar os exames do primeiro trimestre e conversar sobre alimentação, vacinas e sinais de alerta desde o início.' },
      { q: 'O que é a histeroscopia?', a: 'É um exame que observa o interior do útero com uma câmera fina, para investigar sangramentos, pólipos e outras alterações. A indicação e o preparo são explicados na consulta.' },
      { q: 'Preciso de encaminhamento para marcar?', a: 'Não. Basta agendar pelo WhatsApp ou telefone. Se tiver um pedido médico ou exames recentes, leve-os no dia.' }
    ]
  },
  {
    slug: 'pediatria-e-neonatologia',
    nome: 'Pediatria e Neonatologia',
    curto: 'Bebês, crianças e adolescentes',
    icone: 'urso',
    resumo: 'Primeira consulta do bebê, acompanhamento do crescimento e cuidado nas doenças comuns da infância.',
    para: 'Para famílias que esperam um bebê, acabaram de sair da maternidade ou querem acompanhamento regular de crianças e adolescentes.',
    itens: [
      'Primeira consulta do recém-nascido e orientação nos primeiros dias',
      'Puericultura: acompanhamento de crescimento, desenvolvimento e alimentação',
      'Orientação sobre amamentação, sono e introdução alimentar',
      'Acompanhamento de bebês prematuros ou que passaram por internação neonatal',
      'Consultas para tosse, febre, cólica, refluxo e outras queixas frequentes',
      'Orientação sobre vacinas e exames de triagem do recém-nascido'
    ],
    primeiraConsulta: 'Leve a caderneta da criança, o cartão de vacinas, o resumo de alta da maternidade (se houver) e anote as dúvidas que surgirem em casa, para não esquecer nenhuma na hora.',
    perguntas: [
      { q: 'Quando deve ser a primeira consulta do bebê?', a: 'Nos primeiros dias após a alta da maternidade, em geral até o sétimo dia de vida, para avaliar peso, amamentação, icterícia e o resultado dos testes de triagem. A maternidade costuma indicar a data na alta.' },
      { q: 'A clínica acompanha prematuros?', a: 'Sim. A área inclui neonatologia, com acompanhamento de bebês que nasceram antes do tempo ou que precisaram de cuidados especiais ao nascer.' },
      { q: 'Vocês atendem adolescentes?', a: 'Sim. O acompanhamento pediátrico pode seguir até o fim da adolescência, com consultas adaptadas a cada idade.' }
    ]
  },
  {
    slug: 'clinica-medica-e-geriatria',
    nome: 'Clínica Médica e Geriatria',
    curto: 'Adultos e pessoas idosas',
    icone: 'coracao',
    resumo: 'Consulta clínica, acompanhamento de pressão, diabetes e outras condições crônicas, e avaliação geriátrica.',
    para: 'Para adultos que querem um médico de referência e para famílias que buscam um cuidado atento à pessoa idosa, com olhar para memória, mobilidade e medicamentos.',
    itens: [
      'Consulta clínica geral e avaliação de saúde periódica',
      'Hipertensão, diabetes, colesterol e outras condições crônicas',
      'Avaliação geriátrica: memória, equilíbrio, quedas e autonomia',
      'Revisão de medicamentos em uso e interações',
      'Orientação a familiares e cuidadores',
      'Encaminhamento a outras áreas quando necessário'
    ],
    primeiraConsulta: 'Traga os exames mais recentes, a lista completa de medicamentos (com doses) e, se possível, as receitas. Para pessoas idosas, é útil vir acompanhado de alguém que conheça a rotina em casa.',
    perguntas: [
      { q: 'O que é uma avaliação geriátrica?', a: 'É uma consulta mais longa, que olha além da doença: memória, humor, sono, alimentação, mobilidade, risco de quedas e os medicamentos em uso. O objetivo é preservar autonomia e qualidade de vida.' },
      { q: 'Preciso ser idoso para consultar em geriatria?', a: 'Não. A área atende adultos em geral em clínica médica. A geriatria é o cuidado específico da pessoa idosa, em geral a partir dos 60 anos.' },
      { q: 'A clínica faz exames de sangue?', a: 'Os pedidos são feitos na consulta e os exames realizados em laboratório de sua escolha. Traga os resultados na consulta de retorno.' }
    ]
  },
  {
    slug: 'saude-mental',
    nome: 'Saúde Mental',
    curto: 'Ansiedade, humor e atenção',
    icone: 'mente',
    resumo: 'Atendimento médico para ansiedade, depressão, burnout, TDAH e outras questões de saúde mental, com plano de cuidado individual.',
    para: 'Para quem sente que a ansiedade, o desânimo ou a exaustão passaram do ponto, ou quer entender melhor sintomas de atenção, sono e humor.',
    itens: [
      'Ansiedade e crises de pânico',
      'Depressão e alterações de humor',
      'Burnout e exaustão relacionada ao trabalho',
      'Avaliação de TDAH em adultos',
      'Transtornos do sono',
      'Acompanhamento com plano de cuidado, medicamentoso ou não'
    ],
    primeiraConsulta: 'Anote desde quando os sintomas aparecem e o que muda no seu dia a dia. Leve a lista de medicamentos em uso e os que já tentou antes. A primeira consulta é uma conversa longa, sem pressa.',
    perguntas: [
      { q: 'Como sei se é hora de procurar ajuda?', a: 'Quando os sintomas duram semanas, atrapalham trabalho, estudo, sono ou relações, ou quando as estratégias que costumavam funcionar já não bastam. Na dúvida, a consulta serve para distinguir uma fase ruim de um quadro que precisa de tratamento.' },
      { q: 'Vou precisar tomar remédio?', a: 'Nem sempre. O plano de cuidado depende da avaliação e é construído em conjunto. Pode incluir medicamento, psicoterapia, mudanças de rotina ou a combinação deles.' },
      { q: 'O atendimento é sigiloso?', a: 'Sim. O sigilo médico é assegurado por lei e pelo Código de Ética Médica, e vale para tudo o que é conversado em consulta.' }
    ]
  }
];

/* Corpo clínico. Um cartão por área, sem nomes: os dados de cada profissional
   (nome, CRM, RQE, formação) entram só depois da conferência no CFM e da
   autorização da pessoa. `null` gera a marcação "a confirmar" na prévia. */
export const EQUIPE = [
  { area: 'clinica-medica-e-geriatria', nome: null, crm: null, rqe: null, formacao: null },
  { area: 'ginecologia-e-obstetricia', nome: null, crm: null, rqe: null, formacao: null },
  { area: 'pediatria-e-neonatologia', nome: null, crm: null, rqe: null, formacao: null },
  { area: 'saude-mental', nome: null, crm: null, rqe: null, formacao: null }
];

/* Perguntas frequentes da página inicial e da página de contato. */
export const FAQ = [
  { q: 'Como marco uma consulta?', a: 'Pelo WhatsApp, no botão que aparece em todas as páginas, ou pelo telefone fixo. A equipe confirma horário, unidade e o que levar no dia.' },
  { q: 'A clínica atende convênios?', a: null, pend: 'Convênios aceitos e formas de pagamento a confirmar com a clínica.' },
  { q: 'Onde fica a clínica em Marília?', a: 'Na Av. Carlos Gomes, 113, no Centro. O endereço e o link para o mapa estão na página de unidades.' },
  { q: 'Existe atendimento em Garça?', a: 'Sim. A Neo Clínica atende também em Garça, com agenda própria. Endereço e horários são confirmados no agendamento.' },
  { q: 'Vocês fazem teleconsulta?', a: null, pend: 'Disponibilidade de teleconsulta por área a confirmar.' },
  { q: 'O que levo na primeira consulta?', a: 'Documento com foto, exames recentes, a lista de medicamentos em uso e, para crianças, a caderneta e o cartão de vacinas. Cada área tem uma orientação específica na sua página.' },
  { q: 'A clínica atende urgências?', a: 'O atendimento é por agendamento. Em caso de urgência, procure o pronto-socorro mais próximo ou ligue 192 (SAMU).' }
];

/* Passos do agendamento pelo WhatsApp, usados na página inicial e na página
   de agendamento. */
export const PASSOS = [
  { titulo: 'Escolha a área e a unidade', texto: 'Diga em qual área precisa de atendimento e se prefere Marília ou Garça. Se não souber a área, descreva o que sente e a equipe orienta.' },
  { titulo: 'Combine o horário', texto: 'A equipe responde com os horários disponíveis. Confirme o que for melhor para você e informe se usa convênio.' },
  { titulo: 'Receba a confirmação', texto: 'Você recebe a confirmação com endereço, horário e o que levar. No dia, chegue com alguns minutos de antecedência.' }
];

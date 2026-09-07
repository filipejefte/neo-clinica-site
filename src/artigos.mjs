/* =========================================================================
   Orientações de saúde: textos informativos, escritos a partir dos temas que
   a clínica já publica nas redes (pré-natal, triagem neonatal, cuidados com o
   bebê, saúde mental, condições crônicas). Nenhum texto promete resultado,
   indica dose de medicamento ou substitui consulta; cada página diz isso.

   Campos: slug (arquivo), area (slug em dados.mjs), titulo, resumo, data
   (AAAA-MM-DD), leitura (minutos), corpo (HTML das seções).
   ========================================================================= */

export const ARTIGOS = [
  {
    slug: 'pre-natal-quando-comecar',
    area: 'ginecologia-e-obstetricia',
    titulo: 'Pré-natal: quando começar e o que acontece nas primeiras consultas',
    resumo: 'O acompanhamento começa assim que a gravidez é confirmada. Entenda o ritmo das consultas, os exames do início e os sinais que pedem contato imediato.',
    data: '2026-08-20',
    leitura: 4,
    corpo: `
<p>O pré-natal é o acompanhamento médico da gestação, do início até o parto. Ele serve para observar a saúde da mãe e do bebê ao longo dos meses, identificar cedo qualquer alteração e preparar a família para o nascimento.</p>
<h2>Quando começar</h2>
<p>O ideal é marcar a primeira consulta assim que o teste de gravidez der positivo. Começar nas primeiras semanas permite organizar os exames do primeiro trimestre, revisar medicamentos em uso e conversar sobre alimentação, atividade física e vacinas com calma.</p>
<p>Quem planeja engravidar pode agendar uma consulta antes mesmo da gestação. Nessa conversa, chamada de pré-concepcional, o médico avalia a saúde geral, atualiza vacinas e orienta sobre a suplementação de ácido fólico, que costuma ser recomendada antes da concepção.</p>
<h2>O ritmo das consultas</h2>
<p>Em uma gestação sem complicações, o acompanhamento costuma seguir este ritmo:</p>
<ul>
<li>uma consulta por mês até por volta da 28ª semana;</li>
<li>uma a cada duas semanas entre a 28ª e a 36ª semana;</li>
<li>uma por semana a partir da 36ª semana até o parto.</li>
</ul>
<p>Esse calendário é um ponto de partida. Gestações com condições como hipertensão, diabetes ou gemelaridade pedem consultas mais frequentes, definidas caso a caso.</p>
<h2>O que acontece na primeira consulta</h2>
<p>A primeira consulta é a mais longa. O médico conversa sobre o histórico de saúde da gestante e da família, gestações anteriores, medicamentos e hábitos. Mede pressão, peso e altura, e solicita os exames iniciais: tipagem sanguínea, hemograma, glicemia, sorologias, exame de urina e o primeiro ultrassom, entre outros.</p>
<p>É também o momento de tirar dúvidas sobre enjoo, cansaço, sono e o que pode ou não ser feito nas próximas semanas.</p>
<h2>Sinais que pedem contato imediato</h2>
<p>Entre uma consulta e outra, alguns sinais merecem contato com o médico ou atendimento de urgência, sem esperar a data marcada:</p>
<ul>
<li>sangramento vaginal em qualquer quantidade;</li>
<li>dor abdominal forte ou contrações regulares antes do tempo;</li>
<li>perda de líquido pela vagina;</li>
<li>dor de cabeça intensa, visão embaçada ou inchaço repentino de rosto e mãos;</li>
<li>febre, ardência ao urinar ou diminuição dos movimentos do bebê depois da 28ª semana.</li>
</ul>
<p>Na dúvida, entre em contato. Uma mensagem a mais é sempre melhor do que um sinal ignorado.</p>`
  },
  {
    slug: 'teste-do-pezinho-primeiros-dias',
    area: 'pediatria-e-neonatologia',
    titulo: 'Teste do pezinho: por que os primeiros dias de vida importam',
    resumo: 'O exame identifica doenças que não dão sinal ao nascer, mas que podem ser tratadas cedo. Saiba o prazo, como é feito e o que fazer com o resultado.',
    data: '2026-08-06',
    leitura: 3,
    corpo: `
<p>O teste do pezinho é um exame de triagem feito com algumas gotas de sangue colhidas do calcanhar do recém-nascido. Ele procura doenças que ainda não mostram sintomas nos primeiros dias, mas que, identificadas cedo, podem ser tratadas antes de causar prejuízo ao desenvolvimento.</p>
<h2>O prazo</h2>
<p>A coleta deve ser feita entre o 3º e o 5º dia de vida. Antes disso, algumas substâncias ainda não atingiram o nível que o exame consegue detectar; depois disso, o tratamento de certas condições começa a perder tempo precioso. Se por algum motivo o prazo passou, o exame ainda deve ser feito o quanto antes, de preferência até o 30º dia.</p>
<h2>O que o exame procura</h2>
<p>A versão básica, oferecida gratuitamente pelo SUS, rastreia um grupo de doenças que inclui hipotireoidismo congênito, fenilcetonúria, doença falciforme e outras hemoglobinopatias, fibrose cística, hiperplasia adrenal congênita e deficiência de biotinidase. Existem versões ampliadas, feitas em laboratórios particulares, que investigam um número maior de condições. O pediatra orienta qual faz sentido para cada família.</p>
<h2>Como é feito</h2>
<p>O calcanhar do bebê é aquecido e higienizado, e uma pequena picada permite recolher as gotas de sangue em um papel-filtro. O desconforto é breve. Amamentar durante ou logo depois da coleta ajuda a acalmar o bebê.</p>
<h2>Resultado alterado não é diagnóstico</h2>
<p>Um resultado alterado significa que o exame precisa ser repetido ou complementado, não que o bebê tem a doença. Muitas alterações se explicam por coleta precoce, prematuridade ou outros fatores. O importante é fazer a repetição no prazo indicado e levar o resultado à consulta pediátrica.</p>
<h2>Os outros testes do recém-nascido</h2>
<p>Além do pezinho, o bebê passa por outros exames de triagem nos primeiros dias: o teste da orelhinha (audição), o do olhinho (reflexo vermelho), o do coraçãozinho (oximetria) e o da linguinha. Todos são rápidos e fazem parte do cuidado padrão. Guarde os resultados na caderneta da criança e leve à primeira consulta.</p>`
  },
  {
    slug: 'lavagem-nasal-em-bebes',
    area: 'pediatria-e-neonatologia',
    titulo: 'Lavagem nasal em bebês: como fazer com segurança',
    resumo: 'Soro fisiológico, seringa sem agulha e uma posição correta resolvem a maior parte dos narizes entupidos. Veja o passo a passo e os sinais de alerta.',
    data: '2026-07-22',
    leitura: 3,
    corpo: `
<p>Bebês respiram principalmente pelo nariz, e um nariz entupido atrapalha mamar, dormir e respirar com conforto. A lavagem nasal com soro fisiológico é a forma mais simples e segura de aliviar a obstrução, e pode ser feita em casa quantas vezes for necessário.</p>
<h2>O que você precisa</h2>
<ul>
<li>soro fisiológico a 0,9%, em temperatura ambiente;</li>
<li>uma seringa sem agulha, de 3 a 5 ml para bebês pequenos;</li>
<li>uma toalha ou fralda de pano para apoiar.</li>
</ul>
<p>Não use água da torneira, chás ou qualquer preparo caseiro. Descongestionantes nasais não são indicados para bebês e podem ser perigosos.</p>
<h2>Passo a passo</h2>
<ol>
<li>Lave as mãos. Aspire o soro com a seringa e retire o ar.</li>
<li>Deite o bebê de lado, ou sente-o com o corpo levemente inclinado para a frente, sempre com a cabeça mais alta que o tronco. Não deite o bebê de costas com a cabeça para trás.</li>
<li>Encoste a ponta da seringa na entrada da narina que ficou por cima e aplique o soro de uma vez, com firmeza, mas sem forçar. O líquido sai pela outra narina ou pela boca, trazendo a secreção.</li>
<li>Vire o bebê para o outro lado e repita na outra narina.</li>
<li>Limpe o excesso com a toalha. O choro é comum e passa logo; ele não indica que algo deu errado.</li>
</ol>
<h2>Quantas vezes por dia</h2>
<p>Não há limite rígido. Faça antes das mamadas e antes de dormir, e sempre que a respiração ficar ruidosa. Em resfriados, a lavagem pode ser repetida várias vezes ao dia.</p>
<h2>Quando procurar o pediatra</h2>
<p>A lavagem alivia sintomas, mas não trata infecções. Procure atendimento se o bebê apresentar febre persistente, dificuldade para respirar (afundamento das costelas, respiração muito rápida, chiado), recusa das mamadas, sonolência fora do comum ou secreção com sangue. Em bebês com menos de três meses, qualquer febre deve ser avaliada no mesmo dia.</p>`
  },
  {
    slug: 'colica-do-bebe-o-que-ajuda',
    area: 'pediatria-e-neonatologia',
    titulo: 'Cólica do bebê: o que ajuda e quando procurar o pediatra',
    resumo: 'A cólica costuma começar nas primeiras semanas e passar por volta do quarto mês. Saiba reconhecer o padrão, o que costuma acalmar e o que exige avaliação.',
    data: '2026-07-08',
    leitura: 3,
    corpo: `
<p>Chamamos de cólica do lactente aquele choro intenso, difícil de consolar, que aparece em bebês saudáveis, em geral no fim da tarde ou à noite. Ele costuma começar entre a segunda e a terceira semana de vida, atinge o pico por volta da sexta semana e desaparece entre o terceiro e o quarto mês.</p>
<h2>Como reconhecer</h2>
<p>Uma referência usada por pediatras é a regra dos três: choro por mais de três horas por dia, em mais de três dias por semana, por pelo menos três semanas, em um bebê que mama bem e ganha peso. O bebê encolhe as pernas, fica vermelho e tenso, e o choro parece ter hora marcada.</p>
<p>A causa exata não é conhecida. A imaturidade do intestino, o excesso de estímulos do dia e a adaptação ao mundo fora do útero parecem contribuir. Cólica não é sinal de que a mãe fez algo errado, nem de que o leite é fraco.</p>
<h2>O que costuma ajudar</h2>
<ul>
<li>Colo com o bebê de bruços sobre o antebraço ou apoiado no ombro, com movimentos ritmados.</li>
<li>Ambiente com menos luz e menos barulho no fim do dia.</li>
<li>Banho morno e massagem suave na barriga, em movimentos circulares no sentido horário.</li>
<li>Movimento de bicicleta com as perninhas, com o bebê deitado de costas.</li>
<li>Verificar a pega na amamentação, para reduzir o ar engolido, e fazer o bebê arrotar após as mamadas.</li>
<li>Revezar quem cuida. O choro prolongado esgota, e um adulto descansado acalma melhor.</li>
</ul>
<p>Chás, gotas e medicamentos só devem ser usados com orientação do pediatra. Muitos produtos vendidos para cólica não têm comprovação e alguns não são seguros para bebês.</p>
<h2>Quando procurar o pediatra</h2>
<p>Procure avaliação se o choro vier acompanhado de febre, vômitos em jato, sangue nas fezes, barriga muito distendida e dura, recusa das mamadas, sonolência excessiva ou pouco ganho de peso. Também vale marcar consulta quando o padrão do choro mudar de repente, ou quando a família estiver no limite. Cuidar de quem cuida faz parte do tratamento.</p>`
  },
  {
    slug: 'ansiedade-burnout-ou-cansaco',
    area: 'saude-mental',
    titulo: 'Ansiedade, burnout ou só cansaço? Como diferenciar e quando buscar ajuda',
    resumo: 'Cansaço passa com descanso. Quando o descanso não resolve, os sinais podem indicar ansiedade, esgotamento pelo trabalho ou depressão. Veja como distinguir.',
    data: '2026-08-12',
    leitura: 4,
    corpo: `
<p>Todo mundo tem semanas difíceis. A diferença entre um período de cansaço e um problema de saúde mental está na duração, na intensidade e no quanto os sintomas atrapalham a vida. Alguns pontos de referência ajudam a entender o que está acontecendo.</p>
<h2>Cansaço comum</h2>
<p>Aparece depois de uma fase de esforço e melhora com descanso, sono regular e um fim de semana mais leve. A pessoa continua sentindo prazer nas coisas de que gosta e consegue se desligar do trabalho quando está fora dele.</p>
<h2>Ansiedade</h2>
<p>A ansiedade se torna um problema quando a preocupação é constante, difícil de controlar e acompanhada de sintomas físicos: coração acelerado, aperto no peito, falta de ar, tensão muscular, insônia, irritabilidade. Crises de pânico, com medo intenso e sensação de perda de controle, são um sinal claro de que vale procurar avaliação.</p>
<h2>Burnout</h2>
<p>O burnout é um esgotamento ligado ao trabalho. Tem três marcas: exaustão que não melhora com descanso, distanciamento ou cinismo em relação ao que se faz, e sensação de que o próprio desempenho caiu. Diferente da depressão, os sintomas costumam estar concentrados na esfera profissional, pelo menos no começo.</p>
<h2>Depressão</h2>
<p>Na depressão, o humor triste ou vazio e a perda de interesse se estendem a todas as áreas da vida, por pelo menos duas semanas, quase todos os dias. Podem vir com alterações de sono e apetite, lentidão, dificuldade de concentração, culpa e pensamentos de que a vida não vale a pena. Se esse último sinal aparecer, procure ajuda no mesmo dia. O CVV atende pelo telefone 188, 24 horas, gratuitamente.</p>
<h2>E o TDAH em adultos?</h2>
<p>Dificuldade de concentração, esquecimentos, desorganização e impulsividade que existem desde a infância e persistem na vida adulta podem indicar TDAH. O diagnóstico é clínico e exige uma avaliação cuidadosa, porque ansiedade, depressão e privação de sono produzem sintomas parecidos.</p>
<h2>Quando buscar ajuda</h2>
<p>Procure avaliação médica quando os sintomas durarem mais de duas semanas, quando atrapalharem trabalho, estudo, sono ou relacionamentos, ou quando as estratégias de sempre já não funcionarem. A primeira consulta é uma conversa longa, sem pressa. O plano de cuidado é construído em conjunto e pode incluir psicoterapia, mudanças de rotina, medicamento ou a combinação deles. Pedir ajuda cedo encurta o caminho.</p>`
  },
  {
    slug: 'hipertensao-depois-dos-60',
    area: 'clinica-medica-e-geriatria',
    titulo: 'Hipertensão depois dos 60: o acompanhamento que faz diferença no dia a dia',
    resumo: 'Pressão alta não dói, e por isso é fácil deixar de lado. Veja como medir em casa, o que muda com a idade e por que o ajuste dos remédios precisa de acompanhamento.',
    data: '2026-06-24',
    leitura: 4,
    corpo: `
<p>A hipertensão é a condição crônica mais comum depois dos 60 anos, e uma das mais silenciosas. Na maior parte do tempo ela não causa sintoma algum, o que faz muita gente abandonar o tratamento justamente quando ele está funcionando. O acompanhamento regular existe para evitar as consequências que aparecem anos depois: infarto, AVC, insuficiência renal e perda de memória.</p>
<h2>O que muda com a idade</h2>
<p>Com o tempo, as artérias ficam mais rígidas e a pressão máxima (sistólica) tende a subir. Ao mesmo tempo, a pessoa idosa fica mais sensível a quedas de pressão, sobretudo ao levantar-se depressa. Por isso, a meta de pressão para cada pessoa é individual: leva em conta outras doenças, os medicamentos em uso, o risco de quedas e a rotina em casa. Não existe um número único que sirva para todos.</p>
<h2>Como medir em casa</h2>
<ul>
<li>Use um aparelho de braço validado, com manguito do tamanho certo. Aparelhos de pulso são menos confiáveis.</li>
<li>Meça sentado, com as costas apoiadas, os pés no chão e o braço na altura do coração, depois de cinco minutos de repouso.</li>
<li>Evite café, cigarro e exercício nos 30 minutos anteriores. Esvazie a bexiga antes.</li>
<li>Faça duas medidas com um minuto de intervalo e anote as duas, com data e hora.</li>
<li>Meça de manhã, antes dos remédios, e à noite, por alguns dias antes da consulta. Leve o registro.</li>
</ul>
<h2>Os remédios</h2>
<p>O ajuste dos medicamentos é feito pelo médico, com base no registro de medidas e em exames periódicos. Não interrompa nem altere doses por conta própria, mesmo com a pressão controlada: é o remédio que a mantém assim. Tonturas ao levantar, cansaço fora do comum ou inchaço nas pernas devem ser relatados na consulta, porque podem indicar necessidade de ajuste.</p>
<h2>O que está ao seu alcance</h2>
<p>Reduzir o sal na comida, manter atividade física regular adaptada à sua condição, cuidar do sono e limitar o álcool têm efeito real sobre a pressão e sobre o número de remédios necessários. Pequenas mudanças mantidas por meses valem mais do que mudanças radicais que não duram.</p>
<h2>Quando procurar atendimento imediato</h2>
<p>Pressão muito elevada acompanhada de dor no peito, falta de ar, dor de cabeça intensa e súbita, fraqueza em um lado do corpo, dificuldade para falar ou alteração da visão exige atendimento de urgência. Nesses casos, ligue 192 ou procure o pronto-socorro mais próximo.</p>`
  }
];

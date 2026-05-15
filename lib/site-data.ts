export const navItems = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Capacidade", href: "#estrutura" },
  { label: "Trabalhos", href: "#trabalhos" },
  { label: "Processo", href: "#processo" },
  { label: "Orçamento", href: "#orcamento" }
];

export const contact = {
  whatsapp: "(11) 95819-0776",
  site: "cmj.jpproject.com.br",
  email: "contato@cmj.jpproject.com.br",
  location: "São Bernardo do Campo/SP",
  region: "ABC Paulista / Grande SP",
  hours: "Seg. a Sex. — 08h às 17h30"
};

export const trustBadges = [
  "Estrutura CNC própria",
  "Alumínio · Aço · Ferro fundido",
  "São Bernardo do Campo/SP"
];

export type CredibilityItem = {
  index: string;
  label: string;
  value: string;
  text: string;
};

export const credibility: CredibilityItem[] = [
  {
    index: "01",
    label: "Especialidade",
    value: "Moldes em EPS para fundição",
    text: "Modelos físicos produzidos a partir de desenho, foto, medidas ou arquivo técnico."
  },
  {
    index: "02",
    label: "Capacidade",
    value: "5 CNCs em operação",
    text: "Router e corte a fio para peças de pequeno, médio e grande porte."
  },
  {
    index: "03",
    label: "Aplicação",
    value: "Alumínio, aço e ferro fundido",
    text: "Projetos dimensionados conforme o processo de fundição da peça."
  },
  {
    index: "04",
    label: "Atendimento",
    value: "B2B industrial",
    text: "Fundições, ferramentarias, estamparias, engenharia e automotivo."
  }
];

export type Service = {
  title: string;
  problem: string;
  application: string;
  benefit: string;
};

export const services: Service[] = [
  {
    title: "Moldes em isopor para fundição",
    problem:
      "Quando a fundição precisa de um modelo físico preciso para reduzir ajustes e retrabalho no processo.",
    application:
      "Peças técnicas, componentes industriais, dispositivos e modelos sob encomenda em EPS.",
    benefit:
      "Leitura geométrica mais fiel ao desenho e previsibilidade maior no fundido."
  },
  {
    title: "Modelação para alumínio",
    problem:
      "Projetos em alumínio que demandam acabamento limpo e tolerâncias controladas na peça final.",
    application:
      "Lotes pilotos, protótipos e demandas recorrentes de ferramentarias e usinagens.",
    benefit:
      "Modelo entregue pronto para o macho/molde, com cantos e raios bem definidos."
  },
  {
    title: "Modelação para aço e ferro fundido",
    problem:
      "Peças robustas, com massa elevada e tolerância dimensional crítica para o processo.",
    application:
      "Componentes industriais, peças de reposição, partes estruturais e fundidos sob desenho.",
    benefit:
      "Base mais consistente para responsabilidade técnica e ciclos maiores de fundição."
  },
  {
    title: "Projetos sob desenho, foto ou medidas",
    problem:
      "Quando o cliente não tem arquivo técnico, apenas referência visual, peça-modelo ou croqui.",
    application:
      "Engenharia reversa simples, reposição de peças antigas e adaptações técnicas.",
    benefit:
      "Entrada no processo de fundição mesmo sem CAD pronto — a CMJ traduz a referência."
  },
  {
    title: "Moldes de grande porte",
    problem:
      "Peças com dimensões fora do padrão que exigem CNC com curso longo e leitura cuidadosa.",
    application:
      "Bases, carcaças, suportes industriais, peças únicas e fundidos seriados de maior porte.",
    benefit:
      "Estrutura preparada para modelos de até ~3,2 m de comprimento sem emendas críticas."
  },
  {
    title: "Acabamento técnico do modelo",
    problem:
      "Quando o desbaste do CNC ainda exige refino manual em raios, encaixes e superfícies.",
    application:
      "Etapa final do molde, antes de seguir para o setor de macharia/fundição do cliente.",
    benefit:
      "Modelo entregue com leitura limpa, reduzindo correções no chão da fundição."
  }
];

export type Segment = {
  title: string;
  need: string;
};

export const segments: Segment[] = [
  {
    title: "Fundições",
    need: "Modelos prontos para entrada rápida no processo, com leitura técnica do desenho."
  },
  {
    title: "Ferramentarias",
    need: "Apoio em projetos sob medida, peças únicas e adequações dimensionais."
  },
  {
    title: "Estamparias",
    need: "Componentes, dispositivos e modelos auxiliares para o chão de fábrica."
  },
  {
    title: "Indústria automotiva",
    need: "Moldes para peças de maior complexidade geométrica e responsabilidade técnica."
  },
  {
    title: "Engenharia e projetos",
    need: "Protótipos, referências físicas e modelos técnicos a partir de CAD."
  },
  {
    title: "Reposição e peças únicas",
    need: "Modelos a partir de peça-amostra, foto ou medidas, para fundidos pontuais."
  }
];

export type Machine = {
  type: string;
  capacity: string;
  axes: string;
};

export const machines: Machine[] = [
  { type: "CNC Corte a Fio", capacity: "4200 × 1100 × 1300 mm", axes: "Y · X · Z" },
  { type: "CNC Router", capacity: "1500 × 800 × 1100 mm", axes: "Y · X · Z" },
  { type: "CNC Router", capacity: "2600 × 1550 × 550 mm", axes: "Y · X · Z" },
  { type: "CNC Router", capacity: "2500 × 1500 × 500 mm", axes: "Y · X · Z" },
  { type: "CNC Router", capacity: "3200 × 1650 × 750 mm", axes: "Y · X · Z" }
];

export const equipment = [
  "2× Serra de fita V800 mm",
  "1× Furadeira de bancada",
  "1× Tupia tubular 800 × 800 mm",
  "1× Vacuum Forming Brawel"
];

export type PortfolioItem = {
  category:
    | "Operação"
    | "Controle"
    | "Moldes técnicos"
    | "Grande porte"
    | "Automotivo"
    | "Projetos especiais";
  title: string;
  description: string;
  image?: string;
  specs?: { label: string; value: string }[];
};

export const portfolio: PortfolioItem[] = [
  {
    category: "Controle",
    title: "Conferência em molde EPS de grande porte",
    description:
      "Operadores conferem medidas e alinhamentos em modelo de grande porte antes da finalização para fundição.",
    image: "/portfolio/operacao-medicao-molde-eps.jpg",
    specs: [
      { label: "Etapa", value: "Medição" },
      { label: "Processo", value: "Acabamento final" },
      { label: "Peça", value: "Grande porte" }
    ]
  },
  {
    category: "Operação",
    title: "Usinagem CNC Router em EPS",
    description:
      "Modelo em EPS sendo usinado diretamente no CNC Router, com cavacos e geometria em formação.",
    image: "/portfolio/cnc-router-usinando-eps.jpg",
    specs: [
      { label: "Máquina", value: "CNC Router" },
      { label: "Material", value: "EPS" },
      { label: "Entrada", value: "Projeto técnico" }
    ]
  },
  {
    category: "Operação",
    title: "Detalhe de usinagem em CNC",
    description:
      "Close do processo de remoção de material no EPS, evidenciando máquina, mesa e ambiente produtivo real.",
    image: "/portfolio/cnc-router-detalhe-usinagem.jpg",
    specs: [
      { label: "Etapa", value: "Usinagem" },
      { label: "Controle", value: "Geometria" }
    ]
  },
  {
    category: "Operação",
    title: "Equipamento de corte vertical",
    description:
      "Estrutura de corte para preparação de blocos e chapas de EPS antes da modelação em CNC.",
    image: "/portfolio/cnc-corte-fio-vertical.jpg",
    specs: [
      { label: "Recurso", value: "Corte vertical" },
      { label: "Uso", value: "Pré-forma EPS" }
    ]
  },
  {
    category: "Grande porte",
    title: "Modelo EPS real finalizado em bancada",
    description:
      "Peça de grande porte em EPS com geometrias elevadas, preparada em ambiente produtivo da CMJ.",
    image: "/portfolio/modelo-eps-grande-porte-real.jpg",
    specs: [
      { label: "Tipo", value: "Grande porte" },
      { label: "Etapa", value: "Acabamento" }
    ]
  },
  {
    category: "Moldes técnicos",
    title: "Molde bipartido para componente fundido",
    description:
      "Projeto técnico de molde com gavetas e regiões de macho, modelado em CAD antes da execução em EPS.",
    image: "/portfolio/cad-molde-tecnico-bipartido.jpg",
    specs: [
      { label: "Entrada", value: "CAD 3D técnico" },
      { label: "Fundição", value: "Alumínio" },
      { label: "Acabamento", value: "Refino manual" }
    ]
  },
  {
    category: "Automotivo",
    title: "Molde com canais de fluxo identificados",
    description:
      "Modelo industrial com sentido de fluxo, ataque e marcações técnicas — pronto para macharia.",
    image: "/portfolio/cad-molde-com-canais-fluxo.jpg",
    specs: [
      { label: "Fundição", value: "Alumínio" },
      { label: "Aplicação", value: "Componente seriado" }
    ]
  },
  {
    category: "Grande porte",
    title: "Cabeçote e mesa para prensa industrial",
    description:
      "Modelação de cabeçote 3400 × 1550 mm e mesa correspondente para conjunto de prensa.",
    image: "/portfolio/cad-prensa-cabecote-grande-porte.jpg",
    specs: [
      { label: "Mesa", value: "3400 × 1550 mm" },
      { label: "Conjunto", value: "Cabeçote + mesa" }
    ]
  },
  {
    category: "Grande porte",
    title: "Peça estrutural de 50,94 m³",
    description:
      "Modelação de peça de grande volume, dividida tecnicamente em seções para execução no CNC Router.",
    image: "/portfolio/cad-peca-grande-50m3.jpg",
    specs: [
      { label: "Volume", value: "50,94 m³" },
      { label: "Estratégia", value: "Modelo seccionado" }
    ]
  },
  {
    category: "Projetos especiais",
    title: "Modelo multi-peça em conjunto",
    description:
      "Projeto especial com múltiplas peças explodidas para entendimento de montagem e roteamento de fundição.",
    image: "/portfolio/cad-explosao-multipeca.jpg",
    specs: [
      { label: "Entrada", value: "CAD multi-corpo" },
      { label: "Saída", value: "Conjunto modelado" }
    ]
  }
];

export const clients = [
  "Grupo Aethra",
  "Gestamp",
  "Inova",
  "Fac Tools",
  "Itafunge",
  "São Francisco",
  "Multimatech",
  "Hemaval",
  "Usicomp",
  "JM Ferramentaria",
  "Mídia Ferramentaria"
];

export type ProcessStep = {
  number: string;
  title: string;
  text: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Recebimento do projeto",
    text: "Desenho técnico, foto da peça, medidas ou peça-amostra — pelo WhatsApp ou e-mail."
  },
  {
    number: "02",
    title: "Entendimento da aplicação",
    text: "Conversamos sobre material de fundição, função da peça e nível de acabamento esperado."
  },
  {
    number: "03",
    title: "Análise técnica",
    text: "Avaliação de dimensões, complexidade, raios, encaixes e viabilidade no nosso CNC."
  },
  {
    number: "04",
    title: "Orçamento técnico",
    text: "Retorno com escopo, prazo estimado e pontos que precisam de confirmação."
  },
  {
    number: "05",
    title: "Produção em CNC",
    text: "Fabricação em CNC Router e/ou Corte a Fio, com acompanhamento técnico em cada etapa."
  },
  {
    number: "06",
    title: "Acabamento e entrega",
    text: "Refino final, conferência dimensional e entrega para o processo de fundição do cliente."
  }
];

export const faqs = [
  {
    question: "Posso solicitar orçamento mesmo sem desenho técnico?",
    answer:
      "Sim. A CMJ trabalha com desenho em CAD, mas também com foto da peça, medidas anotadas, peça-amostra ou referência industrial. O importante é que dê para entender geometria, dimensões e aplicação."
  },
  {
    question: "Vocês trabalham com peças grandes?",
    answer:
      "Sim. Os CNC Router da CMJ atendem peças até aproximadamente 3,2 m × 1,65 m × 0,75 m, e o corte a fio chega a 4,2 m em Y. Peças maiores podem ser produzidas em partes técnicas."
  },
  {
    question: "Atendem somente São Bernardo do Campo?",
    answer:
      "A fábrica fica em São Bernardo do Campo/SP, mas atendemos clientes de toda a Grande SP, ABC, interior paulista e outros estados — o envio é combinado caso a caso."
  },
  {
    question: "Quais informações ajudam no orçamento?",
    answer:
      "Material de fundição (alumínio, aço, ferro), dimensões aproximadas da peça, prazo desejado e desenho/foto/medidas. Quanto mais claro o uso final, mais preciso fica o retorno."
  },
  {
    question: "Vocês produzem moldes para alumínio, aço e ferro fundido?",
    answer:
      "Sim. A CMJ desenvolve modelos em EPS para fundição em alumínio, aço e ferro fundido, ajustando contração, sobre-medidas e acabamento conforme o material."
  },
  {
    question: "O envio do projeto pelo WhatsApp já é suficiente para análise inicial?",
    answer:
      "Sim. O WhatsApp é o canal principal de orçamento — o cliente envia foto, desenho ou medidas e a CMJ retorna com uma primeira análise técnica e prazo estimado."
  }
];

/* Mensagens prontas para os diferentes CTAs do site */
export const whatsappMessages = {
  default:
    "Olá, gostaria de solicitar um orçamento para moldes em isopor para fundição. Posso enviar o desenho ou foto da peça?",
  hero:
    "Olá, vim do site da CMJ Modelação. Gostaria de orçar um molde em isopor para fundição — posso enviar desenho/foto e dimensões?",
  midCta:
    "Olá, tenho um projeto para fundição e gostaria que a CMJ avalie a viabilidade do molde em EPS.",
  header:
    "Olá, gostaria de falar com a CMJ Modelação sobre um projeto de molde em isopor.",
  footer:
    "Olá, vim pelo rodapé do site da CMJ Modelação. Gostaria de conversar sobre um projeto."
};

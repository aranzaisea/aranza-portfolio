import type { Lang } from '../i18n/ui';

type L = Record<Lang, string>;
export interface CaseMeta {
  slug: string; no: string; name: string; tag: L;
  status: 'launched' | 'mvp' | 'concept';
  statusLabel: L; sentence: L; chips: Record<Lang, string[]>;
  role: L; year: string; where: L;
  cover: string; pageCover?: string; coverAlt: L; coverFit?: 'cover' | 'phones'; coverPhones?: string[];
  seoTitle: L; seoDesc: L; ai: boolean;
}

export const CASES: CaseMeta[] = [
  {
    slug: 'claimpro', no: '01', name: 'ClaimPro', ai: true,
    tag: { en: 'AI claims copilot · Insurance', es: 'Copiloto de IA para reclamos · Seguros' },
    status: 'launched', statusLabel: { en: 'Launched', es: 'Lanzado' },
    sentence: {
      en: 'An AI copilot that drafts insurance claims and knows when to hand them back to a person.',
      es: 'Un copiloto de IA que redacta reclamos de seguros y sabe cuándo devolvérselos a una persona.',
    },
    chips: { en: ['−68% resolution time', '90%+ adoption'], es: ['−68% tiempo de resolución', '90%+ de adopción'] },
    role: { en: 'Product Designer', es: 'Product Designer' }, year: '2024–25',
    where: { en: 'at Perficient', es: 'en Perficient' },
    cover: 'cases/claimpro/command-center.jpg', pageCover: 'cases/claimpro/command-center-light.jpg',
    coverAlt: { en: 'ClaimPro Command Center: claims ranked by the AI with confidence and reasons', es: 'Command Center de ClaimPro: reclamos priorizados por la IA con confianza y motivos' },
    seoTitle: { en: 'ClaimPro — AI claims copilot case study', es: 'ClaimPro — Caso de estudio: copiloto de IA para reclamos' },
    seoDesc: {
      en: 'How I designed an AI copilot for ~500 insurance adjusters: confidence thresholds, human hand-off and an audit trail. −68% resolution time (client-reported).',
      es: 'Cómo diseñé un copiloto de IA para ~500 agentes de seguros: umbrales de confianza, derivación a humanos y trazabilidad. −68% en tiempo de resolución (dato del cliente).',
    },
  },
  {
    slug: 'offdep', no: '02', name: 'Off Dep', ai: true,
    tag: { en: 'AI B2B procurement · E-commerce', es: 'Compras B2B con IA · E-commerce' },
    status: 'launched', statusLabel: { en: 'Launched', es: 'Lanzado' },
    sentence: {
      en: 'A self-service B2B store where AI recommends, checks budget and policy, and approvers decide in one click.',
      es: 'Una tienda B2B autoservicio donde la IA recomienda, controla presupuesto y políticas, y quien aprueba decide en un clic.',
    },
    chips: { en: ['+65% Business accounts', '+56% B2B sales'], es: ['+65% cuentas Business', '+56% ventas B2B'] },
    role: { en: 'Product Designer', es: 'Product Designer' }, year: '',
    where: { en: 'at Perficient', es: 'en Perficient' },
    cover: 'cases/offdep/dashboard.jpg',
    coverAlt: { en: 'Off Dep Business dashboard with approvals, budget and AI restock suggestions', es: 'Dashboard de Off Dep Business con aprobaciones, presupuesto y sugerencias de reposición' },
    seoTitle: { en: 'Off Dep — AI B2B procurement case study', es: 'Off Dep — Caso de estudio: compras B2B con IA' },
    seoDesc: {
      en: 'A self-service B2B e-commerce platform with an AI purchase copilot, budget-aware cart and AI-assisted approvals. +65% Business accounts, +56% B2B sales.',
      es: 'Plataforma B2B autoservicio con copiloto de compras, carrito con presupuesto y aprobaciones asistidas por IA. +65% cuentas Business, +56% ventas B2B.',
    },
  },
  {
    slug: 'rumbo', no: '03', name: 'Club Rumbo', ai: false,
    tag: { en: 'Loyalty app · Fuel retail · iOS & Android', es: 'App de fidelización · Estaciones de servicio · iOS y Android' },
    status: 'launched', statusLabel: { en: 'Launched MVP', es: 'MVP lanzado' },
    sentence: {
      en: 'A rewards program people already had and never used, turned into a loop they can see: fill up, earn, redeem.',
      es: 'Un programa de puntos que la gente tenía y no usaba, convertido en un ciclo visible: cargar, sumar, canjear.',
    },
    chips: { en: ['1-month MVP', '20 interviews'], es: ['MVP en 1 mes', '20 entrevistas'] },
    role: { en: 'Lead Product Designer', es: 'Lead Product Designer' }, year: '2023',
    where: { en: 'at Perficient', es: 'en Perficient' },
    cover: 'cases/rumbo/s05.png', coverFit: 'phones', coverPhones: ['cases/rumbo/s05.png', 'cases/rumbo/s22.png', 'cases/rumbo/s24.png'],
    coverAlt: { en: 'Club Rumbo app: home with points balance, reward detail and redemption code', es: 'App Club Rumbo: home con saldo de puntos, detalle de recompensa y código de canje' },
    seoTitle: { en: 'Club Rumbo — Loyalty app case study', es: 'Club Rumbo — Caso de estudio: app de fidelización' },
    seoDesc: {
      en: 'A 1-month MVP for a fuel-station rewards program: one scan to earn, an in-app catalog to redeem. 20 user interviews, iOS and Android.',
      es: 'Un MVP de 1 mes para el programa de puntos de una red de estaciones: un escaneo para sumar y un catálogo en la app para canjear. 20 entrevistas, iOS y Android.',
    },
  },
  {
    slug: 'vantage', no: '04', name: 'Vantage', ai: true,
    tag: { en: 'Multi-agent compliance · Fintech', es: 'Compliance multiagente · Fintech' },
    status: 'launched', statusLabel: { en: 'Launched', es: 'Lanzado' },
    sentence: {
      en: 'AML analysts supervising a team of AI agents: every agent shows its work, and nothing is signed without a person.',
      es: 'Analistas de prevención de lavado supervisando un equipo de agentes de IA: cada agente muestra su trabajo y nada se firma sin una persona.',
    },
    chips: { en: ['4 agents per case', 'Batch sign-off with sampling'], es: ['4 agentes por caso', 'Firma por lote con muestreo'] },
    role: { en: 'Product Designer', es: 'Product Designer' }, year: '2025',
    where: { en: 'at Perficient', es: 'en Perficient' },
    cover: 'cases/vantage/case-complete.jpg',
    coverAlt: { en: 'Vantage case detail: four agents finished and a recommendation waiting for the analyst', es: 'Detalle de caso en Vantage: cuatro agentes terminados y una recomendación esperando a la analista' },
    seoTitle: { en: 'Vantage — Multi-agent AML compliance case study', es: 'Vantage — Caso de estudio: compliance multiagente' },
    seoDesc: {
      en: 'Designing how AML analysts supervise AI agents: per-agent progress, partial failures, one question at a time and batch sign-off with sampling.',
      es: 'Cómo diseñé la supervisión de agentes de IA en prevención de lavado: progreso por agente, fallas parciales, una pregunta a la vez y firma por lote con muestreo.',
    },
  },
  {
    slug: 'relay', no: '05', name: 'Relay', ai: true,
    tag: { en: 'Workplace AI agent · Enterprise SaaS', es: 'Agente de IA para equipos · SaaS empresarial' },
    status: 'launched', statusLabel: { en: 'Launched', es: 'Lanzado' },
    sentence: {
      en: 'An AI agent that works across a company’s tools, with an autonomy policy the admin sets and everyone can read.',
      es: 'Un agente de IA que trabaja con las herramientas de la empresa, con una política de autonomía que define el admin y todos pueden leer.',
    },
    chips: { en: ['Autonomy policy', 'Plan → approve → run'], es: ['Política de autonomía', 'Plan → aprobar → ejecutar'] },
    role: { en: 'Product Designer', es: 'Product Designer' }, year: '',
    where: { en: '', es: '' },
    cover: 'cases/relay/b3-plan-proposal.png', pageCover: 'cases/relay/c2-review-workflow.png',
    coverAlt: { en: 'Relay plan proposal: four steps, one waiting for the user’s approval', es: 'Propuesta de plan en Relay: cuatro pasos, uno esperando la aprobación del usuario' },
    seoTitle: { en: 'Relay — Workplace AI agent case study', es: 'Relay — Caso de estudio: agente de IA para equipos' },
    seoDesc: {
      en: 'An enterprise AI agent with a readable autonomy policy: plans before acting, approvals per category, a full audit log and a trust center for every employee.',
      es: 'Un agente de IA empresarial con una política de autonomía legible: planifica antes de actuar, aprobaciones por categoría, registro completo y un centro de confianza para cada persona.',
    },
  },
  {
    slug: 'numi', no: '06', name: 'Numi', ai: true,
    tag: { en: 'AI meal planner · Consumer · iOS', es: 'Planificador de comidas con IA · Consumo · iOS' },
    status: 'concept', statusLabel: { en: 'Independent concept', es: 'Concepto independiente' },
    sentence: {
      en: 'A meal planner that starts from what’s already in your fridge, and tells you when it’s guessing.',
      es: 'Un planificador de comidas que parte de lo que ya hay en tu heladera, y te avisa cuando está suponiendo.',
    },
    chips: { en: ['End-to-end, solo', 'Hi-fi prototype'], es: ['De punta a punta, sola', 'Prototipo hi-fi'] },
    role: { en: 'Product Designer, solo', es: 'Product Designer, sola' }, year: '2026',
    where: { en: 'independent concept', es: 'concepto independiente' },
    cover: 'cases/numi/today.jpg', coverFit: 'phones', coverPhones: ['cases/numi/today.jpg', 'cases/numi/receipt-review.png', 'cases/numi/chat.jpg'],
    coverAlt: { en: 'Numi: today’s plan, receipt review and chat', es: 'Numi: plan del día, revisión del ticket y chat' },
    seoTitle: { en: 'Numi — AI meal planner case study', es: 'Numi — Caso de estudio: planificador de comidas con IA' },
    seoDesc: {
      en: 'An independent concept: an iOS meal planner that reads your grocery receipt, plans around your fridge and your day, and shows what it assumed.',
      es: 'Un concepto independiente: un planificador de comidas para iOS que lee tu ticket, planifica según tu heladera y tu día, y muestra lo que supuso.',
    },
  },
];

export const bySlug = (s: string) => CASES.find((c) => c.slug === s)!;
export const nextCase = (s: string) => {
  const i = CASES.findIndex((c) => c.slug === s);
  return CASES[(i + 1) % CASES.length];
};

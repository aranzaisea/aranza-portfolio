export type Lang = 'en' | 'es';
export const SITE = 'https://aranzaisea.netlify.app';
export const EMAIL = 'aranzaisea@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/aranzaisea';
export const WEBTOON = 'https://www.webtoons.com/en/canvas/delirium-gl/list?title_no=1017409';
export const CV = { en: '/cv/Aranza_Isea_Resume_EN.pdf', es: '/cv/Aranza_Isea_CV_ES.pdf' } as const;

export const home = (l: Lang) => (l === 'en' ? '/' : '/es/');
export const caseUrl = (l: Lang, slug: string) => (l === 'en' ? `/work/${slug}/` : `/es/work/${slug}/`);
export const patternsUrl = (l: Lang) => (l === 'en' ? '/patterns/' : '/es/patterns/');
/** Same page in the other language */
export function altPath(path: string, to: Lang) {
  const clean = path.replace(/^\/es(\/|$)/, '/');
  return to === 'en' ? clean : '/es' + (clean === '/' ? '/' : clean);
}

export const ui = {
  en: {
    nav: { work: 'Work', approach: 'Approach', patterns: 'Patterns', experience: 'Experience', about: 'About', resume: 'Resume' },
    menu: 'Menu',
    skip: 'Skip to content',
    depth: { label: 'Reading depth', skim: 'Skim', standard: 'Standard', deep: 'Deep', tSkim: '30s', tStandard: '3m', tDeep: '10m' },
    why: 'Design rationale',
    whyShort: 'Why',
    summary: 'The 30-second version',
    problem: 'Problem', role: 'My role', team: 'Team', client: 'Context', timeline: 'Timeline',
    next: 'Next case',
    allWork: 'All work',
    viewCase: 'Read the case',
    noPage: 'Case study in progress',
    ev: { validated: 'Validated with users', measured: 'Measured', shipped: 'Shipped', hypothesis: 'Hypothesis' },
    tradeoff: 'Trade-off',
    footer: 'Senior Product Designer · AI products · Buenos Aires',
    zoom: 'Open full size',
  },
  es: {
    nav: { work: 'Proyectos', approach: 'Enfoque', patterns: 'Patrones', experience: 'Trayectoria', about: 'Sobre mí', resume: 'CV' },
    menu: 'Menú',
    skip: 'Ir al contenido',
    depth: { label: 'Profundidad de lectura', skim: 'Rápido', standard: 'Estándar', deep: 'Completo', tSkim: '30s', tStandard: '3m', tDeep: '10m' },
    why: 'Razonamiento de diseño',
    whyShort: 'Por qué',
    summary: 'La versión de 30 segundos',
    problem: 'Problema', role: 'Mi rol', team: 'Equipo', client: 'Contexto', timeline: 'Duración',
    next: 'Siguiente caso',
    allWork: 'Todos los proyectos',
    viewCase: 'Ver el caso',
    noPage: 'Caso en preparación',
    ev: { validated: 'Validado con usuarios', measured: 'Medido', shipped: 'Lanzado', hypothesis: 'Hipótesis' },
    tradeoff: 'Tensión',
    footer: 'Senior Product Designer · Productos con IA · Buenos Aires',
    zoom: 'Ver en tamaño completo',
  },
} as const;

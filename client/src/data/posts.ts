/**
 * Blog posts data — single source of truth shared by the home "Mis
 * pensamientos" section and the /blog routes. Add new entries here; the newest
 * (by `date`) should go first.
 */
export interface Post {
  /** URL slug, e.g. /<lang>/blog/<slug>. */
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** Short teaser shown on cards. */
  excerpt: string;
  tags: string[];
  /** Body paragraphs rendered on the post page. */
  body: string[];
}

export const posts: Post[] = [
  {
    slug: "arquitectura-backend-escalable",
    title: "Cómo pienso una arquitectura back-end escalable",
    date: "2026-05-28",
    excerpt:
      "Antes de escribir código, decido los límites del sistema. Estas son las preguntas que me hago para que escale sin sorpresas.",
    tags: ["Backend", "Arquitectura"],
    body: [
      "Escalar no es añadir servidores: es diseñar límites claros entre responsabilidades. Cuando un sistema crece sin esos límites, cada cambio se vuelve un riesgo.",
      "Empiezo por los flujos de datos: quién escribe, quién lee y con qué frecuencia. A partir de ahí decido dónde conviene una cola, dónde una caché y dónde simplemente una buena consulta indexada.",
      "La idempotencia y la trazabilidad no son extras: son lo que te permite dormir tranquilo cuando el tráfico se multiplica.",
    ],
  },
  {
    slug: "rag-en-produccion",
    title: "Llevar un sistema RAG a producción sin romperse",
    date: "2026-04-10",
    excerpt:
      "Un demo de RAG es fácil; uno en producción tiene evaluación, guardarraíles y control de costos. Lo que aprendí en el camino.",
    tags: ["IA", "RAG", "Python"],
    body: [
      "La diferencia entre un demo de RAG y un sistema en producción está en lo que no se ve: la evaluación de respuestas, los guardarraíles y el control de costos por token.",
      "Mido la calidad de recuperación antes que la del modelo. Si el contexto recuperado es malo, ningún modelo lo arregla.",
      "El costo se controla en el diseño, no en la factura: límites de contexto, caché de embeddings y respuestas, y modelos del tamaño justo para cada tarea.",
    ],
  },
  {
    slug: "go-para-sistemas",
    title: "Por qué elijo Go para sistemas de alto rendimiento",
    date: "2026-03-02",
    excerpt:
      "Concurrencia simple, binarios sin dependencias y un runtime predecible. Go me da la previsibilidad que necesito.",
    tags: ["Go", "Performance"],
    body: [
      "Go no es el lenguaje más expresivo, y esa es justamente su ventaja: hay pocas formas de hacer las cosas, así que el equipo lee el mismo código sin sorpresas.",
      "Las goroutines hacen que la concurrencia sea barata de escribir, pero el verdadero valor está en un runtime predecible y binarios que despliego sin arrastrar dependencias.",
      "Para servicios donde la latencia importa, esa previsibilidad vale más que cualquier abstracción elegante.",
    ],
  },
  {
    slug: "infra-como-codigo",
    title: "Infraestructura como código: menos clics, más confianza",
    date: "2026-01-18",
    excerpt:
      "Reproducibilidad, revisiones y rollback. Por qué dejé de configurar la nube a mano hace tiempo.",
    tags: ["Cloud", "DevOps"],
    body: [
      "Configurar la nube a mano funciona hasta que tienes que recrearla. La infraestructura como código convierte ese miedo en un comando reproducible.",
      "Lo que más valoro no es la automatización en sí, sino poder revisar un cambio de infraestructura en un pull request, igual que cualquier otro código.",
      "Y cuando algo sale mal, el rollback es volver a un commit anterior, no recordar qué casilla marqué la semana pasada.",
    ],
  },
];

/** Format an ISO date for display in the given site locale. */
export function formatPostDate(iso: string, lang: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(
    lang === "en" ? "en-US" : "es-ES",
    { year: "numeric", month: "short", day: "numeric" },
  );
}

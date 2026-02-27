export interface Project {
  icon: string;
  name: string;
  desc: string;
  tags: [string, string][];
}

export interface StackItem {
  i: string;
  n: string;
}

export interface StackCategory {
  label: string;
  items: StackItem[];
}

export interface BlogPost {
  cat: string;
  date: string;
  title: string;
  exc: string;
}

export interface TimelineItem {
  period: string;
  role: string;
  company: string;
  desc: string;
  active?: boolean;
}

export interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  op: number;
  delay: number;
  dur: number;
}

export const PROJECTS: Project[] = [
  {
    icon: "🛒",
    name: "NexaCommerce",
    desc: "Full-stack e-commerce platform with real-time inventory, Stripe payments, and an AI recommendation engine.",
    tags: [["Next.js", "pk"], ["PostgreSQL", "co"], ["Stripe", "pe"]]
  },
  {
    icon: "📊",
    name: "DataPulse",
    desc: "Real-time analytics SaaS with WebSocket-driven charts, role-based auth, and automated export pipelines.",
    tags: [["React", "pk"], ["Node.js", "co"], ["Redis", "tl"]]
  },
  {
    icon: "🤖",
    name: "AutoFlow AI",
    desc: "LLM-powered workflow automation with a drag-and-drop pipeline builder and integrations to 40+ services.",
    tags: [["Python", "pk"], ["FastAPI", "co"], ["OpenAI", "pe"]]
  },
  {
    icon: "🏥",
    name: "MediBook",
    desc: "HIPAA-compliant scheduling app with multi-provider calendar sync, SMS reminders, and patient intake.",
    tags: [["Next.js", "pk"], ["Prisma", "co"], ["Twilio", "tl"]]
  },
  {
    icon: "💬",
    name: "PingSpace",
    desc: "Team collaboration platform with real-time chat, file sharing, threaded conversations, and E2E encryption.",
    tags: [["React", "pk"], ["Socket.io", "co"], ["AWS", "pe"]]
  },
  {
    icon: "🌐",
    name: "GeoBrief",
    desc: "Location-aware news aggregator using geospatial queries, ML classification, and a performant PWA.",
    tags: [["Vue.js", "pk"], ["MongoDB", "co"], ["GCP", "tl"]]
  },
];

export const STACK: StackCategory[] = [
  {
    label: "Languages",
    items: [
      { i: "𝙅𝙎", n: "JavaScript" }, { i: "🔷", n: "TypeScript" }, { i: "🐍", n: "Python" }, { i: "⚙️", n: "Rust" }, { i: "🟦", n: "Go" }
    ]
  },
  {
    label: "Frontend",
    items: [
      { i: "⚛️", n: "React" }, { i: "▲", n: "Next.js" }, { i: "💚", n: "Vue 3" }, { i: "🎨", n: "Tailwind" }, { i: "🎭", n: "Framer Motion" }
    ]
  },
  {
    label: "Backend",
    items: [
      { i: "🟢", n: "Node.js" }, { i: "🐘", n: "PostgreSQL" }, { i: "🍃", n: "MongoDB" }, { i: "⚡", n: "Redis" }, { i: "🔥", n: "FastAPI" }, { i: "🔗", n: "GraphQL" }
    ]
  },
  {
    label: "DevOps/Cloud",
    items: [
      { i: "☁️", n: "AWS" }, { i: "🐳", n: "Docker" }, { i: "⚓", n: "Kubernetes" }, { i: "🔄", n: "CI/CD" }, { i: "▲", n: "Vercel" }, { i: "🌍", n: "Terraform" }
    ]
  },
];

export const BLOG: BlogPost[] = [
  {
    cat: "Architecture",
    date: "Jan 2025",
    title: "Building Multi-Tenant SaaS with Next.js 15 and Row-Level Security",
    exc: "Deep dive into scalable tenant isolation patterns using Postgres RLS, subdomain routing, and middleware guards."
  },
  {
    cat: "Performance",
    date: "Dec 2024",
    title: "Zero to 99 Lighthouse: A Real-World Performance Audit Case Study",
    exc: "How I took a client's e-commerce site from a 41 score to 99 by rethinking images, fonts, and hydration."
  },
  {
    cat: "AI / LLM",
    date: "Nov 2024",
    title: "Integrating OpenAI Structured Outputs into Production Node Apps",
    exc: "Practical patterns for type-safe LLM responses, retries, and prompt versioning in production services."
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    period: "2023 — Present",
    role: "Senior Full Stack Engineer",
    company: "Independent / Freelance",
    desc: "Building production-grade apps for clients in e-commerce, healthcare, and fintech. Specializing in Next.js, TypeScript, and cloud-native architectures.",
    active: true
  },
  {
    period: "2021 — 2023",
    role: "Lead Frontend Engineer",
    company: "Tech Startup (Series A)",
    desc: "Led a 4-person team shipping a B2B SaaS product to 10k+ users. Architected the component library, CI/CD, and design system."
  },
  {
    period: "2019 — 2021",
    role: "Full Stack Developer",
    company: "Digital Agency",
    desc: "Delivered 20+ client projects spanning custom CMS platforms, REST APIs, and mobile-responsive marketing sites."
  },
];

// Simple seeded random function for consistent server/client rendering
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const STARS: Star[] = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  x: seededRandom(i) * 100,
  y: seededRandom(i + 1000) * 100,
  size: seededRandom(i + 2000) * 1.8 + 0.3,
  op: seededRandom(i + 3000) * 0.65 + 0.2,
  delay: seededRandom(i + 4000) * 5,
  dur: seededRandom(i + 5000) * 3 + 2
}));

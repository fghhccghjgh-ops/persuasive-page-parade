import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

function PossibilityBand1() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const xText = useTransform(scrollYProgress, [0, 1], [-80, 90]);
  const xBars = useTransform(scrollYProgress, [0, 1], [60, -70]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.04, 0.96]);

  return (
    <div ref={ref} className="relative py-20 sm:py-28 border-t border-foreground/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <motion.div style={{ x: xText, scale }} className="lg:col-span-7 will-change-transform">
          <div className="font-mono-tabular text-xs text-ink-500 tracking-[0.2em] mb-4">01 · CORPO & CONSTÂNCIA</div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.02]">
            Começou a treinar.
          </h2>
        </motion.div>

        <motion.div
          style={{ x: xBars }}
          className="lg:col-span-5 flex items-end gap-2.5 h-36 sm:h-44 p-6 rounded-2xl delux-surface will-change-transform"
        >
          {[32, 46, 52, 68, 74, 86, 94, 100].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end h-full gap-2">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-foreground/25 to-foreground"
                style={{ height: `${h}%`, opacity: 0.4 + i * 0.08 }}
              />
              <span className="font-mono-tabular text-[10px] text-ink-500 text-center">S{i + 1}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function PossibilityBand2() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const xText = useTransform(scrollYProgress, [0, 1], [85, -75]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const yLayer = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div ref={ref} className="relative py-20 sm:py-28 border-t border-foreground/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <motion.div
          style={{ y: yLayer, rotate }}
          className="lg:col-span-5 order-2 lg:order-1 p-7 rounded-2xl delux-surface relative overflow-hidden will-change-transform"
        >
          <div className="flex items-center justify-between text-xs text-ink-400 font-mono-tabular mb-6">
            <span>IMERSÃO AUDITIVA</span>
            <span>NÍVEL B2</span>
          </div>
          <div className="flex items-center gap-1.5 h-16">
            {[24, 58, 92, 44, 76, 100, 62, 84, 38, 70, 90, 48, 66, 30, 52, 80].map((bar, idx) => (
              <div
                key={idx}
                className="flex-1 rounded-full bg-foreground/80"
                style={{ height: `${bar}%`, opacity: 0.35 + (idx % 4) * 0.16 }}
              />
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between text-xs text-ink-400">
            <span>Compreensão real</span>
            <span className="font-mono-tabular text-foreground">142 dias em sequência</span>
          </div>
        </motion.div>

        <motion.div style={{ x: xText }} className="lg:col-span-7 order-1 lg:order-2 lg:text-right will-change-transform">
          <div className="font-mono-tabular text-xs text-ink-500 tracking-[0.2em] mb-4">02 · FLUÊNCIA</div>
          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight text-foreground leading-[0.98]">
            Aprendeu inglês.
          </h2>
        </motion.div>
      </div>
    </div>
  );
}

function PossibilityBand3() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yFront = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const yBack = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.95]);

  return (
    <div ref={ref} className="relative py-24 sm:py-32 border-t border-foreground/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div style={{ y: yFront, scale }} className="lg:col-span-6 will-change-transform">
          <div className="font-mono-tabular text-xs text-ink-500 tracking-[0.2em] mb-4">03 · FORMAÇÃO</div>
          <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-foreground leading-[1.04]">
            Fez aquele curso.
          </h2>
        </motion.div>

        <motion.div style={{ y: yBack }} className="lg:col-span-6 relative h-52 sm:h-60 will-change-transform">
          <div className="absolute inset-x-8 top-0 h-28 rounded-2xl border border-foreground/10 bg-ink-950/80 p-5 transform -rotate-2">
            <div className="text-xs text-ink-500 font-mono-tabular">MÓDULO 01 · FUNDAMENTOS</div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-foreground/10 overflow-hidden">
              <div className="h-full w-full bg-foreground/70" />
            </div>
          </div>
          <div className="absolute inset-x-4 top-10 h-28 rounded-2xl border border-foreground/15 bg-ink-900/90 p-5 transform rotate-1">
            <div className="text-xs text-ink-400 font-mono-tabular">MÓDULO 02 · PRÁTICA GUIADA</div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-foreground/10 overflow-hidden">
              <div className="h-full w-full bg-foreground/85" />
            </div>
          </div>
          <div className="absolute inset-x-0 top-20 h-32 rounded-2xl delux-surface p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-ink-300 font-mono-tabular">MÓDULO 03 · PROJETO FINAL</span>
              <span className="text-xs text-foreground font-mono-tabular">100% CONCLUÍDO</span>
            </div>
            <div className="mt-4 h-2 w-full rounded-full bg-foreground/10 overflow-hidden">
              <div className="h-full w-full bg-foreground" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PossibilityBand4() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const ringRotate1 = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const ringRotate2 = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const xTitle = useTransform(scrollYProgress, [0, 1], [60, -50]);

  return (
    <div ref={ref} className="relative py-24 sm:py-32 border-t border-foreground/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
            <motion.div
              style={{ rotate: ringRotate1 }}
              className="absolute inset-0 rounded-full border border-foreground/25 border-dashed will-change-transform"
            />
            <motion.div
              style={{ rotate: ringRotate2 }}
              className="absolute inset-6 rounded-full border border-foreground/40 will-change-transform"
            />
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-foreground/20 to-foreground/5 border border-foreground/25 flex items-center justify-center">
              <span className="font-mono-tabular text-sm text-foreground">+1</span>
            </div>
          </div>
        </div>

        <motion.div style={{ x: xTitle }} className="lg:col-span-7 will-change-transform">
          <div className="font-mono-tabular text-xs text-ink-500 tracking-[0.2em] mb-4">04 · DOMÍNIO TÉCNICO</div>
          <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-foreground leading-[1.05] text-balance">
            Desenvolveu uma nova habilidade.
          </h2>
        </motion.div>
      </div>
    </div>
  );
}

function PossibilityBand5() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const xText = useTransform(scrollYProgress, [0, 1], [-70, 55]);
  const yChart = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <div ref={ref} className="relative py-24 sm:py-32 border-t border-foreground/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div style={{ x: xText }} className="lg:col-span-7 will-change-transform">
          <div className="font-mono-tabular text-xs text-ink-500 tracking-[0.2em] mb-4">05 · EXPANSÃO</div>
          <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-foreground leading-[1.04] text-balance">
            Começou a construir uma renda extra.
          </h2>
        </motion.div>

        <motion.div style={{ y: yChart }} className="lg:col-span-5 p-7 rounded-2xl delux-surface will-change-transform">
          <svg viewBox="0 0 360 150" className="w-full h-36 overflow-visible" aria-hidden="true">
            <defs>
              <linearGradient id="incomeArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 10 130 C 70 128, 100 105, 160 88 C 220 70, 270 40, 350 16 L 350 140 L 10 140 Z"
              fill="url(#incomeArea)"
            />
            <path
              d="M 10 130 C 70 128, 100 105, 160 88 C 220 70, 270 40, 350 16"
              fill="none"
              stroke="var(--foreground)"
              strokeWidth="2.5"
            />
            <circle cx="350" cy="16" r="5" fill="var(--foreground)" />
          </svg>
          <div className="flex items-center justify-between text-xs text-ink-400 font-mono-tabular mt-2">
            <span>PRIMEIRA OFERTA</span>
            <span className="text-foreground">TRAÇÃO CONTÍNUA</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PossibilityBand6() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const spread = useTransform(scrollYProgress, [0, 0.55], [26, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.55], [8, 0]);
  const xText = useTransform(scrollYProgress, [0, 1], [65, -45]);

  return (
    <div ref={ref} className="relative py-24 sm:py-32 border-t border-foreground/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1 grid grid-cols-3 gap-3">
          {[0, 1, 2, 3, 4, 5].map((cell) => (
            <motion.div
              key={cell}
              style={{
                y: cell % 2 === 0 ? spread : undefined,
                rotate: cell % 3 === 0 ? rotate : undefined,
              }}
              className="h-20 rounded-xl delux-surface p-3 flex flex-col justify-between will-change-transform"
            >
              <div className="w-5 h-1 rounded-full bg-foreground/70" />
              <div className="font-mono-tabular text-[11px] text-ink-400">0{cell + 1}</div>
            </motion.div>
          ))}
        </div>

        <motion.div style={{ x: xText }} className="lg:col-span-7 order-1 lg:order-2 lg:text-right will-change-transform">
          <div className="font-mono-tabular text-xs text-ink-500 tracking-[0.2em] mb-4">06 · CLAREZA</div>
          <h2 className="font-display text-5xl sm:text-7xl font-semibold tracking-tight text-foreground leading-[1.02]">
            Organizou sua vida.
          </h2>
        </motion.div>
      </div>
    </div>
  );
}

export function Scene02Possibilidades() {
  const conclusionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: conclusionRef,
    offset: ['start end', 'end start'],
  });
  const conclusionScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.03, 0.98]);
  const conclusionOpacity = useTransform(scrollYProgress, [0, 0.35, 0.85, 1], [0.25, 1, 1, 0.4]);

  return (
    <section id="possibilidades" className="relative bg-background">
      <PossibilityBand1 />
      <PossibilityBand2 />
      <PossibilityBand3 />
      <PossibilityBand4 />
      <PossibilityBand5 />
      <PossibilityBand6 />

      {/* Concluding statement */}
      <div
        ref={conclusionRef}
        className="relative py-32 sm:py-44 border-t border-foreground/10 overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 delux-spotlight opacity-80" aria-hidden="true" />
        <motion.div
          style={{ scale: conclusionScale, opacity: conclusionOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 text-center will-change-transform"
        >
          <p className="font-display text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.15] text-balance">
            E aquilo que antes existia apenas como planos começou, finalmente, a fazer parte da sua realidade.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

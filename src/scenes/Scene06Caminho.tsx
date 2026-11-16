import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const STAGES = [
  {
    word: 'ETAPAS.',
    detail: 'Seu objetivo dividido em marcos claros e alcançáveis.',
    threshold: [0.02, 0.2],
  },
  {
    word: 'MISSÕES.',
    detail: 'Ações concretas para saber exatamente o que fazer hoje.',
    threshold: [0.2, 0.4],
  },
  {
    word: 'ROTINA.',
    detail: 'Encaixado nos horários e dias reais da sua semana.',
    threshold: [0.4, 0.6],
  },
  {
    word: 'EXECUÇÃO.',
    detail: 'Um passo de cada vez, sem paralisia por excesso.',
    threshold: [0.6, 0.8],
  },
  {
    word: 'PROGRESSO.',
    detail: 'Avanço visível que se acumula dia após dia.',
    threshold: [0.8, 0.96],
  },
];

function StageRow({
  stage,
  index,
  scrollYProgress,
}: {
  stage: (typeof STAGES)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const [start, end] = stage.threshold;
  const opacity = useTransform(scrollYProgress, [Math.max(0, start - 0.12), start, end], [0.22, 1, 1]);
  const scale = useTransform(scrollYProgress, [Math.max(0, start - 0.1), start, end], [0.92, 1.04, 1]);
  const x = useTransform(scrollYProgress, [Math.max(0, start - 0.1), start], [-18, 0]);
  const dotOpacity = useTransform(scrollYProgress, [Math.max(0, start - 0.08), start], [0.25, 1]);

  return (
    <motion.div
      style={{ opacity, scale, x }}
      className="relative pl-10 sm:pl-16 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-8 will-change-transform"
    >
      {/* Anchor node on the luminous beam */}
      <motion.div
        style={{ opacity: dotOpacity }}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-foreground shadow-[0_0_20px_color-mix(in_oklab,var(--foreground)_90%,transparent)]"
      />

      <div className="flex items-baseline gap-4">
        <span className="font-mono-tabular text-xs text-ink-500">0{index + 1}</span>
        <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
          {stage.word}
        </h3>
      </div>

      <p className="text-sm sm:text-base text-ink-400 max-w-sm leading-relaxed">
        {stage.detail}
      </p>
    </motion.div>
  );
}

export function Scene06Caminho() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const beamScaleY = useTransform(scrollYProgress, [0.02, 0.92], [0.05, 1]);

  return (
    <section
      id="caminho"
      ref={sectionRef}
      className="relative h-[240vh] bg-background border-t border-foreground/10"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center px-6 sm:px-10">
        <div className="pointer-events-none absolute inset-0 delux-spotlight opacity-60" aria-hidden="true" />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="relative ml-3 sm:ml-6">
            {/* Base track line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/15" />

            {/* Luminous beam advancing with scroll */}
            <motion.div
              style={{ scaleY: beamScaleY }}
              className="absolute left-[-1px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-foreground/40 via-foreground to-foreground origin-top shadow-[0_0_24px_color-mix(in_oklab,var(--foreground)_85%,transparent)] will-change-transform"
            />

            <div className="space-y-3 sm:space-y-5">
              {STAGES.map((stage, index) => (
                <StageRow
                  key={stage.word}
                  stage={stage}
                  index={index}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const CHAIN = [
  { from: 'Sonhos', to: 'Objetivos', sentence: 'O Delux transforma sonhos em objetivos.' },
  { from: 'Objetivos', to: 'Planos', sentence: 'Objetivos em planos.' },
  { from: 'Planos', to: 'Rotina', sentence: 'Planos em rotina.' },
  { from: 'Rotina', to: 'Progresso', sentence: 'E rotina em progresso.' },
];

function ChainStep({
  item,
  index,
  scrollYProgress,
}: {
  item: (typeof CHAIN)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const start = 0.08 + index * 0.16;
  const end = start + 0.22;
  const opacity = useTransform(scrollYProgress, [Math.max(0, start - 0.1), start, end], [0.25, 1, 1]);
  const x = useTransform(scrollYProgress, [Math.max(0, start - 0.1), start], [-28, 0]);
  const lineScale = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <motion.div
      style={{ opacity, x }}
      className="relative py-7 sm:py-9 border-b border-foreground/10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center will-change-transform"
    >
      <div className="lg:col-span-5 flex items-center gap-4">
        <span className="font-mono-tabular text-xs text-ink-500">0{index + 1}</span>
        <div className="flex items-center gap-3 text-xs sm:text-sm font-mono-tabular uppercase tracking-[0.18em]">
          <span className="text-ink-500">{item.from}</span>
          <div className="w-12 h-px bg-foreground/15 relative overflow-hidden">
            <motion.div
              style={{ scaleX: lineScale }}
              className="absolute inset-0 bg-foreground origin-left"
            />
          </div>
          <span className="text-foreground font-semibold">{item.to}</span>
        </div>
      </div>

      <div className="lg:col-span-7">
        <p className="font-display text-2xl sm:text-4xl font-medium text-foreground tracking-tight leading-snug">
          {item.sentence}
        </p>
      </div>
    </motion.div>
  );
}

export function Scene11Transformacao() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      id="transformacao"
      ref={sectionRef}
      className="relative py-32 sm:py-44 bg-background border-t border-foreground/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="border-t border-foreground/10">
          {CHAIN.map((item, idx) => (
            <ChainStep
              key={item.to}
              item={item}
              index={idx}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

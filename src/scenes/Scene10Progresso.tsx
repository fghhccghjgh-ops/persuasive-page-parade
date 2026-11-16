import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MonolithStage3D } from '../components/three/MonolithStage3D';

export function Scene10Progresso() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollProgressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      scrollProgressRef.current = v;
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const wordScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.85, 1.06, 0.96]);
  const wordOpacity = useTransform(scrollYProgress, [0.05, 0.35, 0.75, 1], [0.2, 1, 1, 0.45]);
  const lineWidth = useTransform(scrollYProgress, [0.15, 0.65], ['20%', '100%']);

  return (
    <section
      id="progresso"
      ref={sectionRef}
      className="relative py-36 sm:py-52 bg-background border-t border-foreground/10 overflow-hidden"
    >
      {/* 3D Architectural Stepped Monoliths */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <MonolithStage3D scrollProgressRef={scrollProgressRef} />
      </div>

      {/* Localized Spotlight & Legibility Gradient */}
      <div className="pointer-events-none absolute inset-0 delux-spotlight z-[1]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background/35 to-background z-[1]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 text-center">
        <p className="font-display text-2xl sm:text-3xl text-ink-400 tracking-tight">
          E talvez essa seja a maior mudança:
        </p>

        <h2 className="mt-6 font-display text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.12] text-balance max-w-4xl mx-auto">
          Você para de acumular objetivos...
          <br />
          <span className="text-ink-300">e começa a acumular progresso.</span>
        </h2>

        {/* Monumental Screen-Filling Word */}
        <div className="my-16 sm:my-24 relative py-10">
          <motion.div
            style={{ width: lineWidth }}
            className="mx-auto h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent mb-8"
          />

          <motion.div
            style={{ scale: wordScale, opacity: wordOpacity }}
            className="font-display font-bold tracking-[-0.04em] leading-none text-foreground select-none will-change-transform text-[clamp(2.5rem,12.5vw,13rem)] drop-shadow-[0_0_60px_color-mix(in_oklab,var(--foreground)_22%,transparent)]"
          >
            PROGRESSO
          </motion.div>

          <motion.div
            style={{ width: lineWidth }}
            className="mx-auto h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent mt-8"
          />
        </div>

        {/* Closing Reframe */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 text-left">
          <div className="p-7 rounded-2xl border border-foreground/10 bg-background/75">
            <div className="font-mono-tabular text-xs text-ink-500">DEIXA DE PERGUNTAR:</div>
            <p className="mt-3 font-display text-2xl sm:text-3xl text-ink-400 tracking-tight">
              'Será que um dia eu consigo?'
            </p>
          </div>
          <div className="p-7 rounded-2xl border border-foreground/25 bg-ink-950/90 shadow-[0_0_50px_color-mix(in_oklab,var(--foreground)_6%,transparent)]">
            <div className="font-mono-tabular text-xs text-ink-300">E COMEÇA A PERGUNTAR:</div>
            <p className="mt-3 font-display text-2xl sm:text-3xl text-foreground font-medium tracking-tight">
              'Qual é o próximo passo?'
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

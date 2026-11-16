import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function Scene08PossibilidadesDiferentes() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sphere1Y = useTransform(scrollYProgress, [0, 1], [100, -140]);
  const sphere2Y = useTransform(scrollYProgress, [0, 1], [-80, 120]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 95]);
  const row1X = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const row2X = useTransform(scrollYProgress, [0, 1], [45, -45]);

  return (
    <section
      id="outras-possibilidades"
      ref={sectionRef}
      className="relative py-32 sm:py-48 bg-background border-t border-foreground/10 overflow-hidden"
    >
      {/* Abstract 3D-shaded architectural spheres and rings */}
      <motion.div
        style={{ y: sphere1Y }}
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-20 w-52 h-52 sm:w-72 sm:h-72 rounded-full bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.34),rgba(30,30,36,0.45)_52%,rgba(0,0,0,0.95)_85%)] border border-foreground/15 will-change-transform"
      />
      <motion.div
        style={{ y: sphere2Y, rotate: ringRotate }}
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-28 w-80 h-80 rounded-full border border-foreground/15 flex items-center justify-center will-change-transform"
      >
        <div className="w-56 h-56 rounded-full border border-foreground/10 rotate-45" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10">
        <p className="font-mono-tabular text-xs uppercase tracking-[0.22em] text-ink-500">
          Para qualquer objetivo
        </p>
        <h2 className="mt-4 font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.06] max-w-4xl text-balance">
          E isso não serve apenas para inglês.
        </h2>

        <div className="mt-20 space-y-8 sm:space-y-10">
          <motion.div
            style={{ x: row1X }}
            className="p-8 sm:p-10 rounded-3xl delux-surface max-w-3xl will-change-transform"
          >
            <span className="font-mono-tabular text-xs text-ink-500">01 · PROJETOS PESSOAIS</span>
            <p className="mt-3 font-display text-2xl sm:text-4xl font-medium text-foreground tracking-tight leading-snug">
              Serve para aquele projeto que você nunca começou.
            </p>
          </motion.div>

          <motion.div
            style={{ x: row2X }}
            className="p-8 sm:p-10 rounded-3xl delux-surface max-w-3xl ml-auto will-change-transform"
          >
            <span className="font-mono-tabular text-xs text-ink-500">02 · NOVAS COMPETÊNCIAS</span>
            <p className="mt-3 font-display text-2xl sm:text-4xl font-medium text-foreground tracking-tight leading-snug">
              Para aquela habilidade que sempre quis aprender.
            </p>
          </motion.div>

          <motion.div
            style={{ x: row1X }}
            className="p-8 sm:p-10 rounded-3xl delux-surface max-w-3xl will-change-transform"
          >
            <span className="font-mono-tabular text-xs text-ink-500">03 · TRANSFORMAÇÃO DE ROTINA</span>
            <p className="mt-3 font-display text-2xl sm:text-4xl font-medium text-foreground tracking-tight leading-snug">
              Para aquela mudança que você vem adiando.
            </p>
          </motion.div>

          <div className="pt-12 sm:pt-16 text-center max-w-4xl mx-auto">
            <p className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-[1.12] text-balance">
              Para aquela versão de você que sabe que pode existir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

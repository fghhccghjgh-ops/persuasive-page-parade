import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function Scene04Problema() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const line1X = useTransform(scrollYProgress, [0, 1], [-80, 70]);
  const line2X = useTransform(scrollYProgress, [0, 1], [90, -80]);
  const line3Scale = useTransform(scrollYProgress, [0.2, 0.55, 0.9], [0.88, 1.06, 0.95]);
  const line4Y = useTransform(scrollYProgress, [0.3, 0.85], [60, -25]);
  const orbY = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [140, -140]);

  return (
    <section
      id="problema"
      ref={sectionRef}
      className="relative py-36 sm:py-52 bg-background border-t border-foreground/10 overflow-hidden"
    >
      {/* Floating Z-depth geometric accents */}
      <motion.div
        style={{ y: orbY }}
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-24 w-72 h-72 rounded-full border border-foreground/10 bg-gradient-to-br from-foreground/[0.06] to-transparent will-change-transform"
      />
      <motion.div
        style={{ y: orb2Y }}
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 bottom-20 w-96 h-96 rounded-full border border-foreground/10 bg-gradient-to-tl from-foreground/[0.05] to-transparent will-change-transform"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 space-y-16 sm:space-y-24">
        <motion.p
          style={{ x: line1X }}
          className="font-display text-3xl sm:text-5xl lg:text-6xl font-medium text-ink-400 tracking-tight leading-[1.12] max-w-4xl will-change-transform"
        >
          Porque talvez você não tenha falta de sonhos.
        </motion.p>

        <motion.p
          style={{ x: line2X }}
          className="font-display text-3xl sm:text-5xl lg:text-6xl font-medium text-ink-200 tracking-tight leading-[1.12] max-w-4xl ml-auto lg:text-right will-change-transform"
        >
          Talvez você só não saiba por onde começar.
        </motion.p>

        <div className="pt-8 border-t border-foreground/10 space-y-8 text-center">
          <motion.p
            style={{ scale: line3Scale }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold text-foreground tracking-tight leading-[1.08] text-balance will-change-transform"
          >
            Você sabe onde quer chegar.
          </motion.p>

          <motion.p
            style={{ y: line4Y }}
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal text-ink-400 tracking-tight leading-[1.12] text-balance will-change-transform"
          >
            Mas não sabe qual é o primeiro passo.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

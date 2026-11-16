import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const HEADLINE_WORDS =
  'E se, daqui a alguns meses, você pudesse olhar para trás e perceber que finalmente começou a fazer tudo aquilo que vive dizendo que vai fazer?'.split(
    ' ',
  );

interface Scene01AberturaProps {
  onOpenCheckout: () => void;
}

export function Scene01Abertura({ onOpenCheckout }: Scene01AberturaProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const brandScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.16]);
  const brandOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.85, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.65, 0.95], [1, 0.95, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section
      id="abertura"
      ref={sectionRef}
      className="relative h-[155vh] bg-background"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-10 sm:py-12 px-6 sm:px-10 bg-background">
        {/* Top Brand Statement */}
        <motion.div
          style={{ scale: brandScale, opacity: brandOpacity }}
          className="relative z-10 max-w-6xl mx-auto w-full text-center pt-2 sm:pt-4 will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, letterSpacing: '0.42em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.32em' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-sm sm:text-base font-medium text-ink-300 uppercase"
          >
            DELUX
          </motion.div>
        </motion.div>

        {/* Progressive Typographic Headline + Primary CTA */}
        <motion.div
          style={{ y: headlineY, opacity: headlineOpacity }}
          className="relative z-10 max-w-5xl mx-auto w-full text-center my-auto will-change-transform"
        >
          <h1 className="font-display text-[clamp(1.75rem,3.6vw,3.5rem)] font-medium leading-[1.16] tracking-[-0.025em] text-foreground text-balance">
            {HEADLINE_WORDS.map((word, idx) => (
              <motion.span
                key={`${word}-${idx}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.04 + idx * 0.02,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-[0.26em] will-change-transform"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 sm:mt-12 flex justify-center"
          >
            <button
              type="button"
              onClick={onOpenCheckout}
              className="py-4 px-9 rounded-full bg-foreground text-background font-display font-semibold text-sm sm:text-base tracking-[0.14em] uppercase inline-flex items-center justify-center gap-3 hover:bg-ink-200 active:scale-[0.985] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            >
              <span>QUERO COMEÇAR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="relative z-10 flex flex-col items-center gap-2 text-ink-400"
        >
          <span className="text-[11px] tracking-[0.26em] uppercase">Role para descobrir</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-ink-300" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

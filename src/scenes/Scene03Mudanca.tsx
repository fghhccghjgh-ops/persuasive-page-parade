import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const DISPERSED_NODES = [
  { label: 'Ideias soltas', startLeft: '12%', startTop: '14%', endLeft: '10%', endTop: '50%' },
  { label: 'Falta de clareza', startLeft: '82%', startTop: '12%', endLeft: '30%', endTop: '50%' },
  { label: 'Adiar para segunda', startLeft: '16%', startTop: '84%', endLeft: '50%', endTop: '50%' },
  { label: 'Excesso de planos', startLeft: '86%', startTop: '82%', endLeft: '70%', endTop: '50%' },
  { label: 'Direção prática', startLeft: '52%', startTop: '92%', endLeft: '90%', endTop: '50%' },
];

function ConvergingNode({
  node,
  index,
  scrollYProgress,
}: {
  node: (typeof DISPERSED_NODES)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const left = useTransform(scrollYProgress, [0.05, 0.72], [node.startLeft, node.endLeft]);
  const top = useTransform(scrollYProgress, [0.05, 0.72], [node.startTop, node.endTop]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75], [0.35, 0.85, 1]);
  const scale = useTransform(scrollYProgress, [0.05, 0.72], [0.82, 1]);

  return (
    <motion.div
      style={{ left, top, opacity, scale }}
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 will-change-transform"
    >
      <div className="w-3.5 h-3.5 rounded-full bg-foreground shadow-[0_0_24px_color-mix(in_oklab,var(--foreground)_85%,transparent)]" />
      <span className="font-mono-tabular text-[11px] text-ink-400 whitespace-nowrap">
        0{index + 1}
      </span>
    </motion.div>
  );
}

export function Scene03Mudanca() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const pathScaleX = useTransform(scrollYProgress, [0.35, 0.8], [0, 1]);
  const pathOpacity = useTransform(scrollYProgress, [0.3, 0.65], [0, 1]);
  const title1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.45], [0.4, 1, 0.35]);
  const title2Opacity = useTransform(scrollYProgress, [0.35, 0.65, 1], [0.25, 1, 1]);
  const title2Y = useTransform(scrollYProgress, [0.35, 0.7], [32, 0]);

  return (
    <section
      id="mudanca"
      ref={sectionRef}
      className="relative h-[200vh] bg-background border-t border-foreground/10"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center px-6 sm:px-10">
        <div className="pointer-events-none absolute inset-0 delux-spotlight opacity-70" aria-hidden="true" />

        {/* Copy Top */}
        <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-6">
          <motion.p
            style={{ opacity: title1Opacity }}
            className="font-display text-2xl sm:text-4xl lg:text-5xl font-normal text-ink-300 tracking-tight text-balance will-change-transform"
          >
            Não porque você ficou mais motivado.
          </motion.p>

          {/* Responsive Convergence Arena */}
          <div className="relative h-48 sm:h-56 w-full max-w-2xl mx-auto my-6">
            {/* Converged horizontal luminous path */}
            <motion.div
              style={{ scaleX: pathScaleX, opacity: pathOpacity }}
              className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-foreground/25 via-foreground to-foreground/25 origin-center shadow-[0_0_25px_color-mix(in_oklab,var(--foreground)_60%,transparent)] will-change-transform"
            />

            {DISPERSED_NODES.map((node, index) => (
              <ConvergingNode
                key={node.label}
                node={node}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          <motion.h2
            style={{ opacity: title2Opacity, y: title2Y }}
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-[1.12] text-balance will-change-transform"
          >
            Mas porque finalmente descobriu como transformar aquilo que quer em um caminho que consegue seguir.
          </motion.h2>
        </div>
      </div>
    </section>
  );
}

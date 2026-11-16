import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Compass, Layers, Target } from 'lucide-react';

export function Scene05Delux() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const panelLeftY = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const panelCenterY = useTransform(scrollYProgress, [0, 1], [40, -50]);
  const panelRightY = useTransform(scrollYProgress, [0, 1], [130, -110]);
  const panelLeftRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-8, -2, 3]);
  const panelRightRotate = useTransform(scrollYProgress, [0, 0.5, 1], [8, 2, -3]);

  return (
    <section
      id="delux"
      ref={sectionRef}
      className="relative py-32 sm:py-44 bg-background border-t border-foreground/10 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 delux-spotlight opacity-90" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.06] text-balance">
            E é exatamente aí que o Delux entra.
          </h2>
          <p className="mt-8 text-lg sm:text-2xl text-ink-300 leading-relaxed text-balance max-w-3xl mx-auto">
            Você conta onde quer chegar.
            <br />
            O Delux entende onde você está, considera sua realidade e transforma seu objetivo em um caminho prático.
          </p>
        </div>

        {/* Multi-plane 3D Perspective Floating Panels (Demonstrative only, not full dashboard) */}
        <div
          className="mt-20 sm:mt-28 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-center"
          style={{ perspective: '1200px' }}
        >
          {/* Plane 1: Objetivo declarado */}
          <motion.div
            style={{ y: panelLeftY, rotateY: panelLeftRotate }}
            className="rounded-3xl delux-surface p-7 sm:p-8 shadow-2xl will-change-transform"
          >
            <div className="flex items-center justify-between text-xs text-ink-400 font-mono-tabular">
              <span>01 · SEU DESTINO</span>
              <Target className="w-4 h-4 text-ink-300" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-medium text-foreground mt-5">
              Onde você quer chegar
            </h3>
            <div className="mt-6 p-4 rounded-2xl bg-background/60 border border-foreground/10">
              <p className="text-sm text-ink-200 leading-relaxed">
                "Quero construir uma rotina sólida de inglês e falar com segurança no trabalho."
              </p>
            </div>
            <div className="mt-5 flex items-center justify-between text-xs text-ink-500 font-mono-tabular">
              <span>PONTO DE PARTIDA</span>
              <span className="text-ink-300">Iniciante prático</span>
            </div>
          </motion.div>

          {/* Plane 2: Calibragem de realidade (elevated focal plane) */}
          <motion.div
            style={{ y: panelCenterY }}
            className="rounded-3xl bg-gradient-to-b from-ink-900 to-background border border-foreground/25 p-8 sm:p-9 shadow-[0_30px_90px_color-mix(in_oklab,var(--foreground)_8%,transparent)] will-change-transform"
          >
            <div className="flex items-center justify-between text-xs text-ink-300 font-mono-tabular">
              <span>02 · SUA REALIDADE</span>
              <Compass className="w-4 h-4 text-foreground" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground mt-5">
              Calibrado para o seu tempo
            </h3>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between py-2.5 border-b border-foreground/10 text-sm">
                <span className="text-ink-400">Tempo disponível</span>
                <span className="font-mono-tabular text-foreground">25 min / dia</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-foreground/10 text-sm">
                <span className="text-ink-400">Ritmo semanal</span>
                <span className="font-mono-tabular text-foreground">4 dias flexíveis</span>
              </div>
              <div className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-ink-400">Nível atual</span>
                <span className="font-mono-tabular text-foreground">Leitura básica</span>
              </div>
            </div>
          </motion.div>

          {/* Plane 3: Caminho prático */}
          <motion.div
            style={{ y: panelRightY, rotateY: panelRightRotate }}
            className="rounded-3xl delux-surface p-7 sm:p-8 shadow-2xl will-change-transform"
          >
            <div className="flex items-center justify-between text-xs text-ink-400 font-mono-tabular">
              <span>03 · CAMINHO PRÁTICO</span>
              <Layers className="w-4 h-4 text-ink-300" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-medium text-foreground mt-5">
              Próximo passo imediato
            </h3>
            <div className="mt-6 space-y-2.5">
              {[
                { step: 'Etapa 01', text: 'Vocabulário de reunião (12 dias)' },
                { step: 'Missão', text: 'Ouvir e repetir 8 frases-chave hoje' },
                { step: 'Rotina', text: 'Bloco protegido às 07:30' },
              ].map((row) => (
                <div
                  key={row.step}
                  className="p-3.5 rounded-xl bg-background/55 border border-foreground/10 flex items-center justify-between gap-3"
                >
                  <span className="font-mono-tabular text-[11px] text-ink-400 shrink-0">{row.step}</span>
                  <span className="text-xs sm:text-sm text-ink-100 text-right">{row.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

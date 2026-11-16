import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, CheckCircle2, Compass, PlayCircle } from 'lucide-react';

const DEMO_PHASES = [
  {
    id: 'what',
    label: 'O que estudar',
    etapa: 'Etapa 01 · Base Auditiva & Frases Reais',
    missao: 'Assistir a 1 diálogo curto (4 min) identificando 6 expressões do cotidiano.',
    rotina: 'Seg, Qua e Sex · 20 minutos pela manhã',
  },
  {
    id: 'how',
    label: 'Como começar',
    etapa: 'Etapa 02 · Produção Guiada sem Travar',
    missao: 'Gravar 3 áudios de 30 segundos respondendo perguntas simples em voz alta.',
    rotina: 'Ter e Qui · 15 minutos no intervalo',
  },
  {
    id: 'next',
    label: 'Próximo passo',
    etapa: 'Etapa 03 · Conversação Aplicada',
    missao: 'Revisar os 10 termos errados da semana e simular 1 situação real.',
    rotina: 'Sábado · Sessão de consolidação de 25 min',
  },
];

export function Scene07Demonstracao() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedPhase, setSelectedPhase] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const vagueX = useTransform(scrollYProgress, [0.1, 0.55], [0, -24]);
  const vagueOpacity = useTransform(scrollYProgress, [0.1, 0.55], [1, 0.52]);
  const deluxY = useTransform(scrollYProgress, [0.1, 0.55], [60, 0]);
  const deluxScale = useTransform(scrollYProgress, [0.15, 0.6], [0.94, 1]);

  const active = DEMO_PHASES[selectedPhase];

  return (
    <section
      id="demonstracao"
      ref={sectionRef}
      className="relative py-32 sm:py-44 bg-background border-t border-foreground/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="max-w-4xl">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.08] text-balance">
            Imagine que você queira aprender inglês.
          </h2>
          <p className="mt-8 text-lg sm:text-2xl text-ink-400 leading-relaxed max-w-3xl">
            Em vez de simplesmente criar uma tarefa dizendo:
            <br />
            <span className="text-ink-200 font-medium">
              'Estudar inglês por 30 minutos.'
            </span>
          </p>
        </div>

        {/* Transformation Stage: Flat Task -> Structured DELUX Path */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Before: Vague Flat Task */}
          <motion.div
            style={{ x: vagueX, opacity: vagueOpacity }}
            className="lg:col-span-4 rounded-3xl border border-foreground/10 bg-ink-950 p-7 sm:p-8 flex flex-col justify-between will-change-transform"
          >
            <div>
              <div className="font-mono-tabular text-xs text-ink-500 uppercase tracking-[0.18em]">
                Lista genérica
              </div>
              <div className="mt-6 p-4 rounded-xl border border-foreground/10 bg-background/70 flex items-center gap-3">
                <div className="w-4 h-4 rounded border border-ink-600 shrink-0" />
                <span className="text-sm text-ink-400 line-through decoration-ink-600">
                  Estudar inglês por 30 minutos.
                </span>
              </div>
            </div>
            <p className="mt-8 text-sm text-ink-500 leading-relaxed">
              Sem clareza de por onde começar, você abre o aplicativo, olha a tarefa e deixa para depois.
            </p>
          </motion.div>

          {/* Arrow Transition */}
          <div className="lg:col-span-1 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border border-foreground/15 flex items-center justify-center text-ink-300 rotate-90 lg:rotate-0">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* After: DELUX Structured Interactive Breakdown */}
          <motion.div
            style={{ y: deluxY, scale: deluxScale }}
            className="lg:col-span-7 rounded-3xl delux-surface p-6 sm:p-9 shadow-[0_30px_90px_color-mix(in_oklab,var(--foreground)_6%,transparent)] overflow-hidden will-change-transform"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-foreground/10 pb-5">
              <div>
                <div className="font-mono-tabular text-xs text-ink-400 tracking-[0.18em] uppercase">
                  DELUX · OBJETIVO TRANSFORMADO
                </div>
                <div className="font-display text-xl sm:text-2xl font-medium text-foreground mt-1">
                  Aprender Inglês na Prática
                </div>
              </div>

              {/* Interactive Inspector Tabs */}
              <div className="w-full sm:w-auto grid grid-cols-3 sm:flex items-center gap-1 p-1 rounded-xl bg-background/70 border border-foreground/10">
                {DEMO_PHASES.map((phase, idx) => (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() => setSelectedPhase(idx)}
                    className={`px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-colors text-center truncate cursor-pointer ${
                      selectedPhase === idx
                        ? 'bg-foreground text-background'
                        : 'text-ink-400 hover:text-foreground'
                    }`}
                  >
                    {phase.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="p-4 rounded-2xl bg-background/55 border border-foreground/10">
                <div className="flex items-center gap-2 text-xs text-ink-400 font-mono-tabular">
                  <Compass className="w-3.5 h-3.5 text-foreground" />
                  <span>ETAPA ATIVA</span>
                </div>
                <div className="mt-1.5 text-base sm:text-lg font-medium text-foreground">
                  {active.etapa}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-foreground/[0.06] border border-foreground/20">
                <div className="flex items-center gap-2 text-xs text-ink-300 font-mono-tabular">
                  <PlayCircle className="w-3.5 h-3.5 text-foreground" />
                  <span>MISSÃO DE HOJE</span>
                </div>
                <div className="mt-1.5 text-base sm:text-lg font-medium text-foreground">
                  {active.missao}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-background/55 border border-foreground/10 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-ink-400 font-mono-tabular">
                    <CheckCircle2 className="w-3.5 h-3.5 text-ink-300" />
                    <span>ROTINA SUGERIDA</span>
                  </div>
                  <div className="mt-1 text-sm sm:text-base text-ink-200">{active.rotina}</div>
                </div>
                <span className="font-mono-tabular text-xs text-ink-400 shrink-0">
                  0{selectedPhase + 1} / 03
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <p className="mt-14 font-display text-2xl sm:text-4xl font-medium text-foreground tracking-tight leading-[1.2] max-w-4xl text-balance">
          O Delux ajuda você a descobrir o que estudar, como começar e qual deve ser o próximo passo.
        </p>
      </div>
    </section>
  );
}

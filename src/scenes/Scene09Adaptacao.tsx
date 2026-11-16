import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { RefreshCw } from 'lucide-react';

type RoutineMode = 'normal' | 'missed' | 'short';

const SCHEDULE_STATES: Record<
  RoutineMode,
  {
    label: string;
    note: string;
    days: { day: string; title: string; duration: string; status: 'done' | 'adapted' | 'active' }[];
  }
> = {
  normal: {
    label: 'Rotina Padrão',
    note: 'Semana equilibrada · 4 missões distribuídas',
    days: [
      { day: 'SEG', title: 'Missão 01 · Base prática', duration: '25 min', status: 'done' },
      { day: 'TER', title: 'Descanso estratégico', duration: '—', status: 'active' },
      { day: 'QUA', title: 'Missão 02 · Exercício guiado', duration: '25 min', status: 'active' },
      { day: 'QUI', title: 'Descanso estratégico', duration: '—', status: 'active' },
      { day: 'SEX', title: 'Missão 03 · Revisão ativa', duration: '25 min', status: 'active' },
      { day: 'SÁB', title: 'Missão 04 · Consolidação', duration: '30 min', status: 'active' },
    ],
  },
  missed: {
    label: 'Perdi um dia',
    note: 'Quarta foi reorganizada automaticamente sem perda de ritmo',
    days: [
      { day: 'SEG', title: 'Missão 01 · Base prática', duration: '25 min', status: 'done' },
      { day: 'TER', title: 'Descanso estratégico', duration: '—', status: 'active' },
      { day: 'QUA', title: 'Dia imprevisto · Realocado', duration: '0 min', status: 'adapted' },
      { day: 'QUI', title: 'Missão 02 · Movida para hoje', duration: '20 min', status: 'adapted' },
      { day: 'SEX', title: 'Missão 03 · Revisão enxuta', duration: '20 min', status: 'active' },
      { day: 'SÁB', title: 'Missão 04 · Consolidação', duration: '25 min', status: 'active' },
    ],
  },
  short: {
    label: 'Menos tempo (15 min)',
    note: 'Missões comprimidas para manter a continuidade mesmo em dias corridos',
    days: [
      { day: 'SEG', title: 'Missão 01 · Micro-bloco essencial', duration: '15 min', status: 'done' },
      { day: 'TER', title: 'Prática rápida de reforço', duration: '10 min', status: 'adapted' },
      { day: 'QUA', title: 'Missão 02 · Núcleo prático', duration: '15 min', status: 'adapted' },
      { day: 'QUI', title: 'Prática rápida de reforço', duration: '10 min', status: 'adapted' },
      { day: 'SEX', title: 'Missão 03 · Checagem de avanço', duration: '15 min', status: 'active' },
      { day: 'SÁB', title: 'Missão 04 · Síntese semanal', duration: '15 min', status: 'active' },
    ],
  },
};

export function Scene09Adaptacao() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [mode, setMode] = useState<RoutineMode>('missed');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [50, -45]);

  const current = SCHEDULE_STATES[mode];

  return (
    <section
      id="adaptacao"
      ref={sectionRef}
      className="relative py-32 sm:py-44 bg-background border-t border-foreground/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
        {/* Left Copy */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.08] text-balance">
            E quando sua rotina mudar?
          </h2>
          <div className="space-y-3 text-xl sm:text-2xl text-ink-400 leading-relaxed">
            <p>Você perder um dia?</p>
            <p>Tiver menos tempo?</p>
            <p className="text-foreground font-medium pt-2">O caminho pode se adaptar.</p>
          </div>
          <p className="pt-4 text-lg sm:text-xl text-ink-300 leading-relaxed border-t border-foreground/10">
            Porque você não precisa fazer tudo perfeitamente.
            <br />
            <span className="text-foreground font-medium">Você só precisa continuar avançando.</span>
          </p>
        </div>

        {/* Right Interactive + Scroll-Adaptive Schedule */}
        <motion.div
          style={{ y: cardY }}
          className="lg:col-span-7 rounded-3xl delux-surface p-6 sm:p-8 will-change-transform"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-foreground/10">
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-ink-300">
              <RefreshCw className="w-3.5 h-3.5 text-foreground" />
              <span>AGENDA ADAPTATIVA</span>
            </div>

            <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-background/70 border border-foreground/10">
              {(['normal', 'missed', 'short'] as RoutineMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    mode === m ? 'bg-foreground text-background' : 'text-ink-400 hover:text-foreground'
                  }`}
                >
                  {SCHEDULE_STATES[m].label}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-ink-400">{current.note}</p>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {current.days.map((item, idx) => (
              <motion.div
                key={`${mode}-${item.day}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
                className={`p-4 rounded-2xl border transition-colors ${
                  item.status === 'adapted'
                    ? 'bg-foreground/[0.08] border-foreground/30'
                    : item.status === 'done'
                    ? 'bg-foreground/[0.04] border-foreground/15'
                    : 'bg-background/50 border-foreground/10'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono-tabular">
                  <span className="text-ink-400">{item.day}</span>
                  <span className={item.status === 'adapted' ? 'text-foreground' : 'text-ink-500'}>
                    {item.duration}
                  </span>
                </div>
                <div className="mt-2 text-sm font-medium text-foreground">{item.title}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

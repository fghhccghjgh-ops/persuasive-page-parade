import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface Scene12OfertaProps {
  onOpenCheckout: () => void;
}

const BENEFITS = [
  {
    title: 'Planos personalizados',
    description: 'Transforme seus objetivos em um caminho claro.',
  },
  {
    title: 'Missões práticas',
    description: 'Saiba exatamente o que fazer para avançar.',
  },
  {
    title: 'Progresso acompanhado',
    description: 'Organize sua rotina e acompanhe sua evolução.',
  },
];

function formatBRL(value: number): string {
  return value.toFixed(2).replace('.', ',');
}

export function Scene12Oferta({ onOpenCheckout }: Scene12OfertaProps) {
  const priceRef = useRef<HTMLDivElement | null>(null);
  const [displayPrice, setDisplayPrice] = useState(65.5);
  const [settled, setSettled] = useState(false);
  const hasPlayedInCurrentVisitRef = useRef(false);

  useEffect(() => {
    const el = priceRef.current;
    if (!el) return;

    let rafId = 0;
    let delayId = 0;

    const startCountdown = () => {
      if (hasPlayedInCurrentVisitRef.current) return;
      hasPlayedInCurrentVisitRef.current = true;

      cancelAnimationFrame(rafId);
      window.clearTimeout(delayId);
      setSettled(false);
      setDisplayPrice(65.5);

      // Brief pause so the eye clearly registers R$ 65,50 before dropping to R$ 29,90
      delayId = window.setTimeout(() => {
        const startValue = 65.5;
        const endValue = 29.9;
        const duration = 1600;
        const startTime = performance.now();

        const step = (now: number) => {
          const elapsed = now - startTime;
          const t = Math.min(1, elapsed / duration);
          const eased = 1 - Math.pow(1 - t, 2.5);
          setDisplayPrice(startValue + (endValue - startValue) * eased);

          if (t < 1) {
            rafId = requestAnimationFrame(step);
          } else {
            setDisplayPrice(endValue);
            setSettled(true);
          }
        };

        rafId = requestAnimationFrame(step);
      }, 350);
    };

    // Trigger when price reaches upper 72% of viewport (clear reading zone)
    const triggerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCountdown();
        }
      },
      { rootMargin: '0px 0px -28% 0px', threshold: 0.1 },
    );

    // Reset only when completely off-screen so scrolling back replays cleanly
    const resetObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          hasPlayedInCurrentVisitRef.current = false;
          cancelAnimationFrame(rafId);
          window.clearTimeout(delayId);
          setSettled(false);
          setDisplayPrice(65.5);
        }
      },
      { threshold: 0 },
    );

    triggerObserver.observe(el);
    resetObserver.observe(el);

    return () => {
      triggerObserver.disconnect();
      resetObserver.disconnect();
      cancelAnimationFrame(rafId);
      window.clearTimeout(delayId);
    };
  }, []);

  return (
    <section
      id="oferta"
      className="relative py-32 sm:py-44 bg-background border-t border-foreground/10 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 delux-spotlight" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.06] text-balance">
            Seu próximo passo começa aqui.
          </h2>

          <p className="mt-6 text-lg sm:text-2xl text-ink-300 leading-relaxed max-w-2xl mx-auto text-balance">
            Por R$ 29,90, em um único pagamento, você garante acesso vitalício ao Delux.
          </p>
        </motion.div>

        <div className="mt-14 rounded-[2rem] delux-surface p-8 sm:p-12 max-w-xl mx-auto shadow-[0_30px_110px_rgba(255,255,255,0.09)]">
          <div className="font-mono-tabular text-xs uppercase tracking-[0.24em] text-ink-400">
            DELUX · ACESSO VITALÍCIO
          </div>

          <div
            ref={priceRef}
            className={`mt-6 font-display tabular-nums text-5xl sm:text-7xl font-semibold tracking-tight transition-transform duration-200 will-change-transform ${
              settled ? 'text-foreground scale-100' : 'text-ink-200 scale-[1.03]'
            }`}
          >
            R$ {formatBRL(displayPrice)}
          </div>

          <p className="mt-3 text-base sm:text-lg text-ink-200 font-medium">
            Um único pagamento. Acesso vitalício.
          </p>

          <ul className="mt-8 pt-8 border-t border-foreground/10 space-y-5 text-left">
            {BENEFITS.map((item) => (
              <li key={item.title} className="flex items-start gap-3.5">
                <Check className="w-4 h-4 text-foreground shrink-0 mt-1" />
                <div>
                  <div className="text-sm sm:text-base font-medium text-foreground">
                    {item.title}
                  </div>
                  <div className="text-sm text-ink-400 mt-0.5 leading-relaxed">
                    {item.description}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onOpenCheckout}
            className="mt-9 w-full py-4 sm:py-5 px-8 rounded-full bg-foreground text-background font-display font-semibold text-sm sm:text-base tracking-[0.14em] uppercase flex items-center justify-center gap-3 hover:bg-ink-200 active:scale-[0.985] transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            <span>QUERO COMEÇAR</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="mt-4 text-xs sm:text-sm text-ink-400">
            Sem mensalidade. Sem cobranças recorrentes.
          </p>
        </div>
      </div>
    </section>
  );
}

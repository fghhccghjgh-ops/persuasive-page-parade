import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface Scene13EncerramentoProps {
  onOpenCheckout: () => void;
  onNavigateApp: () => void;
}

export function Scene13Encerramento({
  onOpenCheckout,
  onNavigateApp,
}: Scene13EncerramentoProps) {
  return (
    <section
      id="encerramento"
      className="relative pt-32 pb-20 sm:pt-44 sm:pb-24 bg-background border-t border-foreground/10 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 delux-spotlight opacity-70" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 font-display text-2xl sm:text-4xl font-medium text-ink-200 tracking-tight leading-snug"
        >
          <p>Você não precisa mudar sua vida inteira amanhã.</p>
          <p className="text-ink-400">Não precisa saber todos os passos.</p>
          <p className="text-foreground font-semibold">Só precisa começar.</p>
        </motion.div>

        <div className="py-10 border-y border-foreground/10 space-y-8">
          <div className="space-y-2">
            <p className="text-lg sm:text-2xl text-ink-400">
              Porque daqui a seis meses, você pode continuar dizendo:
            </p>
            <p className="font-display text-2xl sm:text-4xl text-ink-500">
              'Eu preciso começar.'
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-lg sm:text-2xl text-ink-300">
              Ou pode olhar para trás e dizer:
            </p>
            <p className="font-display text-3xl sm:text-5xl font-semibold text-foreground">
              'Ainda bem que eu comecei.'
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-display text-2xl sm:text-4xl text-ink-300 tracking-tight text-balance">
            A vida que você quer não começa quando tudo estiver perfeito.
          </p>
          <p className="font-display text-3xl sm:text-5xl font-semibold text-foreground tracking-tight">
            Ela começa com o próximo passo.
          </p>
        </div>

        {/* Final DELUX Brand & CTA Lockup */}
        <div className="pt-14 space-y-8">
          <div className="font-display text-5xl sm:text-7xl font-semibold tracking-[0.28em] text-foreground">
            DELUX
          </div>

          <div>
            <button
              type="button"
              onClick={onOpenCheckout}
              className="py-4 sm:py-5 px-10 rounded-full bg-foreground text-background font-display font-semibold text-sm sm:text-base tracking-[0.14em] uppercase inline-flex items-center justify-center gap-3 hover:bg-ink-200 active:scale-[0.985] transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            >
              <span>QUERO COMEÇAR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quiet Minimal Footer with Discreet /app Route Link */}
        <footer className="pt-20 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-500">
          <span>DELUX · Acesso vitalício</span>
          <button
            type="button"
            onClick={onNavigateApp}
            className="text-ink-400 hover:text-foreground transition-colors underline underline-offset-4 cursor-pointer"
          >
            Já tem acesso? Abrir aplicativo DELUX
          </button>
        </footer>
      </div>
    </section>
  );
}

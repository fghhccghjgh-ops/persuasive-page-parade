import { ArrowRight, Check, ExternalLink, Lock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { CHECKOUT_CONFIG, hasExternalCheckout } from '../config/checkout';

interface CheckoutDrawerProps {
  open: boolean;
  onClose: () => void;
  onNavigateApp: () => void;
}

export function CheckoutDrawer({ open, onClose, onNavigateApp }: CheckoutDrawerProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);

  const externalConfigured = hasExternalCheckout();

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (externalConfigured) {
      window.location.assign(CHECKOUT_CONFIG.officialCheckoutUrl);
      return;
    }

    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Informe seu nome e um e-mail válido para continuar.');
      return;
    }

    try {
      localStorage.setItem(
        'delux_member_access',
        JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          activatedAt: new Date().toISOString(),
        }),
      );
    } catch {
      // Ignore storage failures
    }
    setCompleted(true);
  };

  const handleEnterApp = () => {
    setCompleted(false);
    onClose();
    onNavigateApp();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-title"
        >
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg rounded-3xl delux-surface p-6 sm:p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar janela"
              className="absolute top-5 right-5 w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center text-ink-400 hover:text-foreground hover:border-foreground/30 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!completed ? (
              <div>
                <p className="text-xs tracking-[0.22em] uppercase text-ink-400 font-medium">
                  Acesso Vitalício
                </p>
                <h2
                  id="checkout-title"
                  className="font-display text-2xl sm:text-3xl font-semibold text-foreground mt-2 tracking-tight"
                >
                  {CHECKOUT_CONFIG.productName}
                </h2>
                <p className="text-sm text-ink-400 mt-2 leading-relaxed">
                  Por R$ 29,90, em um único pagamento, você garante acesso vitalício ao Delux.
                </p>

                <div className="mt-6 p-5 rounded-2xl bg-foreground/[0.03] border border-foreground/10 flex items-baseline justify-between">
                  <div>
                    <div className="text-sm text-ink-300 font-medium">
                      {CHECKOUT_CONFIG.paymentType}
                    </div>
                    <div className="text-xs text-ink-500 mt-1">
                      Sem mensalidade · Sem cobrança recorrente
                    </div>
                  </div>
                  <div className="font-display font-mono-tabular text-2xl sm:text-3xl font-semibold text-foreground">
                    {CHECKOUT_CONFIG.priceFormatted}
                  </div>
                </div>

                {externalConfigured ? (
                  <div className="mt-6 space-y-4">
                    <a
                      href={CHECKOUT_CONFIG.officialCheckoutUrl}
                      className="w-full py-4 px-6 rounded-full bg-foreground text-background font-semibold text-sm tracking-[0.12em] uppercase flex items-center justify-center gap-2 hover:bg-ink-200 transition-colors"
                    >
                      <span>Ir para o pagamento seguro</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleConfirm} className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="checkout-name" className="block text-xs text-ink-400 mb-1.5">
                        Seu nome
                      </label>
                      <input
                        id="checkout-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Como devemos chamar você"
                        className="w-full px-4 py-3 rounded-xl bg-background/60 border border-foreground/15 text-sm text-foreground placeholder:text-ink-600 focus:outline-none focus:border-foreground/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="checkout-email" className="block text-xs text-ink-400 mb-1.5">
                        Seu melhor e-mail
                      </label>
                      <input
                        id="checkout-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="voce@exemplo.com"
                        className="w-full px-4 py-3 rounded-xl bg-background/60 border border-foreground/15 text-sm text-foreground placeholder:text-ink-600 focus:outline-none focus:border-foreground/50 transition-colors"
                      />
                    </div>

                    {error && (
                      <p className="text-xs text-destructive" role="alert">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-full bg-foreground text-background font-semibold text-sm tracking-[0.12em] uppercase flex items-center justify-center gap-2 hover:bg-ink-200 active:scale-[0.99] transition-all cursor-pointer"
                    >
                      <span>QUERO COMEÇAR — R$ 29,90</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs text-ink-500 pt-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Pagamento único · Liberação imediata na plataforma</span>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <div className="py-4 text-center">
                <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mt-5">
                  Acesso vitalício liberado
                </h3>
                <p className="text-sm text-ink-400 mt-2 max-w-sm mx-auto leading-relaxed">
                  Seu primeiro caminho já está pronto para ser desenhado dentro do DELUX.
                </p>
                <button
                  type="button"
                  onClick={handleEnterApp}
                  className="mt-7 w-full py-4 px-6 rounded-full bg-foreground text-background font-semibold text-sm tracking-[0.12em] uppercase flex items-center justify-center gap-2 hover:bg-ink-200 transition-colors cursor-pointer"
                >
                  <span>Abrir aplicativo DELUX</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

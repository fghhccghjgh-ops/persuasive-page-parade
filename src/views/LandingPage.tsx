import { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { CheckoutDrawer } from '../components/CheckoutDrawer';
import { CHECKOUT_CONFIG, hasExternalCheckout } from '../config/checkout';
import { Scene01Abertura } from '../scenes/Scene01Abertura';
import { Scene02Possibilidades } from '../scenes/Scene02Possibilidades';
import { Scene03Mudanca } from '../scenes/Scene03Mudanca';
import { Scene04Problema } from '../scenes/Scene04Problema';
import { Scene05Delux } from '../scenes/Scene05Delux';
import { Scene06Caminho } from '../scenes/Scene06Caminho';
import { Scene07Demonstracao } from '../scenes/Scene07Demonstracao';
import { Scene08PossibilidadesDiferentes } from '../scenes/Scene08PossibilidadesDiferentes';
import { Scene09Adaptacao } from '../scenes/Scene09Adaptacao';
import { Scene10Progresso } from '../scenes/Scene10Progresso';
import { Scene11Transformacao } from '../scenes/Scene11Transformacao';
import { Scene12Oferta } from '../scenes/Scene12Oferta';
import { Scene13Encerramento } from '../scenes/Scene13Encerramento';

interface LandingPageProps {
  onNavigateApp: () => void;
}

export function LandingPage({ onNavigateApp }: LandingPageProps) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  const handleOpenCheckout = () => {
    if (hasExternalCheckout()) {
      window.location.assign(CHECKOUT_CONFIG.officialCheckoutUrl);
      return;
    }
    setCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      {/* Continuous Scroll Storytelling Progress Hairline */}
      <motion.div
        style={{ scaleX: smoothProgress }}
        className="fixed top-0 left-0 right-0 h-[1.5px] bg-foreground/85 origin-left z-40 pointer-events-none"
        aria-hidden="true"
      />

      <main>
        <Scene01Abertura onOpenCheckout={handleOpenCheckout} />
        <Scene02Possibilidades />
        <Scene03Mudanca />
        <Scene04Problema />
        <Scene05Delux />
        <Scene06Caminho />
        <Scene07Demonstracao />
        <Scene08PossibilidadesDiferentes />
        <Scene09Adaptacao />
        <Scene10Progresso />
        <Scene11Transformacao />
        <Scene12Oferta onOpenCheckout={handleOpenCheckout} />
        <Scene13Encerramento
          onOpenCheckout={handleOpenCheckout}
          onNavigateApp={onNavigateApp}
        />
      </main>

      <CheckoutDrawer
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onNavigateApp={onNavigateApp}
      />
    </div>
  );
}

export const CHECKOUT_CONFIG = {
  // Configure VITE_CHECKOUT_URL in environment variables to point directly
  // to your official payment provider (Stripe, Hotmart, Kiwify, Cakto, etc.).
  officialCheckoutUrl:
    (import.meta.env['VITE_CHECKOUT_URL'] as string | undefined)?.trim() ||
    'https://pay.cakto.com.br/dc75utp_1332959',
  productName: 'DELUX — Acesso Vitalício',
  priceFormatted: 'R$ 29,90',
  paymentType: 'Pagamento único. Acesso vitalício.',
};

export function hasExternalCheckout(): boolean {
  return Boolean(CHECKOUT_CONFIG.officialCheckoutUrl);
}

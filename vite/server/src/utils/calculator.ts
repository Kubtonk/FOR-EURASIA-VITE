const BASE_PRICE = 5_000_000;
const MODIFICATIONS: Record<string, number> = {
  "Жатка зерновая": 800_000,
  "Жатка кукурузная": 950_000,
  "Система GPS-навигации": 300_000,
  "Датчики урожайности": 150_000,
  "Увеличенный бункер": 500_000
};

const VAT_RATE = 0.20;

export function calculate(modifications: string[]) {
  const modificationsPrice = modifications.reduce((sum, name) => {
    return sum + (MODIFICATIONS[name] || 0);
  }, 0);

  const subtotal = BASE_PRICE + modificationsPrice;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;

  return {
    basePrice: BASE_PRICE,
    modificationsPrice,
    subtotal,
    vat,
    total
  };
}

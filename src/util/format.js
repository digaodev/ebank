export const { format: formatPrice } = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
});

export const convertFromCents = amount => (amount / 100).toFixed(2);

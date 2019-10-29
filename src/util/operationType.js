const OpTypesEnum = Object.freeze({
  SENT_TRANSFERENCE: 'Transferência Enviada',
  RECEIVED_TRANSFERENCE: 'Transferência Recebida',
  BANK_SLIP_DEPOSIT: 'Depósito de Boleto',
  BANK_SLIP_PAYMENT: 'Pagamento de Boleto',
  BANK_DEPOSIT: 'Depósito Bancário',
  ECARD_CHARGE: 'Cobrança no Cartão',
  ECARD_CHARGE_TAX: 'Cobrança de Taxa no Cartão',
  EAGENT_DEPOSIT: 'Depósito EAGENT',
  EAGENT_DEPOSIT_TAX: 'Depósito Taxa EAGENT',
  EAGENT_DEPOSIT_EAGENT: 'Depósito entre EAGENTS',
  EAGENT_DEPOSIT_EARNING: 'Depósito de ganhos EAGENTS',
  CREDIT: 'Crédito',
  DEBIT: 'Débito',
});

export default OpTypesEnum;

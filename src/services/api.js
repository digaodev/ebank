import axios from 'axios';

export const sessionStorageKey = '__ebank_token__';

export default axios.create({
  baseURL: 'https://apidev.ewally.com.br',
});

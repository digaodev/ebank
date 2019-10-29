import axios from 'axios';

export const sessionStorageKey = '__ebank_token__';

export default axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://apidev.ewally.com.br',
});

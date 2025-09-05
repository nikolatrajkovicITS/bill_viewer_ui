import axios from 'axios';

const API_TIMEOUT_MS = 60000;

export const httpClient = axios.create({
  baseURL: 'https://api.allorigins.win/get',
  timeout: API_TIMEOUT_MS
});

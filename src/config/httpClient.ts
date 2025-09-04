import axios from 'axios';

const API_TIMEOUT_MS = 60000;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS
});

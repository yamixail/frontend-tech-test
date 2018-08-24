export default class BaseService {
  constructor({ apiUrl }) {
    this.apiUrl = apiUrl;
  }

  post(url) {
    return fetch(`${this.apiUrl}${url}`, { method: 'POST' });
  }

  get(url) {
    return fetch(`${this.apiUrl}${url}`);
  }

  put(url) {
    return fetch(`${this.apiUrl}${url}`, { method: 'PUT' });
  }

  delete(url) {
    return fetch(`${this.apiUrl}${url}`, { method: 'DELETE' });
  }
}

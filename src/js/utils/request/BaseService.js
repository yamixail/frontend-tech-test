export default class BaseService {
  constructor({ apiUrl }) {
    this.apiUrl = apiUrl;
  }

  post(url, data) {
    return fetch(`${this.apiUrl}${url}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  get(url) {
    return fetch(`${this.apiUrl}${url}`);
  }

  delete(url) {
    return fetch(`${this.apiUrl}${url}`, { method: 'DELETE' });
  }
}

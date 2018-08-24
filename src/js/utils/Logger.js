const defaults = {
  namespace: 'MAIN',
};

export default class Logger {
  constructor(options) {
    this.options = Object.assign({}, defaults, options);

    this.log = this.log.bind(this);
    this.error = this.error.bind(this);
  }

  log(message) {
    // eslint-disable-next-line
    console.log(`[${this.options.namespace}]: ${message}`);
  }

  error(error) {
    // eslint-disable-next-line
    console.error(`[${this.options.namespace}]:`, error.stack);
  }
}

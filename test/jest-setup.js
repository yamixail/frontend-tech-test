// Stop tests in case of any error
// eslint-disable-next-line
console.error = message => {
  throw new Error(message);
};

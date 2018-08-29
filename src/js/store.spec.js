import store from './store';

describe('store', () => {
  it('should initialize', () => {
    const actual = store.getState();
    const expected = {
      tasks: [],
    };

    expect(actual).toEqual(expected);
  });
});

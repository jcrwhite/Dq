import { qany } from '../index';

const testObj = {
  13: 'thirteen',
  pet: 'cat',
  false: 'false key',
  keyOne: 1,
  obj: {
    13: 'thirteen',
    false: 'false key',
    keyOne: 1,
  },
  arr: [
    {
      13: 'thirteen',
      false: 'false key',
      keyOne: 1,
      obj: {
        13: 'thirteen',
        false: 'false key',
        keyOne: 1,
      },
      arr: [1, 2, 3, 4, 'dog', 'cat'],
    },
  ],
};

const testArr = [testObj, testObj, [testObj]];

describe('test searching Object values', () => {
  test('test baslic withValue', () => {
    expect(qany(testObj).withValue(1).values).toEqual([1, 1]);
  });
  test('test baslic withoutValue', () => {
    expect(qany(testObj).withoutValue(1).values).toEqual([2, 3, 4, 'dog', 'cat', 'thirteen', 'cat', 'false key']);
  });
  test('test chaining value', () => {
    expect(qany(testObj).withoutValue(1).withValue('cat').values).toEqual(['cat', 'cat']);
  });
  test('test baslic withValue', () => {
    expect(qany(testObj).whereValue(v => v === 1).values).toEqual([1, 1]);
  });
  test('test value count', () => {
    expect(qany(testObj).withoutValue(1).withValue('cat').count).toEqual(2);
  });
});

describe('test searching Array values', () => {
  test('test baslic withValue', () => {
    expect(qany(testArr).withValue(1).values).toEqual([1, 1]);
  });
  test('test baslic withoutValue', () => {
    expect(qany(testArr).withoutValue(1).values).toEqual([2, 3, 4, 'dog', 'cat', 'thirteen', 'cat', 'false key']);
  });
  test('test chaining value', () => {
    expect(qany(testArr).withoutValue(1).withValue('cat').values).toEqual(['cat', 'cat']);
  });
  test('test whereValue', () => {
    expect(
      qany(testArr)
        .whereValue(v => v !== 1)
        .withValue('cat').count
    ).toEqual(2);
  });
  test('test value count', () => {
    expect(qany(testArr).withoutValue(1).withValue('cat').count).toEqual(2);
  });
});

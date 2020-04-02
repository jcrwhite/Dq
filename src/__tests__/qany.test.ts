import { qany } from '../index';
import { QueryAnything } from '../qany';

const testObj = {
  13: 'thirteen',
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

describe('test basic imports of qany', () => {
  test('test qany returns an instance of QueryAnything', () => {
    expect(qany('test')).toBeInstanceOf(QueryAnything);
  });
  test('test values returns an array', () => {
    expect(qany(testObj).values).toBeInstanceOf(Array);
  });
  test('test reconstruct with no modifier returns empty', () => {
    expect(qany(testObj).reconstruct()).toEqual({});
  });
  test('test reconstruct with no modifier returns empty', () => {
    expect(qany(testArr).reconstruct()).toEqual([]);
  });
  test('test reset after a modifier returns empty', () => {
    const q = qany(testArr).withKey('keyOne');
    q.reset();
    expect(q.reconstruct()).toEqual([]);
  });
});

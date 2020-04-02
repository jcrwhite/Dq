import { qany } from '../index';

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

describe('test searching Object keys', () => {
  test('test basic withKey search', () => {
    expect(qany(testObj).withKey('keyOne').values).toEqual([1]);
  });
  test('test regex withKey search', () => {
    expect(qany(testObj).withKey(/^key.*/).values).toEqual([1]);
  });
  test('test basic withoutKey search', () => {
    expect(qany(testObj).withoutKey('arr').values).toEqual([
      'thirteen',
      'false key',
      1,
      {
        13: 'thirteen',
        false: 'false key',
        keyOne: 1,
      },
    ]);
  });
  test('test regex withoutKey search', () => {
    expect(qany(testObj).withoutKey(/arr/).values).toEqual([
      'thirteen',
      'false key',
      1,
      {
        13: 'thirteen',
        false: 'false key',
        keyOne: 1,
      },
    ]);
  });
  test('test chaining withKey search', () => {
    expect(qany(testObj).withKey('obj').withKey(/^f.*/).values).toEqual(['false key']);
  });
  test('test chaining withoutKey search', () => {
    expect(qany(testObj).withoutKey('arr').withoutKey(/.*j$/).values).toEqual(['thirteen', 'false key', 1]);
  });
  test('test chaining withoutKey and withKey search', () => {
    expect(qany(testObj).withoutKey('arr').withKey(/.*j$/).values).toEqual([
      {
        13: 'thirteen',
        false: 'false key',
        keyOne: 1,
      },
    ]);
  });
  test('test regex withKey search', () => {
    expect(qany(testObj).whereKey(key => /^key.*/.test(key.toString())).values).toEqual([1]);
  });
  test('test count', () => {
    expect(qany(testObj).withoutKey('arr').withKey(/.*j$/).count).toEqual(1);
  });
});

describe('test searching Array keys', () => {
  test('test basic withKey search', () => {
    expect(qany(testArr).withKey('keyOne').values).toEqual([1]);
  });
  test('test regex withKey search', () => {
    expect(qany(testArr).withKey(/^key.*/).values).toEqual([1]);
  });
  test('test basic withoutKey search', () => {
    expect(qany(testArr).withoutKey(1).withoutKey(2).withoutKey('arr').values).toEqual([
      1,
      2,
      3,
      4,
      'dog',
      'cat',
      'thirteen',
      'false key',
      1,
      {
        13: 'thirteen',
        false: 'false key',
        keyOne: 1,
      },
    ]);
  });
  test('test regex withoutKey search', () => {
    expect(qany(testArr).withoutKey(1).withoutKey(2).withoutKey(/arr/).values).toEqual([
      1,
      2,
      3,
      4,
      'dog',
      'cat',
      'thirteen',
      'false key',
      1,
      {
        13: 'thirteen',
        false: 'false key',
        keyOne: 1,
      },
    ]);
  });
  test('test chaining withKey search', () => {
    expect(qany(testArr).withKey('obj').withKey(/^f.*/).values).toEqual(['false key']);
  });
  test('test chaining withoutKey search', () => {
    expect(qany(testArr).withoutKey(1).withoutKey(2).withoutKey('arr').withoutKey(/.*j$/).values).toEqual([
      1,
      2,
      3,
      4,
      'dog',
      'cat',
      'thirteen',
      'false key',
      1,
    ]);
  });
  test('test chaining withoutKey and withKey search', () => {
    expect(qany(testArr).withoutKey('arr').withKey(/.*j$/).values).toEqual([
      {
        13: 'thirteen',
        false: 'false key',
        keyOne: 1,
      },
    ]);
  });
  test('test whereKey search', () => {
    expect(qany(testArr).whereKey(k => k.toString().includes('key')).values).toEqual([1]);
  });
  test('test count', () => {
    expect(qany(testArr).withoutKey(1).withoutKey(2).withoutKey('arr').withKey(/.*j$/).count).toEqual(1);
  });
});

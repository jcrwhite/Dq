import { qany } from '../index';
import { QueryAnything } from '../qany';

describe('test basic imports of dq', () => {
  test('tes dq returns an instance of Dq', () => {
    expect(qany()).toBeInstanceOf(QueryAnything);
  });
});

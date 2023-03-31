import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  const pipe = new OrderByPipe<{ value: string }>();

  const testArray = [{ value: 'b' }, { value: 'a' }, { value: 'c' }];
  const ascArray = [{ value: 'a' }, { value: 'b' }, { value: 'c' }];
  const descArray = [{ value: 'c' }, { value: 'b' }, { value: 'a' }];

  it('should be ascending order', () => {
    const transformedArray = pipe.transform(testArray, 'value', true);
    transformedArray.forEach((el, i) => {
      expect(el.value).toBe(ascArray[i].value);
    });
  });

  it('should be descending order', () => {
    const transformedArray = pipe.transform(testArray, 'value', false);
    transformedArray.forEach((el, i) => {
      expect(el.value).toBe(descArray[i].value);
    });
  });

  it('should empty if array is empty', () => {
    const transformedArray = pipe.transform([], 'value', false);
    expect(transformedArray.length).toBe(0);
  });
});

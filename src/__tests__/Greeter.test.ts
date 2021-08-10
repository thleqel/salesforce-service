import {Greeter} from '../index';
test('Say hello', () => {
  expect(Greeter('World')).toBe('Hello World');
})
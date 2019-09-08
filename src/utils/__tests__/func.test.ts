import {
  getPostingTimeString,
  getPostingTimeStringAll,
  isEmptyInput
} from '../func';

describe('getPostingTimeString method with the argument', () => {
  const now = new Date();
  const moreThanOneDayAgo = new Date(2019, 4 - 1);
  const anHourAgo = new Date(now.getTime() - 1000 * 60 * 60);
  const aMinuteAgo = new Date(now.getTime() - 1000 * 60);
  const oneSecondAgo = new Date(now.getTime() - 1000 * 1);
  const future = new Date(2020, 4 - 1);
  describe.each`
    createdAt            | expected
    ${moreThanOneDayAgo} | ${'Apr 1'}
    ${anHourAgo}         | ${'1h ago'}
    ${aMinuteAgo}        | ${'1m ago'}
    ${oneSecondAgo}      | ${'1s ago'}
    ${future}            | ${'Apr 1'}
  `('$createdAt', ({ createdAt, expected }) => {
    test(`returns ${expected}`, () => {
      expect(getPostingTimeString(createdAt)).toBe(expected);
    });
  });
});

describe('getPostingTimeStringAll method with the argument', () => {
  const case1 = new Date('2014/04/01 12:30');
  const case3 = new Date('2020/06/15 12:00');

  describe.each`
    createdAt | expected
    ${case1}  | ${'12:30 Apr 1, 2014'}
    ${case3}  | ${'12:00 Jun 15, 2020'}
  `('$createdAt', ({ createdAt, expected }) => {
    test(`returns ${expected}`, () => {
      expect(getPostingTimeStringAll(createdAt)).toBe(expected);
    });
  });
});

describe('isEmptyInput method with the argument', () => {
  describe.each`
    value       | expected
    ${''}       | ${true}
    ${' '}      | ${true}
    ${'string'} | ${false}
  `('$value', ({ value, expected }) => {
    test(`returns ${expected}`, () => {
      expect(isEmptyInput(value)).toBe(expected);
    });
  });
});

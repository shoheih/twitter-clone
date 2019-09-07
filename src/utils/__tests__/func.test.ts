import { getPostingTimeString, getPostingTimeStringAll } from '../func';

describe('getPostingTimeString method with the argument', () => {
  const now = new Date();
  const moreThanOneDayAgo = new Date(2019, 4 - 1);
  const anHourAgo = new Date(now.getTime() - 1000 * 60 * 60);
  const aMinuteAgo = new Date(now.getTime() - 1000 * 60);
  const oneSecondAgo = new Date(now.getTime() - 1000 * 1);

  describe.each`
    createdAt            | expected
    ${moreThanOneDayAgo} | ${'Apr 1'}
    ${anHourAgo}         | ${'1h ago'}
    ${aMinuteAgo}        | ${'1m ago'}
    ${oneSecondAgo}      | ${'1s ago'}
  `('$createdAt', ({ createdAt, expected }) => {
    test(`returns ${expected}`, () => {
      expect(getPostingTimeString(createdAt)).toBe(expected);
    });
  });
});

describe('getPostingTimeString method with the argumentAll', () => {
  const case1 = new Date('2014/04/01 12:30');
  const case2 = new Date('2017/07/30 20:30');
  const case3 = new Date('2018/06/15 12:00');

  describe.each`
    createdAt | expected
    ${case1}  | ${'12:30 Apr 1, 2014'}
    ${case2}  | ${'20:30 Jul 30, 2017'}
    ${case3}  | ${'12:00 Jun 15, 2018'}
  `('$createdAt', ({ createdAt, expected }) => {
    test(`returns ${expected}`, () => {
      expect(getPostingTimeStringAll(createdAt)).toBe(expected);
    });
  });
});

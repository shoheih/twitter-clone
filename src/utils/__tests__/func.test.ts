import { getPostingTimeString } from '../func';

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

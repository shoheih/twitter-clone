import { getPostingTimeString } from '../func';

describe('Utils', () => {
  test('getPostingTimeString', () => {
    const now = new Date();
    const anHourAgo = new Date(now.getTime() - 1000 * 60 * 60);
    const aMinuteAgo = new Date(now.getTime() - 1000 * 60);
    const oneSecondAgo = new Date(now.getTime() - 1000 * 1);

    expect(getPostingTimeString(anHourAgo)).toEqual('1h');
    expect(getPostingTimeString(aMinuteAgo)).toEqual('1m');
    expect(getPostingTimeString(oneSecondAgo)).toEqual('1s');
  });
});

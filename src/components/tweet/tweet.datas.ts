import { TweetData } from './tweet.types';

/*
こちらはダミーデータです。
Firebaseの準備が完了次第削除します。
*/

const tweetList: TweetData[] = [
  {
    id: 'daflaeow232lfjdalf',
    userAvatar: 'H',
    userName: 'Shohei Hayashi',
    imageUrl: 'https://material-ui.com/static/images/cards/paella.jpg',
    content:
      '今年初の野外フェスへの参加！\n暑さよりも会場の盛り上がりの方がすごい😡\n熱中症に気をつけないと・・・',
    time: '2019/07/26 18:34'
  },
  {
    id: 'fdaferowajljlfdaj',
    userAvatar: 'C',
    userName: 'John Cruise',
    imageUrl: 'https://material-ui.com/static/images/cards/paella.jpg',
    content:
      'In this summer, I went to Australia to see the Great Barrier Reef with my family.\nIt was very fun!',
    time: '2019/07/21 10:56'
  },
  {
    id: '237297892ofudafudafuaouf',
    userAvatar: 'S',
    userName: 'Sakai Kyoko',
    content: '暇ー。\n誰かご飯行こう😍',
    time: '2019/06/21 14:20'
  }
];

export default tweetList;

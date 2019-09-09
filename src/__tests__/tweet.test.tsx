import React from 'react';
import { mount } from 'enzyme';
import { firestore } from '../firebase/firebase.utils';
import Tweet from '../components/tweet/tweet.component';
import { TweetData } from '../components/tweet/tweet.types';

let props: TweetData;
let historyPushMock = jest.fn();

beforeEach(async () => {
  const postQuerySnapShot = await firestore
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get()
    .then();
  const queryDocumentSnapshot = postQuerySnapShot.docs;
  const documentData = queryDocumentSnapshot[0].data();
  historyPushMock = jest.fn();
  props = {
    body: documentData.body,
    imgUrl: documentData.imgUrl,
    createdAt: documentData.createdAt.toDate(),
    authorName: documentData.author.displayName,
    authorThumbnailURL: documentData.author.photoURL,
    click: historyPushMock
  };
});

describe('Mock Function', () => {
  test('is called', () => {
    const wrap = mount(<Tweet {...props} />);
    wrap
      .find('Tweet')
      .find('div.MuiPaper-root')
      .simulate('click');
    expect(historyPushMock.mock.calls.length).toBe(1);
  });

  test('is not called', () => {
    mount(<Tweet {...props} />);
    expect(historyPushMock.mock.calls.length).toBe(0);
  });
});

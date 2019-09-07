import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { firestore } from '../../../firebase/firebase.utils';
import Tweet from '../tweet.component';
import { TweetData } from '../tweet.types';

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
    const wrap = mount(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Tweet {...props} />;
      </MemoryRouter>
    );
    wrap
      .find('Tweet')
      .find('div.MuiPaper-root')
      .simulate('click');
    expect(historyPushMock.mock.calls.length).toBe(1);
  });

  test('is not called', () => {
    mount(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Tweet {...props} />;
      </MemoryRouter>
    );
    expect(historyPushMock.mock.calls.length).toBe(0);
  });
});

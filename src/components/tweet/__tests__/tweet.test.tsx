import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { firestore } from '../../../firebase/firebase.utils';
import Tweet from '../tweet.component';
import { TweetData } from '../tweet.types';

let documentData: firebase.firestore.DocumentData;
beforeAll(async () => {
  const postQuerySnapShot = await firestore
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get()
    .then();
  const queryDocumentSnapshot = postQuerySnapShot.docs;
  documentData = queryDocumentSnapshot[0].data();
});

describe('<Tweet />', () => {
  test('history push', () => {
    const historyMock = {
      push: jest.fn()
    };
    const props: TweetData = {
      body: documentData.body,
      imgUrl: documentData.imgUrl,
      createdAt: documentData.createdAt.toDate(),
      authorName: documentData.author.displayName,
      authorThumbnailURL: documentData.author.photoURL,
      click: historyMock.push
    };
    const wrap = mount(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Tweet {...props} />;
      </MemoryRouter>
    );
    wrap
      .find('Tweet')
      .find('div.MuiPaper-root')
      .simulate('click');
    expect(historyMock.push.mock.calls.length).toBe(1);
  });
});

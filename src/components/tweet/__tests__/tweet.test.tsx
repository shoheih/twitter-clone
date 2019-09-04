import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { firestore } from '../../../firebase/firebase.utils';
import Tweet from '../tweet.component';

let postQuerySnapShot: firebase.firestore.QuerySnapshot;
beforeAll(async () => {
  postQuerySnapShot = await firestore
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get()
    .then();
});

describe('<Tweet />', () => {
  test('history push', () => {
    const queryDocumentSnapshot = postQuerySnapShot.docs;
    const documentData = queryDocumentSnapshot[0].data();
    const historyMock = {
      push: jest.fn()
    };
    const props = {
      history: historyMock,
      id: queryDocumentSnapshot[0].id,
      body: documentData.body,
      imgUrl: documentData.imgUrl,
      createdAt: documentData.createdAt,
      authorName: documentData.author.displayName,
      authorThumbnailURL: documentData.author.photoURL
    };
    const wrap = mount(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Tweet {...props} />;
      </MemoryRouter>
    );
    expect(wrap.find('Tweet').find('div.MuiPaper-root').length).toBe(1);
    wrap
      .find('Tweet')
      .find('div.MuiPaper-root')
      .simulate('click');
    expect(historyMock.push.mock.calls.length).toBe(1);
  });
});

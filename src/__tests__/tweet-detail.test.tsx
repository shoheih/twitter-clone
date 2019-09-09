import React from 'react';
import { mount } from 'enzyme';
import { firestore } from '../firebase/firebase.utils';
import TweetDetail from '../components/tweet-detail/tweet-detail.component';
import { TweetDetailData } from '../components/tweet-detail/tweet-detail.types';
import AppContext from '../contexts/UserContext';

let props: TweetDetailData;
let deleteToggleMock = jest.fn();

beforeEach(async () => {
  const postQuerySnapShot = await firestore
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get()
    .then();
  const queryDocumentSnapshot = postQuerySnapShot.docs;
  const documentData = queryDocumentSnapshot[0].data();
  deleteToggleMock = jest.fn();
  props = {
    body: documentData.body,
    imgUrl: documentData.imgUrl,
    createdAt: documentData.createdAt.toDate(),
    authorId: documentData.author.id,
    authorName: documentData.author.displayName,
    authorThumbnailURL: documentData.author.photoURL,
    deleteToggle: deleteToggleMock
  };
});

describe('Delete Icon', () => {
  test('is clicked', () => {
    const user = {
      id: props.authorId
    };
    const wrap = mount(
      <AppContext.Provider value={user}>
        <TweetDetail {...props} />
      </AppContext.Provider>
    );
    wrap.find('button.MuiIconButton-root').simulate('click');
    expect(deleteToggleMock.mock.calls.length).toBe(1);
  });

  test('does not exist', () => {
    const user = {
      id: ''
    };
    const wrap = mount(
      <AppContext.Provider value={user}>
        <TweetDetail {...props} />
      </AppContext.Provider>
    );
    expect(wrap.find('button.MuiIconButton-root').length).toBe(0);
  });
});

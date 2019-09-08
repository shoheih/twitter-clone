import React from 'react';
import { mount } from 'enzyme';
import PostNew from '../../post-new/post-new.component';
import { isEmptyInput } from '../../../utils/func';

jest.mock('../../../utils/func');
const toggle = jest.fn(() => {});

describe('Submit button', () => {
  test('should be disable if value is empty', () => {
    (isEmptyInput as jest.Mock).mockReturnValue(true);
    const wrap = mount(<PostNew toggle={toggle} />);
    expect(wrap.find('button').prop('disabled')).toBeTruthy();
  });

  test('should be enable if value is not empty', () => {
    (isEmptyInput as jest.Mock).mockReturnValue(false);
    const wrap = mount(<PostNew toggle={toggle} />);
    expect(wrap.find('button').prop('disabled')).toBeFalsy();
  });

  test('should be disable after clicked', () => {
    (isEmptyInput as jest.Mock).mockReturnValue(false);
    const wrap = mount(<PostNew toggle={toggle} />);
    const form = wrap.find('form');
    form.simulate('submit');
    expect(wrap.find('button').prop('disabled')).toBeTruthy();
  });
});

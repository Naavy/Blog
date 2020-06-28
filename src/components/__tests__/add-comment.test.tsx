import React from 'react';
import { shallow } from 'enzyme';
import { AddComment } from '../add-comment';
import { Post } from '../../store/types';

const store = {
  newComment: '',
  name: '',
  email: '',
  addComment: jest.fn(),
  post: {} as Post
}

describe('AddComment', () => {
  it('should render', () => {
    // when
    const wrapper = shallow(<AddComment {...store} />);

    // then
    expect(wrapper).toMatchSnapshot();
  });

  it('should call addComment, when click "Add Comment" ', () => {
    // given
    const mockedAddComment = jest.fn().mockResolvedValue(null);
    const testStore = {
        ...store,
        addComment: mockedAddComment
    }

    const wrapper = shallow(<AddComment {...testStore} />);

    // when
    wrapper.find('form').simulate('submit', { preventDefault: () => null });

    // then
    expect(mockedAddComment).toHaveBeenCalled();
  });
});
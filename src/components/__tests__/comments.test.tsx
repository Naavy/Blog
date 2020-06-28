import React from 'react';
import { shallow } from 'enzyme';
import { Comments } from '../comments';
import { Link, Box, Typography } from '@material-ui/core';
import { Post, Comment } from '../../store/types';

const store = {
    showForm: false,
    showComments: false,
    getComments: jest.fn,
    comments: [{}] as Comment[],
    commentsLoading: false,
    post: {} as Post
}

describe('Comments', () => {
  it('should render', () => {
    // when
    const wrapper = shallow(<Comments {...store} />);

    // then
    expect(wrapper).toMatchSnapshot();
  });

  it('should call getComments, when click on "Comments" ', () => {
    // given
    const mockedGetComments = jest.fn().mockResolvedValue(null);
    const testStore = {
      ...store,
      getComments: mockedGetComments
    }
    const wrapper = shallow(<Comments {...testStore} />);

    // when
    wrapper.find(Link).simulate('click');

    // then
    expect(mockedGetComments).toHaveBeenCalled();
  });

  it('should display only comments belonging to the post ', () => {
    // given
    const testStore = {
      ...store,
      comments: [
        {
          id: "1",
          post_id: "10",
          name: "TestName",
          email: "test@mail.com",
          body: "Test"
        },
        {
          id: "2",
          post_id: "10",
          name: "TestName2",
          email: "test2@mail.com",
          body: "Test2"
        },
        {
          id: "3",
          post_id: "9",
          name: "TestName3",
          email: "test3@mail.com",
          body: "Test3"
        }
      ],
      post: {
        id: "10",
        user_id: "1",
        title: "Test-Title10",
        body: "Test10"
      }
    }

    // when
    const wrapper = shallow(<Comments {...testStore} />);
    wrapper.setState({ showComments: true });

    // then
    expect((wrapper).find(Box)).toHaveLength(3);
  });

  it('should display text, when post does not have any comments', () => {
    // given
    const testStore = {
      ...store,
      comments: [
        {
          id: "1",
          post_id: "7",
          name: "TestName",
          email: "test@mail.com",
          body: "Test"
        },
        {
          id: "2",
          post_id: "8",
          name: "TestName2",
          email: "test2@mail.com",
          body: "Test2"
        },
        {
          id: "3",
          post_id: "9",
          name: "TestName3",
          email: "test3@mail.com",
          body: "Test3"
        }
      ],
      post: {
        id: "10",
        user_id: "1",
        title: "Test-Title10",
        body: "Test10"
      }
    }

    // when
    const wrapper = shallow(<Comments {...testStore} />);
    wrapper.setState({ showComments: true });

    // then
    expect((wrapper).find(Box)).toHaveLength(1);
    expect((wrapper).find(Typography).at(0).text()).toEqual(" This post has not yet commented ");
  });
});
import React from 'react';
import { shallow } from 'enzyme';
import { Posts } from '../posts';
import { Link, Box } from '@material-ui/core';

const store = {
    more: false,
    getPosts: jest.fn(),
    selectedUser: {
        id: "1",
        first_name: "FirstNameTest",
        last_name: "LastNameTest",
        email: "mail@test.com",
      },
    posts: [
      {
        id: "20",
        user_id: "1",
        title: "Test-Title",
        body: "Test"
      }
    ],
    postsLoading: false
}

describe('Posts', () => {
  it('should render', () => {
    // when
    const wrapper = shallow(<Posts {...store} />);

    // then
    expect(wrapper).toMatchSnapshot();
  });

  it('should set state more on true, when click Link with "More posts" ', () => {
    // given
    const wrapper = shallow(<Posts {...store} />);

    // when
    wrapper.find(Link).simulate('click');

    // then
    expect(wrapper.state('more')).toEqual(true);
  });

  it('should display Link with "Less posts..." when state more is true', () => {
    // given
    const wrapper = shallow(<Posts {...store} />);

    // when
    wrapper.setState({ more: true });

    // then
    expect((wrapper).find(Link).text()).toEqual('Less posts...(↑)');
  });

  it('should call getPosts, when selectedUser is changed', () => {
    // given
    const mockedGetPosts = jest.fn().mockResolvedValue(null);
    const testStore = {
      ...store,
      getPosts: mockedGetPosts
    }
    const wrapper = shallow(<Posts {...testStore} />);

    // when
    wrapper.setProps({
      selectedUser: {
        id: "2",
        first_name: "FirstNameTest",
        last_name: "LastNameTest",
        email: "mail@test.com"
      }
    });

    // then
    expect(mockedGetPosts).toHaveBeenCalled();
  });

  it('should only display the first post of all posts, when state more is false', () => {
    // given
    const testStore = {
      ...store,
      posts: [
        {
          id: "20",
          user_id: "1",
          title: "Test-Title20",
          body: "Test20"
        },
        {
          id: "21",
          user_id: "1",
          title: "Test-Title21",
          body: "Test21"
        },
        {
          id: "22",
          user_id: "1",
          title: "Test-Title22",
          body: "Test22"
        }
      ]
    }

    //when
    const wrapper = shallow(<Posts {...testStore} />);

    // then
    expect((wrapper).find(Box)).toHaveLength(1)
  });

  it('should display all posts, when click "more" ', () => {
    // given
    const testStore = {
      ...store,
      posts: [
        {
          "id": "20",
          "user_id": "1",
          "title": "Test-Title20",
          "body": "Test20"
        },
        {
          "id": "21",
          "user_id": "1",
          "title": "Test-Title21",
          "body": "Test21"
        },
        {
          "id": "22",
          "user_id": "1",
          "title": "Test-Title22",
          "body": "Test22"
        }
      ]
    }
    const wrapper = shallow(<Posts {...testStore} />);

    //when
    wrapper.find(Link).simulate('click');

    // then
    expect((wrapper).find(Box)).toHaveLength(3)
  });
});
import React from 'react';
import { shallow } from 'enzyme';
import { Users } from '../users';
import Autocomplete from '@material-ui/lab/Autocomplete';

const store = {
  selectedUser: undefined,
  users: [
    {
      id: "1",
      first_name: "Name_test",
      last_name: "Test",
      email: "mail@test.com",
    }
  ] as any,
  getUsers: jest.fn(),
  selectUser: jest.fn()
}

describe('Users', () => {
  it('should render', () => {
    // when
    const wrapper = shallow(<Users {...store} />);

    // then
    expect(wrapper).toMatchSnapshot();
  });

  it('should display all users in state', () => {
    // given
    const testStore = {
      ...store,
      users: [
        {
          id: "1",
          first_name: "Name_test1",
          last_name: "Test1",
          email: "mail@test1.com",
        },
        {
          id: "2",
          first_name: "Name_test2",
          last_name: "Test2",
          email: "mail@test2.com",
        },
        {
          id: "3",
          first_name: "Name_test2",
          last_name: "Test3",
          email: "mail@test2.com",
        }
      ]
    }
    // when
    const wrapper = shallow(<Users {...testStore} />);

    // then
    expect((wrapper).find(Autocomplete).prop('options')).toHaveLength(3);
  });
});
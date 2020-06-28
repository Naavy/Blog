import React from 'react';
import { shallow } from 'enzyme';
import { ChangeUserName } from '../change-username';

const store = {
    lastName: 'TestLastName',
    firstName: 'TestFirstName',
    selectedUser: {
      "id": "1",
      "first_name": "FirstNameTest",
      "last_name": "LastNameTest",
      "email": "mail@test.com",
    },
    changeUserName: jest.fn
  }


describe('ChangeUserName', () => {
  it('should render', () => {
    // when
    const wrapper = shallow(<ChangeUserName {...store} />);

    // then
    expect(wrapper).toMatchSnapshot();
  });

  it('should call changeUserName, when click "change" ', () => {
    // given
    const mockedChangeUserName = jest.fn().mockResolvedValue(null);
    const testStore = {
        ...store,
        changeUserName: mockedChangeUserName
    }

    const wrapper = shallow(<ChangeUserName {...testStore} />);

    // when
    wrapper.find('form').simulate('submit', { preventDefault: () => null });

    // then
    expect(mockedChangeUserName).toHaveBeenCalled();
  });
});
import { reducer } from '../reducer';
import { AnyAction } from 'redux';
import { GET_USERS_SUCCESS } from '../actions';

  const initialState = {
    users: [],
    posts: [],
    comments: [],
    selectedUser: undefined,
    errors: undefined,
    postsLoading: false,
    commentsLoading: false
  }

describe('Reducer', () => {
  it('should return the initial state', () => {
    // when
    const output = reducer(undefined, {} as AnyAction);

    // then
    expect(output).toEqual(initialState);
  });

  it('should add Users to store on get success', () => {
    // given
    const action = {
      type: GET_USERS_SUCCESS,
      payload: [{
          id: "1",
          first_name: "Name_test",
          last_name: "Test",
          email: "mail@test.com"
      }]
    };

    // when
    const output = reducer(initialState, action);

    // then
    expect(output.users).toEqual(action.payload);
  });
});
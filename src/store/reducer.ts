import { Reducer } from 'redux';
import { AppState } from './types';
import {
  GET_USERS_SUCCESS,
  SELECT_USER,
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_COMMENTS,
  GET_COMMENTS_SUCCESS,
  PATCH_USER_SUCCESS,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE
} from './actions';
import _ from 'lodash';

const initialState: AppState = {
  users: [],
  posts: [],
  comments: [],
  selectedUser: undefined,
  errors: undefined,
  postsLoading: false,
  commentsLoading: false
}

const reducer: Reducer<AppState> = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload
      };
    }
    case SELECT_USER: {
      return {
        ...state,
        selectedUser: action.payload
      }
    }
    case GET_COMMENTS: {
      return {
        ...state,
        commentsLoading: true
      };
    }

    case GET_COMMENTS_SUCCESS: {
      return {
        ...state,
        comments:  _.uniqBy([...state.comments, ...action.payload], 'id'),
        commentsLoading: false
      };
    }

    case GET_POSTS: {
      return {
        ...state,
        postsLoading: true
      };
    }

    case GET_POSTS_SUCCESS: {
      return {
        ...state,
        posts: action.payload,
        comments: [],
        postsLoading: false
      };
    }
    case PATCH_USER_SUCCESS: {
      const newUsers = state.users.map((user) => {
        if(user.id === action.payload.id) {
          user = action.payload;
        }
        return user;
      })

      return {
        ...state,
        selectedUser: action.payload,
        users: newUsers
      };
    }

    case ADD_COMMENT_SUCCESS: {
      return {
        ...state,
        comments: [...state.comments, action.payload]
      };
    }

    case ADD_COMMENT_FAILURE: {
      return {
        ...state,
        errors: action.payload.message
      }
    }

    default: {
      return state;
    }
  }
};

export { reducer };

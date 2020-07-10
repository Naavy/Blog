import { Dispatch } from 'redux';
import { User, Post, Comment } from './types';

export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const PATCH_USER = 'PATCH_USER';
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS';
export const GET_POSTS = 'GET_POSTS';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const SELECT_USER = 'SELECT_USER';
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

const API = 'https://gorest.co.in/public-api';
const ACCESS_TOKEN = 'access-token=bfbcWHZ3j1wpEpMOlwuMGniVp7hQo6O3R4nt';


export const fetchUsers: any = () => {
  return (dispatch: Dispatch): void => {
    dispatch(getUsers());
    fetch(`${API}/users?${ACCESS_TOKEN}`)
      .then(response => response.json())
      .then(json => dispatch(getUsersSuccess(json.result)))
  };
};

export function getUsers() {
  return {
    type: GET_USERS
  }
}

export function getUsersSuccess(payload: User[]) {
  return {
    type: GET_USERS_SUCCESS,
    payload
  }
}

export function selectUser(payload: User) {
  return {
    type: SELECT_USER,
    payload
  }
}

export const changeUserName: any = (id: string, data: Record<string,string>) => {
  return (dispatch: Dispatch): void => {
    dispatch(patchUser(data));
    fetch(`${API}/users/${id}?${ACCESS_TOKEN}`,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
      }
    )
      .then(response => response.json())
      .then(json => dispatch(patchUserSuccess(json.result)))
  };
};

export function patchUser(payload: Record<string,string>) {
  return {
    type: PATCH_USER,
    payload
  }
}

export function patchUserSuccess(payload: Record<string,string>) {
  return {
    type: PATCH_USER_SUCCESS,
    payload
  }
}

export const fetchPosts: any = (id: string) =>  {
  return (dispatch: Dispatch): void => {
    dispatch(getPosts());
    fetch(`${API}/posts?user_id=${id}&${ACCESS_TOKEN}`)
      .then(response => response.json())
      .then(json => dispatch(getPostsSuccess(json.result)))
  };
};

export function getPosts() {
  return {
    type: GET_POSTS
  }
}

export function getPostsSuccess(payload: Post[]) {
  return {
    type: GET_POSTS_SUCCESS,
    payload
  }
}

export const fetchComments: any = (id: string) =>  {
  return (dispatch: Dispatch): void => {
    dispatch(getComments());
    fetch(`${API}/comments?post_id=${id}&${ACCESS_TOKEN}`)
      .then(response => response.json())
      .then(json => dispatch(getCommentsSuccess(json.result)))
  };
};

export function getComments() {
  return {
    type: GET_COMMENTS
  }
}

export function getCommentsSuccess(payload: Comment[]) {
  return {
    type: GET_COMMENTS_SUCCESS,
    payload
  }
}

export const addComment: any = (comment: Comment) => {
  return (dispatch: Dispatch): void => {
    dispatch(addNewComment(comment));
    fetch(`${API}/comments?${ACCESS_TOKEN}`,
      {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {'Content-Type': 'application/json'}
      }
    )
      .then(response => response.json())
      .then(json => {
        if(json._meta.success) {
          dispatch(addNewCommentSuccess(json.result))
        } else { dispatch(addNewCommentFailure(json.result)) }
      })
  };
};

export function addNewComment(payload: Comment) {
  return {
    type: ADD_COMMENT,
    payload
  }
}

export function addNewCommentSuccess(payload: Comment) {
  return {
    type: ADD_COMMENT_SUCCESS,
    payload
  }
}

export function addNewCommentFailure(payload: any) {
  return {
    type: ADD_COMMENT_FAILURE,
    payload
  }
}

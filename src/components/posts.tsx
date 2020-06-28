import React from 'react';
import { fetchPosts } from '../store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState, Post, User } from '../store/types';
import { Typography, Link, Box } from '@material-ui/core';
import Comments from './comments';
import { Loader } from './loader';
import _ from 'lodash';

interface State {
  more: boolean;
}

interface DispatchProps {
  getPosts: (id: string) => any;
}

interface StoreProps {
  selectedUser?: User;
  posts: Post[];
  postsLoading: boolean;
}

type Props = DispatchProps & StoreProps;

export class Posts extends React.Component<Props, {}> {
  readonly state: State = {
    more: false
  }

  componentDidUpdate(prevProps: any) {
    if(this.props.selectedUser && this.props.selectedUser !== prevProps.selectedUser) {
      this.props.getPosts(this.props.selectedUser.id);
      this.setState({ more: false })
    }
  }

  render () {
    return (
      <React.Fragment>
        {this.props.selectedUser &&
        <React.Fragment>
          {this.props.postsLoading && <Loader />}
          {!this.props.postsLoading && _.isEmpty(this.props.posts) &&
            <Typography> There’s no posts posted by the user </Typography>
          }
          {!this.props.postsLoading && !_.isEmpty(this.props.posts) &&
          <React.Fragment>
            <Box style={{ border: "1px solid grey", borderRadius: "10px", padding: "10px" }}>
              <Typography> <b>{this.props.posts[0].title}</b> </Typography>
              <Typography> {this.props.posts[0].body} </Typography>
            </Box>
            <Comments post={this.props.posts[0]} />
            <Link
              style={{ cursor: "pointer" }}
              onClick={() => this.setState({ more: !this.state.more })}
            >
              {!this.state.more && this.props.posts &&
                <Typography>
                  More posts...({this.props.posts.length - 1})
                </Typography>
              }
              {this.state.more &&
                <Typography style={{ marginBottom: "20px" }}>
                  Less posts...(↑)
                </Typography>
              }
            </Link>
          </React.Fragment>
          }
          {!_.isEmpty(this.props.posts) && this.state.more &&
            this.props.posts.slice(1).map((post: Post, index) =>
              <React.Fragment key={index}>
                <Box style={{ border: "1px solid grey", borderRadius: "10px", padding: "10px" }}>
                  <Typography key={`post-title-${index}`}> <b>{post.title}</b> </Typography>
                  <Typography key={`post-text-${index}`}> {post.body} </Typography>
                </Box>
                <Comments key={`comment-${index}`} post={post} />
              </React.Fragment>
            )
          }
        </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

const mapStoreToProps = (state: AppState): StoreProps => {
  return {
    selectedUser: state.selectedUser,
    posts: state.posts,
    postsLoading: state.postsLoading
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    getPosts: (id) => {
      return dispatch(fetchPosts(id))
    }
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Posts);



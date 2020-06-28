import React from 'react';
import { fetchComments } from '../store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState, Post, Comment } from '../store/types';
import { Link, Typography, Box } from '@material-ui/core';
import { Loader } from './loader';
import AddComment from './add-comment';
import _ from 'lodash';

interface State {
  showForm: boolean;
  showComments: boolean;
}

interface DispatchProps {
  getComments: (id: string) => any;
}

interface StoreProps {
  comments: Comment[];
  commentsLoading: boolean;
}

interface ComponentProps {
  post: Post
}

type Props = DispatchProps & StoreProps & ComponentProps;

export class Comments extends React.Component<Props, State> {
  readonly state: State = {
    showForm: false,
    showComments: false
  }

  getComments = () => {
    this.setState({ showComments: !this.state.showComments, showForm: false });
    this.props.getComments(this.props.post.id);
  }

  render () {
    return (
      <React.Fragment>
        {this.state.showComments &&
        <React.Fragment>
          {this.props.comments?.map((comment: Comment, index) =>
            (comment.post_id === this.props.post.id) &&
              <Box key={`${index}`} style={{ margin: '10px', backgroundColor:'#ddd', borderRadius: '10px', padding: '10px'}}>
                <Typography key={`author-${index}`} variant='body2'>
                  <b>{comment.name}</b>
                </Typography>
                <Typography key={`comment-${index}`} variant='body2'>
                  {comment.body}
                </Typography>
              </Box>
            )
          }
          {this.props.commentsLoading && <Loader />}
          {!this.props.commentsLoading &&
          _.isEmpty(this.props.comments.filter(comment => comment.post_id === this.props.post.id)) &&
            <Typography> No one has commented on this post yet </Typography>
          }
          <Link
            style={{ cursor: 'pointer', margin: '10px' }}
            onClick={() => this.setState({ showForm: !this.state.showForm}) }
          >
            <Typography variant="caption"> Add Comment </Typography>
          </Link>
        </React.Fragment>
        }
        {this.state.showForm && <AddComment post={this.props.post} />}
        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link
            style={{ cursor: 'pointer', marginRight: '20px' }}
            onClick={this.getComments}
          >
            <Typography variant="caption"> Comments </Typography>
          </Link>
        </Box>
      </React.Fragment>
    )
  }
}

const mapStoreToProps = (state: AppState): StoreProps => {
  return {
    comments: state.comments,
    commentsLoading: state.commentsLoading
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    getComments: (id) => {
      return dispatch(fetchComments(id))
    }
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Comments);



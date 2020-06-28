import React from 'react';
import { addComment } from '../store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TextField, Button } from '@material-ui/core';
import { Post, Comment } from '../store/types';


interface State {
  newComment: string;
  name: string;
  email: string;
}

interface DispatchProps {
  addComment: (comment: Partial<Comment>) => any;
}

interface ComponentProps {
  post: Post
}

type Props = DispatchProps & ComponentProps;

export class AddComment extends React.Component<Props, State> {
  readonly state: State ={
    newComment: '',
    name: '',
    email: ''
  }

  sendForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.addComment({
      post_id: this.props.post.id,
      name: this.state.name,
      email: this.state.email,
      body: this.state.newComment
    });
  }

  render () {
    return (
      <form
        onSubmit={(event) => this.sendForm(event)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <TextField
          label="Your Name"
          value={this.state.name}
          onChange={(event) => this.setState({ name: event.target.value})}
        />
        <TextField
          label="Your e-mail"
          value={this.state.email}
          onChange={(event) => this.setState({ email: event.target.value})}
        />
        <TextField
          label="Your Comment..."
          multiline
          rowsMax={4}
          value={this.state.newComment}
          onChange={(event) => this.setState({ newComment: event.target.value })}
          variant="filled"
          size="small"
        />
        <Button
          variant="contained"
          type="submit"
          size="small"
          style={{ width: '50%', marginTop: '10px' }}
        >
          Add Comment
        </Button>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    addComment: (comment) => {
      return dispatch(addComment(comment))
    }
  }
}

export default connect(null, mapDispatchToProps)(AddComment);



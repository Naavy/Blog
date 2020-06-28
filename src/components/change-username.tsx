import React from 'react';
import { TextField, Button, Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppState, User } from '../store/types';
import { Dispatch } from 'redux';
import { changeUserName } from '../store/actions';

interface State {
  lastName: string;
  firstName: string;
}

interface StoreProps {
  selectedUser?: User;
}

interface DispatchProps {
  changeUserName: (id: string, userData: Record<string,string>) => any;
}

type Props = StoreProps & DispatchProps;

export class ChangeUserName extends React.Component<Props> {
  readonly state: State = {
    lastName: '',
    firstName: ''
  }

  setUserData = () => {
    if(this.props.selectedUser) {
      this.setState({
        lastName: this.props.selectedUser.last_name,
        firstName: this.props.selectedUser.first_name
      })
    }
  }

  componentDidMount() {
    this.setUserData();
  }

  componentDidUpdate(prevProps: any) {
    if(prevProps.selectedUser !== this.props.selectedUser) {
      this.setUserData()
    }
  }

  sendForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(this.props.selectedUser) {
      this.props.changeUserName(
        this.props.selectedUser.id,
        { last_name: this.state.lastName, first_name: this.state.firstName }
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.selectedUser &&
        <form onSubmit={(event) => this.sendForm(event)}>
          <Box style={{ display: "flex", marginBottom: "30px" }}>
            <TextField
              label="Last Name"
              value={this.state.lastName}
              style={{ marginRight: '20px' }}
              onChange={(event) => this.setState({ lastName: event.target.value})}
            />
            <TextField
              label="First Name"
              value={this.state.firstName}
              onChange={(event) => this.setState({ firstName: event.target.value})}
            />
          </Box>
          <Button
            variant="contained"
            type="submit"
            style={{ width: '25%' }}
          >
            Change
          </Button>
        </form>
        }
      </React.Fragment>
    )
  }
}

const mapStoreToProps = (state: AppState): StoreProps => {
  return {
    selectedUser: state.selectedUser,
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    changeUserName: (id: string, userData: Record<string,string>) => {
      return dispatch(changeUserName(id, userData))
    }
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(ChangeUserName);

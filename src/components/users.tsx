import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import { AppState, User } from '../store/types';
import { Dispatch } from 'redux';
import { fetchUsers, selectUser } from '../store/actions';
import styled from 'styled-components';
import _ from 'lodash';
import { Loader } from './loader';

const Container = styled.div`
  margin-bottom: 40px;
`;

interface StoreProps {
  users: User[];
}

interface DispatchProps {
  getUsers: () => any;
  selectUser: (user: any) => any;
}

type Props = StoreProps & DispatchProps;

export class Users extends React.Component<Props> {

  componentDidMount() {
    this.props.getUsers()
  }

  // selectUser(event: any, user: any) {
  //   this.setState({ selectedUser: user }, () => this.props.selectUser(this.state.selectedUser));
  // }


  render() {
    return (
      <Container>
        {!_.isEmpty(this.props.users) &&
        <Autocomplete
          onChange={(event, user) => this.props.selectUser(user)}
          options={this.props.users}
          getOptionLabel={(option) => option.last_name + ' ' + option.first_name}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Search User..." variant="outlined" />}
        />
        }
        {_.isEmpty(this.props.users) && <Loader />}
      </Container>
    )}
  }

const mapStoreToProps = (state: AppState): StoreProps => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    getUsers: () => {
      return dispatch(fetchUsers())
    },
    selectUser: (user) => {
      return dispatch(selectUser(user))
    }
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Users);

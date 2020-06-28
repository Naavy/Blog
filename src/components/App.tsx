import React from 'react';
import Users from './users';
import Posts from './posts';
import ChangeUserName from './change-username';
import logo from '../static/images/logo.png';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

const Logo = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  margin: 40px;
  display: flex;
`;

export class App extends React.Component<{}, {}> {
  render () {
    return (
      <React.Fragment>
        <Logo>
          <img src={logo} alt='logo' style={{ width: '200px' }} />
        </Logo>
        <Container>
          <Grid item sm={6}>
            <Users />
            <ChangeUserName />
          </Grid>
          <Grid item sm={4} >
            <Posts />
          </Grid>
        </Container>
      </React.Fragment>
    )
  };
};

export default App;
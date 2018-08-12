import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { performCreateUser } from './../actions';
import NuevoUsuarioForm from './forms/NuevoUsuarioForm';
import NavCarbon from '../components/NavCarbon';

class NuevoUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = { date: null };
  }

  submit = (payload) => {
    this.props.createUser(payload);
  }
  onChangeDate = date => this.setState({ date })

  render() {
    const { isLoading, hasError } = _.get(this.props, 'user', {});
    console.log(isLoading, hasError);
    const { user_name } = this.props.user;
    const { type } = this.props.type_user;
    return (
      <div>
        <NavCarbon user={user_name || null} type={type}></NavCarbon>
        <Container>
          <NuevoUsuarioForm isFetching={isLoading} loginError={hasError} onSubmit={this.submit} onChangeDate={this.onChangeDate} currDate={this.state.date}/>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: _.get(state, 'user.data.user', null),
  session: _.get(state, 'user.data.session', null),
  type_user: _.get(state, 'user.type', null)
});

const mapDispatchToProps = dispatch => ({
  createUser: (payload) => {
    dispatch(performCreateUser(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NuevoUsuario);

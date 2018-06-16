import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { performLogin } from './../actions';
import LoginForm from './forms/LoginForm';

class Login extends Component {
  submit = (payload) => {
    this.props.doLogin(payload);
  }

  render() {
    const { isLoading, hasError } = _.get(this.props, 'user', {});
    console.log(isLoading, hasError);

    return (
      <section className="login">
        <div className="header-login">
          <div className="container-fluid">
            <Row>
              <Col xs="12" sm={{size: 12, order: 1, offset: 1}} className="text-center">
                <Link to='/'>
                  <img className="logo-win" src={require('./../assets/img/carbon_logo_horizontal.svg')} alt="Logo Carbon" />
                </Link>
              </Col>
            </Row>
          </div>
        </div>
        <Container>
          <div className="box-login shadow">
            <LoginForm isFetching={isLoading} loginError={hasError} onSubmit={this.submit} />
          </div>
        </Container>
      </section>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = dispatch => ({
  doLogin: (payload) => {
    dispatch(performLogin(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

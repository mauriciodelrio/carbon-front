import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { performEditUser, performChangeStateUser } from './../actions';
import BuscarUsuarioForm from './forms/BuscarUsuarioForm';
import NavCarbon from '../components/NavCarbon';

class EditarUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = { date: null };
  }

  submit = (payload) => {
    console.log("payload buscar!!!!", payload)
    this.props.editUser(payload);
  }
  onChangeDate = date => this.setState({ date })

  changeState = (payload) => {
    console.log("click change stateee", payload);
    const find_user = _.get(this.props, 'find_user', {});
    const values = {
      user_id: payload,
      state: _.get(find_user, 'user_state', false) ? false : true
    }
    this.props.changeStateUser(values);
  }

  render() {
    const { isLoading, hasError } = _.get(this.props, 'user', {});
    console.log(isLoading, hasError);
    const { user_name } = this.props.user;
    const { type } = this.props.type_user;
    const find_user = _.get(this.props, 'find_user', []);
    return (
      <div>
        <NavCarbon user={user_name || null} type={type}></NavCarbon>
        <Container>
          <BuscarUsuarioForm isFetching={isLoading} loginError={hasError} onSubmit={this.submit} onChangeDate={this.onChangeDate}/>
          {find_user ?
          <div>
            <Row>
              <Col md="3" xs="12">
                <h3>Nombre</h3>
              </Col>
              <Col md="3" xs="12">
                <h3>Apellido</h3>
              </Col>
              <Col md="3" xs="12">
                <h3>Estado</h3>
              </Col>
              <Col md="3" xs="12">
                <h3>Acción</h3>
              </Col>
            </Row>
            {
              _.map(find_user, (o) => {
                return (
                <Row>
                  <Col md="3" xs="12">
                    {_.get(o, 'user_name', '')}
                  </Col>
                  <br/>
                  <Col md="3" xs="12">
                    {_.get(o, 'user_lastname', '')}
                  </Col>
                  <br/>
                  <Col md="3" xs="12">
                  {_.get(o, 'user_state', false) ? "Activo" : "Inactivo"}
                  </Col>
                  <br/>
                  <Col md="3" xs="12">
                    <Button onClick={() => this.changeState(_.get(o, 'user_id', ''))}>Cambiar Estado</Button>
                  </Col>
                </Row>
                )
              })
            }
          </div>
          :
          null
          }
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: _.get(state, 'user.data.user', null),
  session: _.get(state, 'user.data.session', null),
  type_user: _.get(state, 'user.type', null),
  find_user: _.get(state, 'findUser.data', null)
});

const mapDispatchToProps = dispatch => ({
  editUser: (payload) => {
    dispatch(performEditUser(payload));
  },
  changeStateUser: (payload) => {
    dispatch(performChangeStateUser(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditarUsuario);

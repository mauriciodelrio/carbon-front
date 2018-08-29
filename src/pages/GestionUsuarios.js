import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Container, Row, Col, Card, CardTitle, CardText } from 'reactstrap';
import NavCarbon from '../components/NavCarbon';
import moment from 'moment';
import { Link } from 'react-router-dom';

class GestionUsuarios extends Component {

   render() {
     const { user_name } = this.props.user;
     console.log("aaaaaaaa", this.props.user)
     console.log("props en vista", this.props.user);
     const { type } = this.props.type_user
     return type === 'administrator'? (
       <div>
        <NavCarbon user={user_name || null} type={type}></NavCarbon>
        <Container>
          <div className="top-h1"></div> 
          <Row>
            <h1 align="center"> Gestión de usuarios </h1>
          </Row>
          <Row className="center">
            <Col sm="4">
              <Card body>
                <CardTitle>Cargar usuario</CardTitle>
                <CardText><i className="fas fa-user-plus fa-4x color-ico-usu" aria-hidden="true" /></CardText>
                <Link to={'/user/new'}><button className="btn btn-select">Seleccionar</button></Link>
              </Card>
            </Col>
            <Col sm="4">
              <Card body>
                <CardTitle>Cargar CSV usuarios</CardTitle>
                <CardText><i className="fas fa-users fa-4x color-ico-usu" aria-hidden="true" /></CardText>
                <Link to={'/user/new/csv'} ><button className="btn btn-select" >Seleccionar</button></Link>
              </Card>
            </Col>
            <Col sm="4">
              <Card body>
                <CardTitle>Cambiar estado usuario</CardTitle>
                <CardText><i className="fas fa-user-edit fa-4x color-ico-usu" aria-hidden="true" /></CardText>
                <Link to={'/user/edit'} ><button className="btn btn-select" >Seleccionar</button></Link>
              </Card>
            </Col>
          </Row>
        </Container>
       </div>
     ) : (
      <div>
        <NavCarbon user={user_name || null} type={type}></NavCarbon>
        NADA
      </div>
     )
   }
}

const mapStateToProps = state => ({
  user: _.get(state, 'user.data.user', null),
  session: _.get(state, 'user.data.session', null),
  type_user: _.get(state, 'user.type', null)
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(GestionUsuarios);

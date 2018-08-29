import React, { Component } from 'react';
import { Container, Row, Col, Button} from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import NavCarbon from '../components/NavCarbon';
import { push } from 'react-router-redux';

class ConfirmCSV extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isLoading, hasError } = _.get(this.props, 'user', {});
    console.log(isLoading, hasError);
    const { user_name } = this.props.user;
    const { type } = this.props.type_user;
    const errors = _.get(this.props.userError, 'data', null);
    return (
      <div>
        <NavCarbon user={user_name || null} type={type}></NavCarbon>
        <Container>
          <div className="top-h1"></div> 
          <h1 align="center">Confirmación de carga</h1>
          {errors.length > 0 ?
          <div>
            <h4 className="color-carbon">Los siguientes registros contienen errores</h4>
            <Row>
              <Col md="3" xs="12">
                <h3>Nombre</h3>
              </Col>
              <Col md="3" xs="12">
                <h3>Apellido</h3>
              </Col>
              <Col md="3" xs="12">
                <h3>Email</h3>
              </Col>
              <Col md="3" xs="12">
                <h3>Fecha de nacimiento</h3>
              </Col>
            </Row>
            {
              _.map(errors, (o) => {
                return (
                <Row>
                  <Col md="3" xs="12">
                    {o[0]}
                  </Col>
                  <br/>
                  <Col md="3" xs="12">
                    {o[1]}
                  </Col>
                  <br/>
                  <Col md="3" xs="12">
                    {o[5]}
                  </Col>
                  <br/>
                  <Col md="3" xs="12">
                    {o[4]}
                  </Col>
                  <br/>
                </Row>
                )
              })
            }
          </div>
          :
          <Container>
            <Row>
              <h4> Los registros se han cargado exitosamente </h4>
            </Row>
          </Container>
          }
        </Container>
        <Container>
          <div className="center-h-v">
            <Button className="button-carbon" onClick={() => this.props.goToRoute(`/users`)}> Volver </Button>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: _.get(state, 'user.data.user', null),
  session: _.get(state, 'user.data.session', null),
  type_user: _.get(state, 'user.type', null),
  userError: _.get(state, 'userError', null)
});

const mapDispatchToProps = dispatch => ({
  goToRoute: (payload) => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", payload)
    dispatch(push(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmCSV);
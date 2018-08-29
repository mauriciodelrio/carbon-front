import React, { Component } from 'react';
import { Container, Row, Col, Input, FormGroup, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { performLoadCsv } from './../actions';
import NavCarbon from '../components/NavCarbon';
import CSVReader from "react-csv-reader";
import { push } from 'react-router-redux';

class NuevoUsuarioCSV extends Component {
  constructor(props) {
    super(props);
    this.state = { register: null, modal: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    console.log("toggle");
    this.setState({
      modal: !this.state.modal
    });
  }

  handleForce = data => {
    console.log("dataaaa", data);
    data.shift();
    console.log("removed header", data);
    this.setState({register: data});
  }

  submit = (payload) => {
    this.props.loadCsv(this.state.register);
    this.props.goToRoute(`/user/new/csv/confirm`);
  }

  render() {
    const { isLoading, hasError } = _.get(this.props, 'user', {});
    console.log(isLoading, hasError);
    const { user_name } = this.props.user;
    const { type } = this.props.type_user;
    const info = "El Formato debe ser: \n\n";
    const header = "name,last_name,gender,institution_id,birthday,email,password \n";
    const example = "pruebacsv,csv,male,1,10-10-2000,aaa@aaaaaa.a,asdasd\npruebacsv2,csv2,female,1,10-10-2001,aaa@bbaba.a,asdasd\npruebacsv3,csv3,other,1,10-10-2002,aa@ccaaa.a,asdasd\n\n";
    const instruction = "El registro no se guardará si no se respeta el formato.";
    const register = this.state.register;
    return (
      <div>
        <NavCarbon user={user_name || null} type={type}></NavCarbon>
        <Container>
          <div className="top-h1"></div> 
          <h1 align="center">Carga masiva de usuarios</h1>
          <Row>
            <Col md="6" xs="12">
              <h4>Información</h4>
              <FormGroup>
                <Input type="textarea" name="text" id="exampleText" style={{height: "200px"}} disabled value={`${info}${header}${example}${instruction}`}/>
              </FormGroup>
            </Col>
            <Col md="6" xs="12">
              <CSVReader
              cssClass="react-csv-input"
              label="Cargar CSV"
              onFileLoaded={this.handleForce}
              />
              <p>El archivo no puede superar los 10mb.</p>
            </Col>
          </Row>
          <Row>
            <Col md="2" xs="6">
              <Button className="button-carbon" onClick={this.toggle} disabled={this.state.register? false : true}> Cargar CSV </Button>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Confirmar Registros</ModalHeader>
          <ModalBody>
          {register ?
          <div>
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
              _.map(register, (o) => {
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
                </Row>
                )
              })
            }
          </div>
          :
          null
          }
          </ModalBody>
          <ModalFooter>
            <Button className="button-carbon" onClick={this.submit}>Confirmar</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
          </ModalFooter>
        </Modal>
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
  loadCsv: (payload) => {
    dispatch(performLoadCsv(payload));
  },
  goToRoute: (payload) => {
    dispatch(push(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NuevoUsuarioCSV);
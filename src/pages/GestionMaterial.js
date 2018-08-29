import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Container, Table, Row, Col, Button } from 'reactstrap';
import { Field } from 'redux-form';
import NavCarbon from '../components/NavCarbon';
import { performGetMaterials, performChangeStateMaterial } from './../actions/material';
import FilterMaterialForm from './forms/FilterMaterialForm';
import moment from 'moment';
class GestionMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = { filter: "2" };
  }
  componentWillMount() {
    this.props.getMaterials();
  }
  changeFilter = (event) =>{
    console.log("change filter", event.target.value);
    this.setState({filter: event.target.value})
  }
  changeState = (params, material_id) => {
    console.log("newstate", params, material_id);
    const obj = {state_id: params, material_id};
    this.props.changeStateMaterial(obj);
  }
  render() {
    const { isLoading, hasError } = _.get(this.props, 'user', {});
    const { user_name } = this.props.user;
    const { type } = this.props.type_user;
    return (
      <div>
      <NavCarbon user={user_name || null} type={type}></NavCarbon>
      <Container>
        <div className="top-h1"></div> 
        <Row>
          <Col md="8" xs="12">
            <h1 align="center"> Gestión de material </h1>
          </Col>
          <Col md="4" xs="12">
            <FilterMaterialForm loginError={hasError} handleChange={this.changeFilter}/>
          </Col>
        </Row>
        <Row>
          <Col md="12" xs="12">
          { this.props.all_materials ? 
            <Table responsive>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Subido por</th>
                  <th>Categoría</th>
                  <th>Estado</th>
                  <th>Fecha de carga</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  _.map(this.props.all_materials, (o) => {
                    if(o.state_id ===this.state.filter) {
                      return (
                        <tr>
                          <td>{o.typematerial_id === "1" ? 
                            <i class="fas fa-image"></i>
                            : o.typematerial_id === "2" ?
                            <i class="fas fa-file"></i>
                            : o.typematerial_id === "3" ?
                            <i class="fas fa-file-pdf"></i>
                            : o.typematerial_id === "4" ?
                            <i class="fas fa-table"></i>
                            :
                            <i class="fas fa-question-circle"></i>
                            } {o.name}</td>
                          <td>{o.user_name} {o.user_lastname}</td>
                          <td>{o.category_name}</td>
                          <td>{o.state_id === "1" ? 'Aceptado' : o.state_id === "2" ? 'En espera' : o.state_id === "3" ? 'Rechazado' : 'Eliminado'}</td>
                          <td>{moment(o.created_at).format('DD-MM-YYYY')}</td>
                          <td>
                          {o.state_id === "1" ?
                            <div>
                            <Button onClick={() => this.changeState("3", o.material_id)}><i class="fas fa-times"></i></Button>
                            <Button onClick={() => this.changeState("4", o.material_id)}><i class="fas fa-trash"></i></Button>
                            </div>
                            : 
                            o.state_id === "2" ?
                            <div>
                              <Button onClick={() => this.changeState("1", o.material_id)}><i class="fas fa-check"></i></Button>
                              <Button onClick={() => this.changeState("3", o.material_id)}><i class="fas fa-times"></i></Button>
                              <Button onClick={() => this.changeState("4", o.material_id)}><i class="fas fa-trash"></i></Button>
                            </div>
                            : 
                            o.state_id === "3" ? 
                            <div>
                              <Button onClick={() => this.changeState("1", o.material_id)}><i class="fas fa-check"></i></Button>
                              <Button onClick={() => this.changeState("4", o.material_id)}><i class="fas fa-trash"></i></Button>
                            </div>
                            : 
                            'Eliminado'}
                            </td>
                        </tr>
                      );
                    }
                  })
                }
              </tbody>
            </Table>
            :
            null
          }
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: _.get(state, 'user.data.user', null),
  session: _.get(state, 'user.data.session', null),
  all_materials: _.get(state, 'allMaterials.data', null),
  type_user: _.get(state, 'user.type', null)
});

const mapDispatchToProps = dispatch => ({
  getMaterials: () => {
    dispatch(performGetMaterials());
  },
  changeStateMaterial: (payload) => {
    dispatch(performChangeStateMaterial(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GestionMaterial);

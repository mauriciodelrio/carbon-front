import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { Container, Table, Row, Button, Col, FormGroup, Label, Input } from 'reactstrap';
import NavCarbon from '../components/NavCarbon';
import { performMaterialById, performDownloadMaterial } from './../actions/material';
import { push } from 'react-router-redux';

class Material extends Component {
  constructor(props) {
    super(props);
    this.state = { current: null };
  }
  componentWillMount() {
    const currentMaterial = this.props.match.params.material_id;
    this.props.getMaterialById(currentMaterial)
  }

  componentWillReceiveProps(nextProps) {
    console.log("NEXT OROROROROORPRS", nextProps);
    console.log("comparationnnnn", nextProps.currentMaterial !== this.props.currentMaterial);
    if(nextProps.currentMaterial !== this.props.currentMaterial) {
      this.setState({current: nextProps.currentMaterial});
    }
  }

  download =  () => {
    console.log("click");
    this.props.download();
  }

  render() {
    const { user_name } = this.props.user;
    const { type } = this.props.type_user;
    const material = this.state.current;
    console.log("material en vistaaa", material)
    return (
      <div>
      <NavCarbon user={user_name || null} type={type}></NavCarbon>
      <Container>
        <div className="top-h1"></div> 
        <Row>
          <Col xs="12"sm="6">
            <h1 align="center"> {_.get(material, 'data.typematerial_id', '') === "1" ? 
                <i class="fas fa-image"></i>
                : _.get(material, 'data.typematerial_id', '') === "2" ?
                <i class="fas fa-file"></i>
                : _.get(material, 'data.typematerial_id', '') === "3" ?
                <i class="fas fa-file-pdf"></i>
                : _.get(material, 'data.typematerial_id', '') === "4" ?
                <i class="fas fa-table"></i>
                :
                <i class="fas fa-question-circle"></i>
                } {_.get(material, 'data.name', '')} 
            </h1>
          </Col>
          <Col xs="12"sm="3">
            <p>Subido por: {_.get(material, 'data.user_name', '')} {_.get(material, 'data.user_lastname', '')} </p>
          </Col>
          <Col xs="12"sm="3">
            <p> Creado en: {moment(_.get(material, 'data.created_at', '')).format("DD/MM/YYYY")} </p>
          </Col>
        </Row>
        <div className="top-h1"></div>
        <Row>
          <Col xs="12"sm="6">
            <FormGroup>
              <Label for="exampleText">Descripción</Label>
              <Input type="textarea" name="text" id="exampleText" disabled value={_.get(material, 'data.description', '')}/>
            </FormGroup>
          </Col >
          <Col xs="12"sm="4">
            <p> {_.get(material, 'data.typematerial_id', '') === "1" ? 
                <i class="fas fa-image"></i>
                : _.get(material, 'data.typematerial_id', '') === "2" ?
                <i class="fas fa-file"></i>
                : _.get(material, 'data.typematerial_id', '') === "3" ?
                <i class="fas fa-file-pdf"></i>
                : _.get(material, 'data.typematerial_id', '') === "4" ?
                <i class="fas fa-table"></i>
                :
                <i class="fas fa-question-circle"></i>
                } {_.get(material, 'data.typematerial_name', '')} 
            </p>
            <p>{_.get(material, 'data.category_name', '')} </p>
            <p>{_.get(material, 'data.keyword_name', '')} </p>
          </Col>
          <Col xs="12"sm="2">
            <Button className="button-carbon" onClick ={() => this.download()} download>Descargar</Button>
          </Col>
        </Row>
        <div className="top-h1"></div>
        <Row className="center-h-v">
          <div class="fb-comments" data-href="https://developers.facebook.com/docs/plugins/comments#configurator" data-width="700" data-numposts="20"></div>
        </Row>
      </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: _.get(state, 'user.data.user', null),
  session: _.get(state, 'user.data.session', null),
  type_user: _.get(state, 'user.type', null),
  currentMaterial: _.get(state, 'currentMaterial', null),
});

const mapDispatchToProps = dispatch => ({
  getMaterialById: (payload) => {
    dispatch(performMaterialById(payload));
  },
  download: (payload) => {
    dispatch(performDownloadMaterial(payload));
  },
  goToRoute: (payload) => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", payload)
    dispatch(push(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Material);

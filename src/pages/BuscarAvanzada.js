import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { push } from 'react-router-redux';
import { performChangeStateUser } from './../actions';
import { performSearchMaterial } from './../actions/material'; 
import { performGetCategories } from './../actions/categories';
import { performGetKeywords } from './../actions/keywords';
import { performGetTypes } from './../actions/types';
import BuscarAvanzadaForm from './forms/BuscarAvanzadaForm';
import NavCarbon from '../components/NavCarbon';

class BuscarAvanzada extends Component {
  constructor(props) {
    super(props);
    this.state = { date: null, params: null };
  }

  componentWillMount() {
    this.props.getCategories();
    this.props.getTypes();
    this.props.getKeywords();
  }

  submit = (payload) => {
    console.log("payload buscar!!!!", payload)
    this.setState({params: payload});
    this.props.searchMaterial(payload);
  }

  render() {
    const { isLoading, hasError } = _.get(this.props, 'user', {});
    console.log(isLoading, hasError);
    const { user_name } = this.props.user;
    const { type } = this.props.type_user;
    const categories = _.get(this.props, 'categories', []);
    const types = _.get(this.props, 'types', []);
    const keywords = _.get(this.props, 'keywords', []);
    let find_material = _.get(this.props, 'find_material', []);
    let params = this.state.params;
    return (
      <div>
        <NavCarbon user={user_name || null} type={type}></NavCarbon>
        <Container>
          <BuscarAvanzadaForm isFetching={isLoading} loginError={hasError} onSubmit={this.submit} categories={categories} types={types} keywords={keywords}/>
          {find_material ?
          <div>
            <Row>
              <Col md="3" xs="12">
                <h3>Nombre</h3>
              </Col>
              <Col md="3" xs="12">
                <h3>Descripción</h3>
              </Col>
              <Col md="3" xs="12">
                <h3>Subido Por</h3>
              </Col>
              <Col md="3" xs="12">
                <h3>Acción</h3>
              </Col>
            </Row>
            {
              _.map(_.uniqBy(find_material.map((o) => {
                if(_.get(params, 'category', o.category_id) === o.category_id && _.get(params, 'keyword', o.keyword_id) === o.keyword_id && _.get(params, 'type', o.typematerial_id) === o.typematerial_id  && (_.includes(o.name, _.get(params, 'word', o.name)) || _.includes(o.description, _.get(params, 'word', o.description)))) {
                  console.log("aaaaaaaaaaaaaaaaaaaaaaa", o);
                  return o;
                }
                }), 'name'), (o) =>{
                console.log("ooooooooooooooooooooooooooooooo", o);
                if(o) {
                  return (
                    <Row>
                      <Col md="3" xs="12">
                        {_.get(o, 'name', '')}
                      </Col>
                      <br/>
                      <Col md="3" xs="12">
                        {_.get(o, 'description', '')}
                      </Col>
                      <br/>
                      <Col md="3" xs="12">
                      {_.get(o, 'user_name', '')} {_.get(o, 'user_lastname', '')}
                      </Col>
                      <br/>
                      <Col md="3" xs="12">
                        <Button className="button-carbon-sm" onClick={() => this.props.goToRoute(`/course/${o.course_id}/material/${o.material_id}`)}>Ver detalle</Button>
                      </Col>
                    </Row>
                  )
                }
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
  find_material: _.get(state, 'findMaterials.data', null),
  categories: _.get(state, 'categories.data', null),
  types: _.get(state, 'types.data', null),
  keywords: _.get(state, 'keywords.data', null),
});

const mapDispatchToProps = dispatch => ({
  searchMaterial: (payload) => {
    dispatch(performSearchMaterial(payload));
  },
  changeStateUser: (payload) => {
    dispatch(performChangeStateUser(payload));
  },
  getCategories: (payload) => {
    dispatch(performGetCategories());
  },
  getTypes: (payload) => {
    dispatch(performGetTypes());
  },
  getKeywords: (payload) => {
    dispatch(performGetKeywords());
  },
  goToRoute: (payload) => {
    dispatch(push(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BuscarAvanzada);

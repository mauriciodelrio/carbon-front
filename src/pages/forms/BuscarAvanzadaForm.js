import React from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { Button, Form, FormGroup, Label, Row, Col } from 'reactstrap';
import RenderLoading from './../../components/RenderLoading';

let FindMaterialForm = props => { // eslint-disable-line
  const { handleSubmit, isFetching, loginError, categories, types, keywords } = props;
  const errorMessage = _.get(loginError, 'message', false);
  const errorStatus = _.get(loginError, 'status', false);
  console.log("state in componenttttt", props);
  return (
    <Form onSubmit={handleSubmit}>
      <div className="top-h1"></div> 
      <h1 align="center">Búsqueda avanzada de material</h1>
      <br/>
      <Row>
        <Col md="4" xs="12">
          <FormGroup>
            <Label for="nombre"> Buscar material </Label>
            <Field className="form-control" type="text" name="word" placeholder="Escriba alguna palabra o coincidencia" component="input" />
          </FormGroup>
        </Col>
        <Col md="2" xs="12">
          <FormGroup>
            <Label for="nombre"> Categoría </Label>
            <Field name="category" component="select">
                <option></option>
                {_.map(categories, (c) =>
                  <option value={c.category_id}>{c.category_name}</option>
                )}
              </Field>
          </FormGroup>
        </Col>
        <Col md="2" xs="12">
          <FormGroup>
            <Label for="nombre"> Tipo de material </Label>
            <Field name="type" component="select">
                <option></option>
                {_.map(types, (t) =>
                  <option value={t.typematerial_id}>{t.typematerial_name}</option>
                )}
              </Field>
          </FormGroup>
        </Col>
        <Col md="2" xs="12">
          <FormGroup>
            <Label for="nombre"> Palabra clave </Label>
            <Field name="keyword" component="select">
                <option></option>
                {_.map(keywords, (k) =>
                  <option value={k.keyword_id}>{k.keyword_name}</option>
                )}
              </Field>
          </FormGroup>
        </Col>
        <Col md="2" xs="12">
          {isFetching ? <RenderLoading /> : (
            <Button className="btn-new-user button-carbon">Buscar</Button>
          )}
        </Col>
      </Row>
      <FormGroup>
        {errorStatus && (<Label for="exampleError" style={{ color: 'red' }}>{errorMessage} ({errorStatus})</Label>)}
      </FormGroup>      
    </Form>
  );
};

FindMaterialForm = reduxForm({
  form: 'find_material',
})(FindMaterialForm);

export default FindMaterialForm;

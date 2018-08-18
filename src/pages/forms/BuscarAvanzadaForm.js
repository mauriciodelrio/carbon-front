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
      <h1>Búsqueda avanzada de material</h1>
      <br/>
      <Row>
        <Col md="4" xs="12">
          <FormGroup>
            <Label for="nombre"> Buscar material </Label>
            <Field className="form-control" type="text" name="email" placeholder="Escriba alguna palabra o coincidencia" component="input" />
          </FormGroup>
        </Col>
        <Col md="2" xs="12">
          <FormGroup>
            <Label for="nombre"> Categoría </Label>
            <Field name="category" component="select">
                <option></option>
                <option value="Male">Masculino</option>
                <option value="Female">Femenino</option>
                <option value="Other">Otro</option>
              </Field>
          </FormGroup>
        </Col>
        <Col md="2" xs="12">
          <FormGroup>
            <Label for="nombre"> Tipo de material </Label>
            <Field name="type" component="select">
                <option></option>
                <option value="Male">Masculino</option>
                <option value="Female">Femenino</option>
                <option value="Other">Otro</option>
              </Field>
          </FormGroup>
        </Col>
        <Col md="2" xs="12">
          <FormGroup>
            <Label for="nombre"> Palabra clave </Label>
            <Field name="keyword" component="select">
                <option></option>
                <option value="Male">Masculino</option>
                <option value="Female">Femenino</option>
                <option value="Other">Otro</option>
              </Field>
          </FormGroup>
        </Col>
        <Col md="2" xs="12">
          {isFetching ? <RenderLoading /> : (
            <Button color="primary" size="lg" className="btn-new-user">Buscar</Button>
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

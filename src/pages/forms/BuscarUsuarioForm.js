import React from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { Button, Form, FormGroup, Label, Row, Col } from 'reactstrap';
import RenderLoading from './../../components/RenderLoading';
import renderDatePicker from '../../components/DatePicker';

let FindUserForm = props => { // eslint-disable-line
  const { handleSubmit, isFetching, loginError, onChangeDate, currDate } = props;
  const errorMessage = _.get(loginError, 'message', false);
  const errorStatus = _.get(loginError, 'status', false);
  console.log("state in componenttttt", props);
  return (
    <Form onSubmit={handleSubmit}>
      <div className="top-h1"></div> 
      <h1 align="center">Cambiar estado Estudiante</h1>
      <br/>
      <Row>
        <Col md="6" xs="12">
          <FormGroup>
            <Label for="nombre"> Buscar Estudiante </Label>
            <Field className="form-control" type="text" name="email" placeholder="Escriba email de estudiante" component="input" />
          </FormGroup>
        </Col>
        <Col md="6" xs="12">
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

FindUserForm = reduxForm({
  form: 'find_user',
})(FindUserForm);

export default FindUserForm;

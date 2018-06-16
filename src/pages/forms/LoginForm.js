import React from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import RenderLoading from './../../components/RenderLoading';

let LoginForm = props => { // eslint-disable-line
  const { handleSubmit, isFetching, loginError } = props;
  const errorMessage = _.get(loginError, 'message', false);
  const errorStatus = _.get(loginError, 'status', false);
  return (
    <Form onSubmit={handleSubmit}>
      <h1>Inicia sesión con Email</h1>
      <FormGroup>
        <Label for="exampleEmail"> Email </Label>
        <Field className="form-control" type="email" name="email" placeholder="Email" component="input" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Contraseña</Label>
        <Field className="form-control" type="password" name="password" placeholder="Contraseña" component="input" />
      </FormGroup>
      <FormGroup>
        {errorStatus && (<Label for="exampleError" style={{ color: 'red' }}>{errorMessage} ({errorStatus})</Label>)}
      </FormGroup>
      {isFetching ? <RenderLoading /> : (
        <Button color="primary" size="lg" block className="btn-login">Ingresar</Button>
      )}
    </Form>
  );
};

LoginForm = reduxForm({
  form: 'login',
})(LoginForm);

export default LoginForm;

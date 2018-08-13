import React from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import RenderLoading from './../../components/RenderLoading';
import DatePicker from 'react-date-picker';

let NewUserForm = props => { // eslint-disable-line
  const { handleSubmit, isFetching, loginError, onChangeDate, currDate } = props;
  const errorMessage = _.get(loginError, 'message', false);
  const errorStatus = _.get(loginError, 'status', false);
  console.log("state in componenttttt", props);
  return (
    <Form onSubmit={handleSubmit}>
      <h1>Nuevo Usuario</h1>
      <br/>
      <FormGroup>
        <Label for="exampleEmail"> Email </Label>
        <Field className="form-control" type="email" name="email" placeholder="Email" component="input" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail"> Fecha de nacimiento </Label>
        <DatePicker onChange={onChangeDate} value={new Date()}/>  
        <Field className="form-control" type="text" name="birthday" component="input" value={currDate} />     
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Contraseña</Label>
        <Field className="form-control" type="password" name="password" placeholder="Contraseña" component="input" />
      </FormGroup>
      <FormGroup>
        {errorStatus && (<Label for="exampleError" style={{ color: 'red' }}>{errorMessage} ({errorStatus})</Label>)}
      </FormGroup>
      {isFetching ? <RenderLoading /> : (
        <div align="center">
        <Button color="primary" size="lg" block className="btn-new-user">Añadir Nuevo Usuario</Button>
        </div>
      )}
    </Form>
  );
};

NewUserForm = reduxForm({
  form: 'new_user',
})(NewUserForm);

export default NewUserForm;

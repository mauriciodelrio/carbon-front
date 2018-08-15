import React from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { Button, Form, FormGroup, Label, Row, Col } from 'reactstrap';
import RenderLoading from './../../components/RenderLoading';
import renderDatePicker from '../../components/DatePicker';

let NewUserForm = props => { // eslint-disable-line
  const { handleSubmit, isFetching, loginError, onChangeDate, currDate } = props;
  const errorMessage = _.get(loginError, 'message', false);
  const errorStatus = _.get(loginError, 'status', false);
  console.log("state in componenttttt", props);
  return (
    <Form onSubmit={handleSubmit}>
      <h1>Nuevo Estudiante</h1>
      <br/>
      <Row>
        <Col md="6" xs="12">
          <FormGroup>
            <Label for="nombre"> Nombre </Label>
            <Field className="form-control" type="text" name="name" placeholder="Nombre" component="input" />
          </FormGroup>
        </Col>
        <Col md="6" xs="12">
          <FormGroup>
            <Label for="apellido"> Apellido </Label>
            <Field className="form-control" type="text" name="lastname" placeholder="Apellido" component="input" />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="3" xs="12">
          <FormGroup>
            <Label for="exampleEmail"> Género </Label>
            <Field name="gender" component="select">
                <option></option>
                <option value="Male">Masculino</option>
                <option value="Female">Femenino</option>
                <option value="Other">Otro</option>
              </Field>
          </FormGroup>
        </Col>
        <Col md="3" xs="12">
          <FormGroup>
            <Label for="birthdate"> Fecha de nacimiento </Label>
            <Field name="birthdate" component={renderDatePicker} dateFormat="DD.MM.YYYY" showYearDropdown={true} />    
          </FormGroup>
        </Col>
        <Col md="3" xs="12">
          <FormGroup>
            <Label for="universidad"> Universidad </Label>
            <Field className="form-control" type="text" name="university" placeholder="USACH" value="USACH" component="input" disabled/>
          </FormGroup>
        </Col>
        <Col md="3" xs="12">
          <FormGroup>
            <Label for="estudiante"> Tipo </Label>
            <Field className="form-control" type="text" name="type" placeholder="Estudiante" value="ESTUDIANTE" component="input" disabled/>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="6" xs="12">
          <FormGroup>
            <Label for="exampleEmail"> Email </Label>
            <Field className="form-control" type="email" name="email" placeholder="Email" component="input" />
          </FormGroup>
        </Col>
        <Col md="6" xs="12">
          <FormGroup>
            <Label for="examplePassword">Contraseña</Label>
            <Field className="form-control" type="password" name="password" placeholder="Contraseña" component="input" />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        {errorStatus && (<Label for="exampleError" style={{ color: 'red' }}>{errorMessage} ({errorStatus})</Label>)}
      </FormGroup>
      {isFetching ? <RenderLoading /> : (
        <div align="center">
        <Button color="primary" size="lg" className="btn-new-user">Añadir Nuevo Estudiante</Button>
        </div>
      )}
    </Form>
  );
};

NewUserForm = reduxForm({
  form: 'new_user',
})(NewUserForm);

export default NewUserForm;

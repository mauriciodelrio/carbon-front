import React from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { Form, FormGroup, Label, Row, Col } from 'reactstrap';

let FilterMaterialForm = props => { // eslint-disable-line
  const { handleChange, loginError } = props;
  const errorMessage = _.get(loginError, 'message', false);
  const errorStatus = _.get(loginError, 'status', false);
  console.log("state in componenttttt", props);
  return (
    <Form>
      <Row>
        <FormGroup>
          <Label for="nombre"> Estado </Label>
          <Field name="type" component="select" onChange={handleChange}>
              <option value="2">En Espera</option>
              <option value="1">Aceptado</option>
              <option value="3">Rechazado</option>
              <option value="4">Eliminado</option>
            </Field>
        </FormGroup>
      </Row>
      <FormGroup>
        {errorStatus && (<Label for="exampleError" style={{ color: 'red' }}>{errorMessage} ({errorStatus})</Label>)}
      </FormGroup>      
    </Form>
  );
};

FilterMaterialForm = reduxForm({
  form: 'filter_material',
})(FilterMaterialForm);

export default FilterMaterialForm;

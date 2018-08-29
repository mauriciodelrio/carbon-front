import React from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { Button, Form, FormGroup, Label, Row, Col } from 'reactstrap';
import CreatableSelect from 'react-select/lib/Creatable';

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const FileInput = ({ 
  input: { value: omitValue, onChange, onBlur, ...inputProps }, 
  meta: omitMeta, 
  ...props 
}) => {
  return (
    <input
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...props.input}
      {...props}
    />
  );
};

const TextArea = ({
    name,
    input,
    className,
    meta: {
        touched, error, warning
    }
}) => {
  return (
    <textarea
      onBlur={input.onBlur}
      onChange={input.onChange}
      value={input.value}
      name={name}
      className={className}
    />
  );
}

const Multi = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps }, 
  meta: omitMeta, 
  dataset: dataset,
  ...props 
}) => {
  console.log("aaaasasdsadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdasdadaaaaaaaaaaaaasda", dataset)
  return (
    <CreatableSelect
      isMulti
      onChange={onChange}
      options={dataset}
    />
  );
}

let NewMaterialForm = props => { // eslint-disable-line
  const { handleSubmit, isFetching, loginError, depts, careers, courses, categories, keywords, types, getCareers, getCourses, getKeywords } = props;
  let errorMessage = _.get(loginError, 'message', false);
  const errorStatus = _.get(loginError, 'status', false);
  const viii = _.map(keywords, (o) => {return {[`${o.keyword_id}`]: o.keyword_name} })
  console.log("state in componenttttt", props);
  console.log("viiiiiiiiiiiii", viii);
  return (
    <Form onSubmit={handleSubmit}>
      <div className="top-h1"></div> 
      <h1 align="center">Nuevo Material</h1>
      <br/>
      <Row>
        <Col md="4" xs="12">
          <FormGroup>
            <Label for="departament"> Departamento </Label>
            <Field className="form-control" name="departament" component="select" onChange={getCareers}>
                <option></option>
                {_.map(depts, (d) =>
                  <option value={d.departament_id}>{d.departament_name}</option>
                )}
              </Field>
          </FormGroup>
        </Col>
        <Col md="4" xs="12">
          <FormGroup>
            <Label for="career"> Carrera </Label>
            <Field className="form-control" name="career" component="select" onChange={getCourses}>
                <option></option>
                {_.map(careers, (c) =>
                  <option value={c.career_id}>{c.career_name}</option>
                )}
              </Field>
          </FormGroup>
        </Col>
        <Col md="4" xs="12">
          <FormGroup>
            <Label for="course"> Curso </Label>
            <Field className="form-control" name="course" component="select">
                <option></option>
                {_.map(courses, (co) =>
                  <option value={co.course_id}>{co.course_name}</option>
                )}
              </Field>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="4" xs="12">
          <FormGroup>
            <Label for="category"> Categoría </Label>
            <Field className="form-control" name="category" component="select">
                <option></option>
                {_.map(categories, (ca) =>
                  <option value={ca.category_id}>{ca.category_name}</option>
                )}
              </Field>  
          </FormGroup>
        </Col>
        <Col md="4" xs="12">
          <FormGroup>
            <Label for="keyword"> Palabras claves </Label>
            <Field className="form-control" name="keyword" component={Multi} onChange={getKeywords} dataset={_.map(keywords, (o) => {return {"label": o.keyword_name, "value": `${o.keyword_id}`} })}>
            </Field>
          </FormGroup>
        </Col>
        <Col md="4" xs="12">
          <FormGroup>
            <Label for="type"> Tipo </Label>
            <Field className="form-control" name="type" component="select">
                <option></option>
                {_.map(types, (t) =>
                  <option value={t.typematerial_id}>{t.typematerial_name}</option>
                )}
              </Field>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="6" xs="12">
          <FormGroup>
            <Label for="estudiante"> Nombre </Label>
            <Field className="form-control" type="text" name="name" placeholder="nombre" component="input" value />
          </FormGroup>
          <FormGroup>
            <Label for="desc"> Descripción </Label>
            <Field className="form-control" name="description" type="input" placeholder="descripción" component={TextArea} />
          </FormGroup>
        </Col>
        <Col md="6" xs="12">
          <FormGroup>
            <Label for="examplePassword">Carga de archivo</Label>
            <Field className="form-control" name="file" component={FileInput} type="file"/>
          </FormGroup>
          <FormGroup>
            <div align="center">
              <Button className="btn-new-user button-carbon">Añadir Nuevo Material</Button>
            </div>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        {errorStatus && (<Label for="exampleError" style={{ color: 'red' }}>{errorMessage} ({errorStatus})</Label>)}
      </FormGroup>
    </Form>
  );
};

NewMaterialForm = reduxForm({
  form: 'new_material',
})(NewMaterialForm);

export default NewMaterialForm;

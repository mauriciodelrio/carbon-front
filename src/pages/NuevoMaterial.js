import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { performGetDepartamentsByInstitution } from './../actions/departaments';
import { performGetCareersByDepartament } from './../actions/careers';
import { performGetCoursesByCareer } from './../actions/careers';
import { performGetCategories } from './../actions/categories';
import { performGetKeywords } from './../actions/keywords';
import { performGetTypes } from './../actions/types';
import { performCreateMaterial } from './../actions/material';
import NuevoMaterialForm from './forms/NuevoMaterialForm';
import NavCarbon from '../components/NavCarbon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NuevoMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = { date: null, depts: null, careers: null, courses: null, currDept: null, currCareer: null, currkeywords: null };
  }

  submit = (payload) => {
    const { user_id } = this.props.user;
    const valuesMaterial = {
      material: {
        name: payload.name,
        state_id: "2",
        course_id: payload.course,
        description: payload.description,
        student_id: user_id,
        path: "/test",
        mimetype_id: "1",
      },
      category_id: payload.category,
      keywords: payload.keyword,
      typematerial_id: payload.type,
      file: payload.file
    }
    console.log("values material", valuesMaterial);
    this.props.createMaterial(valuesMaterial);
  }

  componentWillMount = (payload) => {
    const { institution_id } = this.props.user;
    this.props.getDepartamentsByInstitution(institution_id);
    this.props.getCategories();
    this.props.getTypes();
    this.props.getKeywords();
  }

  getCareers = (event) => {
    this.setState({currDept: event.target.value})
    this.props.getCareersByDepartament(event.target.value);
  }

  getCourses = (event) => {
    this.setState({currCareer: event.target.value})
    this.props.getCoursesByCareers(event.target.value);
  }

  getKeywords = (newValue, actionMeta) => {
    console.log(newValue);
    this.setState({currkeywords: newValue});
  }
  componentWillReceiveProps(nextProps) {
    console.log("NEXT OROROROROORPRS", nextProps);
    if(nextProps.departaments !== this.props.departaments) {
      this.setState({depts: nextProps.departaments});
    }
    if(nextProps.careers !== this.props.careers) {
      this.setState({careers: nextProps.careers});
    }
    if(nextProps.courses !== this.props.courses) {
      this.setState({courses: nextProps.courses});
    }
  }

  render() {
    const { isLoading, hasError } = _.get(this.props, 'user', {});
    console.log(isLoading, hasError);
    const { user_name, institution_id } = this.props.user;
    const categories = _.get(this.props, 'categories', []);
    const types = _.get(this.props, 'types', []);
    const keywords = _.get(this.props, 'keywords', []);
    const { currDept, currCareer } = this.state;
    const { type } = this.props.type_user;
    return (
      <div>
        <NavCarbon user={user_name || null} type={type}></NavCarbon>
        <Container>
          <NuevoMaterialForm 
            isFetching={isLoading} 
            loginError={hasError} 
            onSubmit={this.submit} 
            depts={_.get(this.state, `depts[${institution_id}].data`, null)} 
            careers={_.get(this.state, `careers[${currDept}].data`, null)} 
            courses={_.get(this.state, `courses[${currCareer}].data`, null)}
            categories={categories}
            keywords={keywords}
            types={types}
            getCareers = {this.getCareers}
            getCourses = {this.getCourses}
            getKeywords = {this.getKeywords}
            />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: _.get(state, 'user.data.user', null),
  session: _.get(state, 'user.data.session', null),
  type_user: _.get(state, 'user.type', null),
  departaments: _.get(state, 'departaments', []),
  careers: _.get(state, 'careers', []),
  courses: _.get(state, 'courses', []),
  categories: _.get(state, 'categories.data', null),
  types: _.get(state, 'types.data', null),
  keywords: _.get(state, 'keywords.data', null),
});

const mapDispatchToProps = dispatch => ({
  getDepartamentsByInstitution: (payload) => {
    dispatch(performGetDepartamentsByInstitution(payload));
  },
  getCareersByDepartament: (payload) => {
    dispatch(performGetCareersByDepartament(payload));
  },
  getCoursesByCareers: (payload) => {
    dispatch(performGetCoursesByCareer(payload));
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
  createMaterial: (payload) => {
    dispatch(performCreateMaterial(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NuevoMaterial);

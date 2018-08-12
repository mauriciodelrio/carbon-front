import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Container, Table, Row } from 'reactstrap';
import NavCarbon from '../components/NavCarbon';
import InstitutionBox from '../components/InstitutionBox';
import { performGetInstitutions } from './../actions/institutions';

class Carpetas extends Component {
  componentWillMount() {
    this.props.getInstitutions();
  }
  render() {
    const { user_name } = this.props.user;
    const { type } = this.props.type_user;
    return (
      <div>
      <NavCarbon user={user_name || null} type={type}></NavCarbon>
      <Container>
        <h1> Búsqueda por carpetas </h1>
      <InstitutionBox />
      </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: _.get(state, 'user.data.user', null),
  session: _.get(state, 'user.data.session', null),
  institutions: _.get(state, 'institutions.data', null),
  type_user: _.get(state, 'user.type', null)
});

const mapDispatchToProps = dispatch => ({
  getInstitutions: () => {
    dispatch(performGetInstitutions());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Carpetas);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Container, Table, Row, Button } from 'reactstrap';
import NavCarbon from '../components/NavCarbon';
import { performGetCoursesByCareer } from './../actions/careers';
import { performCareerById } from './../actions/careers';
import { push } from 'react-router-redux';

class DetalleCarrera extends Component {
  constructor(props) {
    super(props);
    this.state = { current: null, courses: [] };
  }
  componentWillMount() {
    const currentCareer = this.props.match.params.career_id;
    this.props.getCareerById(currentCareer)
    this.props.getCoursesByCareer(currentCareer)
  }

  componentWillReceiveProps(nextProps) {
    console.log("NEXT OROROROROORPRS", nextProps);
    console.log("comparationnnnn", nextProps.currentCareer !== this.props.currentCareer);
    if(nextProps.currentCareer !== this.props.currentCareer) {
      this.setState({current: nextProps.currentCareer});
    }
  }

  render() {
    const { user_name } = this.props.user;
    const { type } = this.props.type_user;
    const career = this.state.current;
    const courses = this.props.courses;
    console.log("career en vistaaa", career)
    return (
      <div>
      <NavCarbon user={user_name || null} type={type}></NavCarbon>
      <Container>
        <h1>{_.get(career, 'data.career_name', '')} </h1>
        {_.get(courses, `${this.props.match.params.career_id}.data`, []).length ?
        <Table responsive>
          <thead>
            <tr>
              <th>Curso</th>
              <th>Descripción</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            {
              _.map(_.get(courses, `${this.props.match.params.career_id}.data`, []), (o) => {
                return (
                  <tr>
                    <td>{o.course_name}</td>
                    <td>{o.description}</td>
                    <td>
                      <a color="link" onClick={() => this.props.goToRoute(`/career/${this.props.match.params.career_id}/course/${o.course_id}/materials`)}>
                        Ver Contenido
                      </a>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
        :
        <h3>Aún no existen cursos registrados para esta carrera</h3>
        }
      </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: _.get(state, 'user.data.user', null),
  session: _.get(state, 'user.data.session', null),
  type_user: _.get(state, 'user.type', null),
  currentCareer: _.get(state, 'currentCareer', null),
  courses: _.get(state, 'courses', null)
});

const mapDispatchToProps = dispatch => ({
  getCoursesByCareer: (payload) => {
    dispatch(performGetCoursesByCareer(payload));
  },
  getCareerById: (payload) => {
    dispatch(performCareerById(payload));
  },
  goToRoute: (payload) => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", payload)
    dispatch(push(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleCarrera);

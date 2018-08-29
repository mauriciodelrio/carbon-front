import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { Container, Table, Row, Button } from 'reactstrap';
import NavCarbon from '../components/NavCarbon';
import { performGetMaterialsByCourse } from './../actions/courses';
import { performCourseById } from './../actions/courses';
import { push } from 'react-router-redux';

class DetalleMateriales extends Component {
  constructor(props) {
    super(props);
    this.state = { current: null, materials: [] };
  }
  componentWillMount() {
    const currentCourse = this.props.match.params.course_id;
    this.props.getCourseById(currentCourse)
    this.props.getMaterialsByCourse(currentCourse)
  }

  componentWillReceiveProps(nextProps) {
    console.log("NEXT OROROROROORPRS", nextProps);
    console.log("comparationnnnn", nextProps.currentCourse !== this.props.currentCourse);
    if(nextProps.currentCourse !== this.props.currentCourse) {
      this.setState({current: nextProps.currentCourse});
    }
  }

  render() {
    const { user_name } = this.props.user;
    const { type } = this.props.type_user;
    const course = this.state.current;
    const materials = this.props.materials;
    console.log("course en vistaaa", course)
    return (
      <div>
      <NavCarbon user={user_name || null} type={type}></NavCarbon>
      <Container>
        <div className="top-h1"></div> 
        <h1 align="center">{_.get(course, 'data.data.course_name', '')} </h1>
        {_.get(materials, `${this.props.match.params.course_id}`, []).length ?
        <Table responsive>
          <thead>
            <tr>
              <th>Material</th>
              <th>Descripción</th>
              <th>Subido En</th>
              <th>Subido Por</th>
              <th>Categoría</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            {
              _.map(_.get(materials, `${this.props.match.params.course_id}`, []), (o) => {
                return (
                  <tr>
                    <td>{o.typematerial_id === "1" ? 
                    <i class="fas fa-image"></i>
                    : o.typematerial_id === "2" ?
                    <i class="fas fa-file"></i>
                    : o.typematerial_id === "3" ?
                    <i class="fas fa-file-pdf"></i>
                    : o.typematerial_id === "4" ?
                    <i class="fas fa-table"></i>
                    :
                    <i class="fas fa-question-circle"></i>
                    } {o.name}</td>
                    <td>{o.description}</td>
                    <td>{moment(o.created_at).format("DD-MM-YYYY")}</td>
                    <td>{o.user_name} {o.user_lastname}</td>
                    <td>{o.category_name}</td>
                    <td>
                      <a className="color-carbon" onClick={() => this.props.goToRoute(`/course/${this.props.match.params.course_id}/material/${o.material_id}`)}>
                        Ver Detalle
                      </a>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
        :
        <h3>Aún no existen materiales registrados para este curso</h3>
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
  currentCourse: _.get(state, 'currentCourse', null),
  materials: _.get(state, 'materials', null)
});

const mapDispatchToProps = dispatch => ({
  getMaterialsByCourse: (payload) => {
    dispatch(performGetMaterialsByCourse(payload));
  },
  getCourseById: (payload) => {
    dispatch(performCourseById(payload));
  },
  goToRoute: (payload) => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", payload)
    dispatch(push(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleMateriales);

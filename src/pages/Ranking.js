import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Container, Table, Row } from 'reactstrap';
import NavCarbon from '../components/NavCarbon';
import { performGetInstitutions } from './../actions/institutions';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  componentWillMount() {
    this.props.getInstitutions();
  }
  render() {
    const { user_name } = this.props.user;
    const { type } = this.props.type_user;
    let iterator = 0;
    return (
      <div>
      <NavCarbon user={user_name || null} type={type}></NavCarbon>
      <Container>
        <div className="center">
        <h1> Ranking Universidades </h1>
        <Table >
          <thead>
            <tr>
              <th>Posición</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Cantidad de contribuciones</th>
            </tr>
          </thead>
          <tbody>
            {
              _.map(this.props.institutions, (o) => {
                iterator += 1;
                return (
                  <tr>
                    <td># {iterator} {iterator === 1 ? <i class="fas fa-star"></i> : iterator === 2 ? <i class="fas fa-star"></i> : iterator === 3 ? <i class="fas fa-star"></i> : null}</td>
                    <td>{o.institution_name} <i class="fas fa-university"></i></td>
                    <td>{o.institution_description}</td>
                    <td>{o.institution_points}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
        <h5> El Equipo de <Link to={'/'} >Carbon</Link> Agradece a toda la comunidad por sus aportes. <i class="fas fa-heart"></i></h5>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);

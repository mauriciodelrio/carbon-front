import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Container, Table } from 'reactstrap';
import NavCarbon from '../components/NavCarbon';
import { performGetInstitutions } from './../actions';

class Ranking extends Component {
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
        <h1> Ranking Universidades </h1>
        <Table responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad de contribuciones</th>
            </tr>
          </thead>
          <tbody>
            {
              _.map(this.props.institutions, function(o) {
                return (
                  <tr>
                    <td>{o.institution_name}</td>
                    <td>{o.institution_points}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
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

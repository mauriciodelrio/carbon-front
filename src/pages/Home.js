import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Container, Row, Col } from 'reactstrap';
import NavCarbon from '../components/NavCarbon';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { performGetTypeUser } from './../actions';

class Home extends Component {

  componentWillMount() {
    console.log("cwm en home", this.props.user);
    const { user_id } = this.props.user;
    this.props.getTypeUser(user_id);
  }

  render() {
    const { user_name } = this.props.user;
    const { session_created_at = moment() } = this.props.session
    const { type } = this.props.type_user
    const user_files = this.props.user_files
    console.log("aaaaaaaa", this.props.user)
    console.log("props en vista", this.props.user);
    return (
      <div>
      <NavCarbon user={user_name || null} type={type}></NavCarbon>
      <Container>
        <Row className="center">
          <h1 className="center"> Bienvenid@ {user_name} </h1>
        </Row>
        <Row className="center">
          <Col xs="6" sm="4">Archivos subidos al sistema: {0}</Col>
          <Col xs="6" sm="4">Archivos descargados por: {0} personas</Col>
          <Col xs="6" sm="4">Última sesión activa: {moment(this.props.session).format('DD-MM-YYYY')} </Col>
        </Row>
        { user_files ?
        <Row className="center">
          <h1 className="center"> Últimos archivos subidos </h1>
        </Row>
        :
        <Row className="center">
          <Row className="center">
            <h1 className="center"> Todavía no has subido material a carbon </h1>
            <h1 className="color-carbon"> ¿Te gustaría contribuir con la comunidad? </h1>
          </Row> 
          <Row className="center">
            <Col sm="12">
              <div className="vod">
                <Link to={'/upload'} ><button className="btn" >Subir Material</button></Link>
              </div>
            </Col>
          </Row>  
        </Row>
        }
      </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: _.get(state, 'user.data.user', null),
  session: _.get(state, 'user.data.session', null),
  user_files: _.get(state, 'user_files', null),
  type_user: _.get(state, 'user.type', null)
});

const mapDispatchToProps = dispatch => ({
  getTypeUser: (payload) => {
    dispatch(performGetTypeUser(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

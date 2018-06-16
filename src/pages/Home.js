import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Container } from 'reactstrap';
import NavCarbon from '../components/NavCarbon';

class Home extends Component {

   render() {
     const { user_name } = this.props.user;
     console.log("props en vista", this.props.user);
     return (
       <div>
        <NavCarbon user={user_name || null} type='Student'></NavCarbon>
        <Container>
          <h1> Bienvenid@ {user_name} </h1>
        </Container>
       </div>
     );
   }
}

const mapStateToProps = state => ({
  user: _.get(state, 'user.data', null)
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

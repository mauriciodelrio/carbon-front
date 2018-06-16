import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { performLogout } from './../actions';

class ErrorHandler extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.doLogout();
    }, 4000);
  }
  render() {
    return (
      <section id="password">
        <div className="container">
          <div className="row text-c">
            <div className="col-12">
              <img src={require('./../assets/img/carbon_logo_ico-01.png')} />
            </div>
          </div>
        </div>

        <div className="col-12">
          <h1> Ocurrió un error, esta siendo direccionado. </h1>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doLogout: () => {
    dispatch(performLogout());
    dispatch(push('/'));
  },
});

export default connect(null, mapDispatchToProps)(ErrorHandler); 


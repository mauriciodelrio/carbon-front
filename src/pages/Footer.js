import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Footer extends Component {
  render() {
    return (
      <div id="footer">
        <div className="row">
          <div className="col-md-2 flogo-m"><img className="img-fluid" src={require('../assets/img/carbon_logo_horizontal.svg')} alt="carbon" /></div>
          <div className="col-md-5">
          </div>
          <div className="col-md-2 flogo-d"><img className="img-fluid" src={require('../assets/img/carbon_logo_horizontal.svg')} alt="carbon" /></div>
          <div className="col-md-5">
            <ul className="footer-social">
              <li><p>Siguenos en</p></li>
              <li><a><i className="fa fa-facebook" aria-hidden="true" /><noscript /></a></li>
              <li><a><i className="fa fa-twitter" aria-hidden="true" /><noscript /></a></li>
              <li><a><i className="fa fa-instagram" aria-hidden="true" /><noscript /></a></li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul className="footer-menu">
              <li><p>Carbon.cl Tu red social educativa. {new Date().getFullYear()}</p></li>
              <li><Link target='_blank' to='/terms'><p>Términos y Condiciones</p></Link></li>
              <li><Link target='_blank' to='/privacy'><p>Privacidad</p></Link></li>
              <li><Link target='_blank' to='/ask'><p>Preguntas Frecuentes</p></Link></li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="dflex row align-items-center">
          <div className="col-md-10">
            <p className="flegal">
              Carbon.cl es un proyecto universitario pensado para la comunidad, el software está bajo la licencia MIT.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);


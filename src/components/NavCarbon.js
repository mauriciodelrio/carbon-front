import React, { Component } from 'react';
import { connect } from 'react-redux';
//import _ from 'lodash';
import { Nav, NavItem, NavLink } from 'reactstrap';

class NavCarbon extends Component {

  render() {
    console.log("state in navCarbon", this.props);
    return (
      <div>
        <Nav className="nav-carbon">
          <NavItem>
          <img className="img-fluid logo-carbon" src={require('../assets/img/carbon_logo_ico.svg')} alt="carbon" />
          </NavItem>
          <NavItem>
            <NavLink href="/search" className="link-bar"><i className="fa fa-folder-open fa-3x color-ico" aria-hidden="true" />Búsqueda por carpetas</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/upload" className="link-bar"><i className="fa fa-upload fa-3x color-ico" aria-hidden="true" />Subir material</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/advanced-search" className="link-bar"><i className="fa fa-search fa-3x color-ico" aria-hidden="true" />Búsqueda avanzada</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/ranking" className="link-bar"><i className="fa fa-university fa-3x color-ico" aria-hidden="true" />Ranking de universidades</NavLink>
          </NavItem>
          <Nav className="justify-content-end">
            <NavItem>
              <NavLink href="/logout" className="link-bar"><i className="fa fa-user fa-3x color-ico" aria-hidden="true" />Cerrar sesión</NavLink>
            </NavItem>
          </Nav>
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NavCarbon);

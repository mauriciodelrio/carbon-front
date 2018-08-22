import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { performLogout } from './../actions';

class NavCarbon extends Component {
  render() {
    console.log(this.props);
    const { isLoading, hasError } = _.get(this.props, 'user', {});
    console.log(isLoading, hasError);
    const { user_name, user_lastname } = this.props.user;
    console.log("state in navCarbon", this.props);
    return (
      <div>
        <Nav className="nav-carbon">
          <NavItem>
          <img className="img-fluid logo-carbon" src={require('../assets/img/carbon_logo_ico.svg')} alt="carbon" />
          </NavItem>
          <NavItem>
            <NavLink href="/folders" className="link-bar"><i className="fa fa-folder-open fa-2x color-ico" aria-hidden="true" />Búsqueda por carpetas</NavLink>
          </NavItem>
          {this.props.type === 'student' && 
          (<NavItem>
            <NavLink href="/upload" className="link-bar"><i className="fa fa-upload fa-2x color-ico" aria-hidden="true" />Subir material</NavLink>
          </NavItem>)
          }
          {this.props.type === 'administrator' && 
          (<NavItem>
            <NavLink href="/users" className="link-bar"><i className="fas fa-users-cog fa-2x color-ico" aria-hidden="true" />Gestionar usuarios</NavLink>
          </NavItem>)
          }
          {this.props.type === 'editor' && 
          (<NavItem>
            <NavLink href="/admin-materials" className="link-bar"><i className="fas fa-key fa-2x color-ico" aria-hidden="true" />Gestionar material</NavLink>
          </NavItem>)
          }
          <NavItem>
            <NavLink href="/advanced-search" className="link-bar"><i className="fa fa-search fa-2x color-ico" aria-hidden="true" />Búsqueda avanzada</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/ranking" className="link-bar"><i className="fa fa-university fa-2x color-ico" aria-hidden="true" />Ranking de universidades</NavLink>
          </NavItem>
          <Nav className="justify-content-end">
            <NavItem>
              <NavLink href="/login" className="link-bar" onClick={this.props.doLogout}><i className="fa fa-user fa-2x color-ico" aria-hidden="true" />{user_name} {user_lastname}<br/>     (Cerrar sesión)</NavLink>
            </NavItem>
          </Nav>
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: _.get(state, 'user.data.user', null),
  session: _.get(state, 'user.data.session', null),
  type_user: _.get(state, 'user.type', null)
});

const mapDispatchToProps = dispatch => ({
  doLogout: () => {
    console.log("click")
    dispatch(performLogout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavCarbon);

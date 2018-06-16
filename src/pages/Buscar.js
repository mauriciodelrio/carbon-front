import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import 'url-search-params-polyfill';

class Buscar extends Component {
  handleItemClick = () => {
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h2> Resultados de búsqueda </h2>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Buscar);

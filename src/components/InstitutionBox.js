import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import DepartamentBox from './DepartamentBox';
import { Container, Button, CardBody, Card, Col } from 'reactstrap';


class InstitutionBox extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle(institution_id) {
    this.setState({[`clicked_${institution_id}`]: !this.state[`clicked_${institution_id}`]});
  }

  componentWillMount(){
    this.props.institutions.map( i =>
      this.setState({[`clicked_${i.institution_id}`]: false})
    )
  }
  render() {
    console.log("en box", this.props.institutions)
    return (
      <div>
        {this.props.institutions.map(i =>{
          return (    
            <Col>
              <Button color="link" onClick={() => this.toggle(i.institution_id)} style={{ marginBottom: '1rem' }}>
                <i class="fa fa-folder fa-2x" aria-hidden="true"></i>
                {i.institution_name}
              </Button>
              <Container id={i.institution_id}>
                {
                  this.state[`clicked_${i.institution_id}`] ?
                  <Card>
                    <CardBody>
                      <DepartamentBox institution_id={i.institution_id}/>
                    </CardBody>
                  </Card>
                  :
                  null
                }

              </Container>
            </Col>
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  institutions: _.get(state, 'institutions.data', []),
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(InstitutionBox);

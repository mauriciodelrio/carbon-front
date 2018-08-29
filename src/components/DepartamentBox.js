import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { performGetDepartamentsByInstitution } from './../actions/departaments';
import { Container, Button, CardBody, Card } from 'reactstrap';
import CareerBox from './CareerBox';

class DepartamentBox extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle(departament_id) {
    this.setState({[`clicked_${departament_id}`]: !this.state[`clicked_${departament_id}`]});
  }

  componentWillMount(){
    this.props.getDepartamentsByInstitution(this.props.institution_id);
  }
  
  componentDidMount(){
    this.props.departaments[this.props.institution_id] && this.props.departaments[this.props.institution_id].data.map( d =>
      this.setState({[`clicked_${d.departament_id}`]: false})
    )
  }
  render() {
    return (
      <div>
        {this.props.departaments[this.props.institution_id] && this.props.departaments[this.props.institution_id].data.map(d =>{
          return (
            <div>
              <Button outline color="danger" onClick={() => this.toggle(d.departament_id)} style={{ marginBottom: '1rem' }}>
                <i class="fa fa-folder-open fa-2x color-ico-open" aria-hidden="true"></i>
                {d.departament_name}
              </Button>
              <Container id={d.departament_id}>
                {
                  this.state[`clicked_${d.departament_id}`] ? 
                  <Card>
                    <CardBody>
                      <CareerBox institution_id= {this.props.institution_id} departament_id={d.departament_id}/>
                    </CardBody>
                  </Card>
                  :
                  null
                }

              </Container>
            </div>
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  departaments: _.get(state, 'departaments', []),
});


const mapDispatchToProps = dispatch => ({
  getDepartamentsByInstitution: (payload) => {
    dispatch(performGetDepartamentsByInstitution(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartamentBox);
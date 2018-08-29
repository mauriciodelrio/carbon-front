import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { performGetCareersByDepartament } from './../actions/careers';
import { Button } from 'reactstrap';
import { push } from 'react-router-redux';

class CareerBox extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.getCareersByDepartament(this.props.departament_id);
  }
  
  render() {
    return (
      <div>
        {this.props.careers[this.props.departament_id] && this.props.careers[this.props.departament_id].data.map(c =>{
          return (
            <div>
              <Button outline color="danger" onClick={() => this.props.goToRoute(`${this.props.institution_id}/${this.props.departament_id}/career/${c.career_id}`)}>
                <i class="fa fa-folder-open fa-2x color-ico-open" aria-hidden="true"></i>
                {c.career_name}
              </Button>
              <div className="top-h1"></div> 
            </div>
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  careers: _.get(state, 'careers', []),
});


const mapDispatchToProps = dispatch => ({
  getCareersByDepartament: (payload) => {
    dispatch(performGetCareersByDepartament(payload));
  },
  goToRoute: (payload) => {
    dispatch(push(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CareerBox);
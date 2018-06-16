import React, { Component } from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

export default class RenderLoading extends Component {
  render() {
    return (
      <RefreshIndicator
        size={50}
        left={-25}
        top={0}
        loadingColor="#D55677"
        status="loading"
        style={{
          display: 'block',
          position: 'relative',
          marginLeft: '50%',
          marginTop: '50px',
          marginBottom: '50px',
        }}
      />
    );
  }
}


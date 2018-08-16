import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { scroller } from 'react-scroll';
import { Card, CardImg, CardText, CardBody, 
CardTitle, CardSubtitle } from 'reactstrap';

class Landing extends Component {
  
  handleScrollToElement = (element) => { // element = ID of element.
    scroller.scrollTo(element, {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 0,
    });
  };

  render() {
    const logo = require('../assets/img/carbon_logo_horizontal.svg');
    return (
      <div>
        <section className="landing-section" id="intro">
          <div className="container-fluid">
            <div className="row">
              <div className="intro-left col-sm-10">
                <img className="img-fluid logo" src={logo} alt="carbon" />
                <h1> Material de estudios para tod@s</h1>
                <h2>Tu red social educativa que te conecta con miles de estudiantes</h2>
                <Link to={'/login'} ><button className="btn" >Ingresa acá</button></Link>
                <h5>Colabora con tus apuntes</h5>
                <h6>Miles de estudiantes agradecerán tu contenido</h6>
              </div>

            </div>
            <div className="intersection row">
              <i 
                style={{ cursor: 'pointer' }} onClick={() => this.handleScrollToElement('second')}
                className="fa fa-angle-down fa-2x" aria-hidden="true"
              />
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-9">
                <h1><i className="fa fa-search" aria-hidden="true" /> Busca Material</h1>
                <h5>Según las categorías definidas en carbon.</h5>
                <div className="right-elem">
                  <h1> Filtra Contenido  <i className="fa fa-filter" aria-hidden="true" /></h1>
                  <h5>Utiliza palabras claves para acceder al material que buscas</h5>
                </div>
                <div className="left-elem">
                  <h1> <i className="fa fa-comment" aria-hidden="true" />Comenta el material</h1>
                  <h5>El feedback es muy importante para nosotr@s y para la comunidad</h5>
                </div>
                <div className="vod">
                  <Link to={'/login'} ><button className="btn">Conoce más</button></Link>
                </div>
              </div>
            </div>
            <div className="intersection row">
              <i
                style={{ cursor: 'pointer' }} onClick={() => this.handleScrollToElement('teams')}
                className="fa fa-angle-down fa-2x" aria-hidden="true"
              />
            </div>
          </div>
        </section>
        <section className="landing-section" id="teams">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <h1>NUESTRO EQUIPO</h1>
                <div className="row top">
                  <div className="col-sm-3 card">
                    <Card>
                        <CardImg 
                          top 
                          width = "100%" 
                          className = "card-img" 
                          src={require('../assets/img/javi.png')} 
                          alt="Card image cap" 
                        />
                        <CardBody>
                          <CardTitle>Javiera Mendoza</CardTitle>
                          <CardSubtitle>LCC - USACH</CardSubtitle>
                          <CardText>
                            Dueña de producto y Arquitecta del sistema.
                          </CardText>
                        </CardBody>
                      </Card>
                  </div>
                  <div className="col-sm-3 card">
                    <Card>
                      <CardImg top width="100%" className="card-img" src={require('../assets/img/mauro.png')} alt="Card image cap" />
                      <CardBody>
                        <CardTitle>Mauricio Del Río</CardTitle>
                        <CardSubtitle>LCC - USACH</CardSubtitle>
                        <CardText>Scrum Master y Arquitecto del sistema.</CardText>
                      </CardBody>
                    </Card>
                  </div>
                  <div className="col-sm-3 card">
                    <Card>
                      <CardImg top width="100%" className="card-img" src={require('../assets/img/gustavo.jpg')} alt="Card image cap" />
                      <CardBody>
                        <CardTitle>Gustavo Rojas</CardTitle>
                        <CardSubtitle>LCC - USACH</CardSubtitle>
                        <CardText>Arquitecto del sistema.</CardText>
                      </CardBody>
                    </Card>
                  </div>
                  <div className="col-sm-3 card">
                    <Card>
                      <CardImg top width="100%" className="card-img" src={require('../assets/img/bryan.png')} alt="Card image cap" />
                      <CardBody>
                        <CardTitle>Bryan Nuñez</CardTitle>
                        <CardSubtitle>LCC - USACH</CardSubtitle>
                        <CardText>Arquitecto del sistema.</CardText>
                      </CardBody>
                    </Card>  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

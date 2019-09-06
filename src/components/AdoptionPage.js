import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';

class AdoptionPage extends Component {

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/api/dog`)
    .then(res =>
      res.json())
      .then(data => {
        this.props.petData(data)
      })
      .catch(error => {
        console.log(error);
      })
  }






  render() {
    return (
      <div className=''>
        <h3>Adoption page</h3>
      </div>
    )
  }

}

export default AdoptionPage;
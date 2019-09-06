import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends Component {

  render() {
    return (
      <div className='Landing-container'>
        <h3>Welcome to the FIFO adoption agencey</h3>
        <p>This adoption website will allow you to look for and adopt cute, animals.</p>
        <h3>Adoption Process</h3>
        <ul>
          <li>When you press the 'Start' button you will be taken to the animals page</li>
          <li>The order at which you enter the 'Queue' will be the order in which you can adopt a pet</li>
          <li>When your number is first in-line you will be able to adopt a pet</li>
        </ul>

        <Link to='/adoption'>
          <button>Start!</button>
        </Link>
        
      </div>
    )
  }

}

export default LandingPage;
import React, { Component } from 'react';
import API from './API';
//import config from '../config';
import './AdoptionPage.css'

let interval;

class AdoptionPage extends Component {

  state = {
    user_name : null,
    position : '',
    dog : null,
    cat : null
  }

  componentDidMount() {
    interval = setInterval(() => {
      if (this.state.user_name) {
        API.callApi(`position?user=${this.state.user_name}`)
        .then(data => {
          this.setState({
            position : data.position
          })
        })
        .catch(error => {
          
        })
      }
    }, 15000)
    Promise.all([
      API.callApi('dog'),
      API.callApi('cat')
    ]).then(data => {
      this.setState({
        dog : data[0],
        cat : data[1]
      })
    })
  }

  // endpoint, method='GET', body=null

  componentWillUnmount() {
    clearInterval(interval);
  }

  handleUserSubmit = (e) => {
    e.preventDefault();
    const user_name = e.target['Name'].value
    console.log(user_name)
    API.callApi('users', 'POST', {user : user_name}).then(data => {
      this.setState({
      user_name : user_name,
      position : data.position
      })
    }).catch(error => {
      alert(error)
    })

    console.log('testing')
    
  }

  handleDogAdoptSubmit(e) {
    e.preventDefault();
    console.log('testing Dog')

  }

  handleCatAdoptSubmit(e) {
    e.preventDefault();
    console.log('testing Cat')

  }

  





  render() {
    return (
      <div className='main-container'>
        <h2>Adoption page</h2>
          <div>
          <h4>User Queue Submission</h4>
          <form className='adoption-form' onSubmit={this.handleUserSubmit}>
            Name
            <input type='text' name='Name'></input>
            <button>Submit</button>
          </form>
          <p>You are in the queue {this.state.user_name}</p>
          <p>Postition in Queue: {this.state.position}</p>
        </div>

        <div className='adoption-container'>
          <div className='dog-container'> 
            <div className='dog'>
              <h3>Dog</h3>
              <img src={this.state.dog && this.state.dog.imageURL} alt="Puppy Dog"/>
              <p>Description: {this.state.dog && this.state.dog.imageDescription}  </p>
              <p>Name: {this.state.dog && this.state.dog.name}</p>
              <p>Sex: {this.state.dog && this.state.dog.sex}</p>
              <p>Age: {this.state.dog && this.state.dog.age}</p>
              <p>Breed: {this.state.dog && this.state.dog.breed}</p>
              <p>Story: {this.state.dog && this.state.dog.story}</p>
              <button onClick={this.handleDogAdoptSubmit} disabled={this.state.position !== 1}>Adopt</button>
            </div>
          </div> 
          

          <div className='cat-container'>
            <div className='cat'>
              <h3>Cat</h3>
              <img src={this.state.cat && this.state.cat.imageURL} alt="Italian Trulli"/>
              <p>Description: {this.state.cat && this.state.cat.imageDescription}</p>
              <p>Name: {this.state.cat && this.state.cat.name}</p>
              <p>Sex: {this.state.cat && this.state.cat.sex}</p>
              <p>Age: {this.state.cat && this.state.cat.age}</p>
              <p>Breed: {this.state.cat && this.state.cat.breed}</p>
              <p>Story: {this.state.cat && this.state.cat.story}</p>
              <button onClick={this.handleCatAdoptSubmit} disabled={this.state.position !== 1}>Adopt</button>
            </div>
          </div>
        </div>

        <div className='user-queue-container'>
          <div id='user-queue'>
            
          </div>
        </div>

      </div>
    )
  }

}

export default AdoptionPage;
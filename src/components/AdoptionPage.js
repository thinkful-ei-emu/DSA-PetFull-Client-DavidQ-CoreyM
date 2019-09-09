import React, { Component } from 'react';
import API from './API';
//import config from '../config';
import './AdoptionPage.css'

let interval;
let pos1Interval;

class AdoptionPage extends Component {

  state = {
    user_name : null,
    position : '',
    timer:30,
    dog : null,
    cat : null,
    message : ''
  }

  componentDidMount() {
    interval = setInterval(() => {
      if (this.state.user_name) {
        API.callApi(`users/position?user=${this.state.user_name}`)
        .then(data => {
          if(data.position === 1) {
            pos1Interval = setInterval(() =>{ 
              if(this.state.timer < 1 ){
                clearInterval(pos1Interval);
                this.setState({message:'Time has Expired please rejoin queue'})
              }
              else
                this.setState({timer:--this.state.timer})
            }, 1000);
          }
          this.setState({
            position : data.position
          })
        })
        .catch(error => {
          console.log(error)
        })
      }
    }, 10000)
    Promise.all([
      API.callApi('dog'),
      API.callApi('cat')
    ]).then(data => {
      this.setState({
        dog : data[0],
        cat : data[1]
      })
    }).catch(error => {
      console.log(error)
    })
  }

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
      console.log(error)
    })
    
  }

  handleAdoptSubmit = (e, pet) => {
    e.preventDefault();
    
    API.callApi('users/adopt', 'POST', {user : this.state.user_name, pet})
    .then(() => {
      this.setState({
        user_name : null,
        position : null,
        message : 'You adopted a pet!'
      })
        clearInterval(interval);
      Promise.all([
        API.callApi('dog'),
        API.callApi('cat')
      ]).then(data => {
        this.setState({
          dog : data[0],
          cat : data[1]
        })
      }).catch(error => {
        console.log(error)
      })
    })
  }
  

  render() {
    return (
      <div className='main-container'>
        <h2>Adoption page</h2>

          <div>

          <p>timer: {this.state.timer}</p>

          {!this.state.user_name && <form className='adoption-form' onSubmit={this.handleUserSubmit}>
          <h4>User Queue Submission</h4>
            <p>Submit your name to enter the Queue</p>
            Name
            <input type='text' name='Name'></input>
            <button>Submit</button>
          </form>}

          {this.state.user_name && <div className='welcome-text'>
          <p>Welcome to the Queue: {this.state.user_name}</p>
          <p>Postition in Queue: {this.state.position}</p>
          </div>}

          {this.state.message && <p className='adopted-message'>{this.state.message}</p>}

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
              <button onClick={(e) => this.handleAdoptSubmit(e,'dog')} disabled={this.state.position !== 1}>Adopt</button>
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
              <button onClick={(e) => this.handleAdoptSubmit(e,'cat')} disabled={this.state.position !== 1}>Adopt</button>
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
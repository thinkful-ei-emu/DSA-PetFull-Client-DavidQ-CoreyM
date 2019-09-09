import React, { Component } from 'react';
import API from './API';

state = {
  dog : null,
  cat : null
}


AnimalPreview = () => {
  Promise.all([
    API.callApi('allCats'),
    API.callApi('allDogs')
  ]).then(data => {
    this,setState({
      dog : data.name,
      cat : data.name
    })
  })
}












componentDidMount() {
  interval = setInterval(() => {
    if (this.state.user_name) {
      API.callApi(`users/position?user=${this.state.user_name}`)
      .then(data => {
        if(data.position === 1) {
          pos1Interval = setInterval(() => timer--, 1000)
        }
        this.setState({
          position : data.position
        })
      })
      .catch(error => {
        console.log(error)
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
  }).catch(error => {
    console.log(error)
  })
}
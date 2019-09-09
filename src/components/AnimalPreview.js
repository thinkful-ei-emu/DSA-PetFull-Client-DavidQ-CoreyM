import React from 'react';
import API from './API';

let cats;
let dogs;

function PreviewAnimals(props) {

  Promise.all([
    API.callApi('cat/allcats'),
    API.callApi('dog/alldogs')
  ]).then(data => {
    cats = data[0].map(cats => {
      console.log(cats.name === props.currentCat)
      if(cats.name === props.currentCat) {
        return (
          <div className='current'>
            <div className='cat-preview-current'>
              <img src={cats.imageURL} id='cat-img' alt="Italian Trulli"/>
              <p>Name: {cats.name}</p> 
            </div>
          </div>
        )
      }
      return (
        <div className='cat-container-preview'>
          <div className='cat-preview'>

            <img src={cats.imageURL} id='cat-img' alt="Italian Trulli"/>
            <p>Name: {cats.name}</p>
              
          </div>
        </div>
      )
    })
    

    dogs = data[1].map(dogs => {
      if(dogs.name === props.currentDog) {
        return (
          <div className='cat-container-preview'>
            <div className='cat-preview'>
  
              <img src={dogs.imageURL} id='cat-img' alt="Italian Trulli"/>
              <p>Name: {dogs.name}</p>
                
            </div>
          </div>
        )}
      return (
        <div className='cat-container-preview'>
          <div className='cat-preview'>

            <img src={dogs.imageURL} id='cat-img' alt="Italian Trulli"/>
            <p>Name: {dogs.name}</p>
              
          </div>
        </div>
      )
    })
  })
    
  
  
  return (
      <div>
        {cats}
        {dogs}
      </div>
        )

}




export default PreviewAnimals;
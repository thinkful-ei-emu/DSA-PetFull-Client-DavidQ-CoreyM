//import config from '../config'
import 'dotenv'


class API {
  // constructor() {
  //   // this.url = `${config.REACT_APP_API_ENDPOINT}/api`;
  // }
  
  
  static callApi(endpoint, method='GET', body=null) {
    const url = `https://blooming-badlands-93561.herokuapp.com/api/`
      const options = {
        headers : {
          'content-type': 'application/json'
        },
        body: body ? JSON.stringify(body) : null,
        method
      }

      console.log(url)
      return fetch(url + endpoint, options).then(data => {
        if (data.ok) {
          return data.json()
        } else {
           return Promise.reject(new Error(data.statusText))
        }
      
      })
    
    
    }
  
  
  }

export default API;
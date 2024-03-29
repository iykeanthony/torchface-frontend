import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register'
import Signin from './components/Signin/Signin';
const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'b3e156a39a1b45a5b0f6cdf98e7511b8'
});


const optionsForParticles = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
    }
  }

  loadUser=(data)=>{
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }
    })
  }
  calculateFaceLocation =(data)=>{
    const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col *width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => { 
    this.setState({box: box});
    console.log(box)
  }
  
  onInputChange = (event) => {
    console.log(event);
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    console.log('click');
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if(response){
          fetch('https://afternoon-ravine-32146.herokuapp.com/image',
          {
            method: 'put',
            headers:{'Content-Type':'application/json'},
            body:  JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response=> response.json())
          .then(count =>{
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => {
        console.log(err);
      });
  }


  onRouteChange=(route)=>{
    if(route === 'signout'){
       this.setState({isSignedIn: false})
    }else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
      this.setState({route: route})
  }


  render() {
    return (
      <div className="App">
        <Particles
          params={optionsForParticles} className="particles" />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        <Logo />
        {this.state.route === 'home'
        ?<div>
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
        </div>
        :(
          this.state.route==='signin'
          ?<Signin loadUser={this.loadUser}  onRouteChange={this.onRouteChange} />
          :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
        } 
      </div>
    );
  }
}

export default App;

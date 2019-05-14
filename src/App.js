import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import { withStyles } from '@material-ui/core/styles'
// import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button/Button'
import DaumMap from 'daum-maps-react'

class App extends Component {
  state = {
    list: [],
    markers: []
  }

  addMarkers = (daum, map) =>{
    this.state.list.forEach(v=>{
      const marker = new daum.maps.Marker({
        position: new daum.maps.LatLng(v.y, v.x)
      })
  
      marker.setMap(map)
      // this.setState({
      //   markers: this.state.markers.push(marker)
      // }) 
    })
  }

  findLatLng = (element, daum) =>{
    daum.maps.load(()=>{
      const places = new daum.maps.services.Places()
      places.keywordSearch('효원로308번길', (res)=>{
        this.setState({
          list : res
        })
        console.log(res)

        this.customRender(element, daum)
        return
      })
    })
  }

  customRender = async (element, daum) => {
    console.log(element, daum, this) // map element, daum api, Example Component
    // this.findLatLng(element, daum)

    const lat = 37.3955241655064, lng = 127.113420313007
    if(this.state.list.length != 0)
    daum.maps.load(() => {
        const map = new daum.maps.Map(element, {
            center: new daum.maps.LatLng(this.state.list[0].y, this.state.list[0].x),
            level: 3
        })
        const marker = new daum.maps.Marker({
            position: new daum.maps.LatLng(this.state.list[0].y, this.state.list[0].x)
        })
        marker.setMap(map)

        this.addMarkers(daum, map)
    })
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div style={{width: '500px', height: '500px'}}>
            <DaumMap
              apiKey='1e40426f3b6c5127cd7237c62fe56cee'
              mapId={'daum-map'}
              render={this.findLatLng}
            />
          </div>
          <Button variant="contained" color="primary">Hello world</Button>
        </header>
      </div>
    );
  }
}

export default App;

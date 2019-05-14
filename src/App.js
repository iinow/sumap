import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import { withStyles } from '@material-ui/core/styles'
// import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button/Button'
import DaumMap, { propTypes } from 'daum-maps-react'
import Data from './resources/suwon.json'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});
let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
class App extends Component {
  state = {
    list: [],
    markers: [],
    data: undefined
  }

  containData = (obj) => {
    let spl = obj.place_name.split(' ')
    console.log(spl)

    let map = new Map()
    map.forEach((k, v)=>{
      
    })
    // this.state.data
  }

  addData = () => {
    let map = new Map()
    let str = '영통구'
    Data.forEach(d => {
      if (map.get(d.addr) == undefined) {
        if(d.addr.includes(str))
          map.set(d.addr, [])
      }
      if (map.get(d.addr) != undefined)
        map.get(d.addr).push(d)
    })

    this.setState({
      data: map
    })

    console.log(this.state.data)
    // this.state.data.map(())
  }

  addMarkers = (daum, map) => {
    this.state.list.forEach(v => {
      this.containData(v)

      const marker = new daum.maps.Marker({
        position: new daum.maps.LatLng(v.y, v.x),
        clickable: true
      })

      daum.maps.event.addListener(marker, 'click', () => {
        new daum.maps.InfoWindow({
          content: `<div style="padding:5px;color:black;font-size:60%">${v.place_name}</div>`,
          removable: true
        }).open(map, marker)
      })
      marker.setMap(map)
      // this.setState({
      //   markers: this.state.markers.push(marker)
      // }) 
    })
  }

  findLatLng = (element, daum) => {
    this.addData()
    daum.maps.load(() => {
      const places = new daum.maps.services.Places()
      places.keywordSearch('봉영로1517번길', (res) => {
        this.setState({
          list: res
        })
        console.log(res)

        this.customRender(element, daum)
        return
      })
    })
  }

  customRender = async (element, daum) => {
    console.log(element, daum, this) // map element, daum api, Example Component

    if (this.state.list.length != 0)
      daum.maps.load(() => {
        const map = new daum.maps.Map(element, {
          center: new daum.maps.LatLng(this.state.list[0].y, this.state.list[0].x),
          level: 3
        })
        const marker = new daum.maps.Marker({
          position: new daum.maps.LatLng(this.state.list[0].y, this.state.list[0].x),
          clickable: true
        })

        daum.maps.event.addListener(marker, 'click', () => {
          new daum.maps.InfoWindow({
            content: '<div style="padding:5px;color:black;">Hello World!</div>',
            removable: true
          }).open(map, marker)
        })

        marker.setMap(map)

        this.addMarkers(daum, map)
      })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <span>
            <div style={{ width: '1024px', height: '700px', margin: '50px' }}>
              <DaumMap
                apiKey='1e40426f3b6c5127cd7237c62fe56cee'
                mapId={'daum-map'}
                render={this.findLatLng}
              />
            </div>
            <Paper className={this.props.root}>
              <Table className={this.props.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>주소</TableCell>
                    <TableCell align="right">개수</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    this.state.data != undefined ? rows.map(row => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                      </TableRow>
                    )) : ''
                  }
                </TableBody>
              </Table>
            </Paper>
          </span>

          {/* <Button variant="contained" color="primary">Hello world</Button> */}

        </div>
      </div>
    );
  }
}

export default App;

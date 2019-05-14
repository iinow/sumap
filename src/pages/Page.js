import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Data from '../resources/suwon.json'
import '../App.css';

export default class Page extends Component {
    state = {
        data: new Array()
    }

    addData = () => {
        let map = new Map()
        let str = '영통구'
        Data.forEach(d => {
            if (map.get(d.addr) == undefined) {
                if (d.addr.includes(str))
                    map.set(d.addr, [])
            }
            if (map.get(d.addr) != undefined)
                map.get(d.addr).push(d)
        })
        
        let res = new Array()
        // map.forEach((v, k))
        map.forEach((v, k)=>{
            v.forEach(d=>{
                res.push(d)
            })
        })
        
        this.setState({
            data: res
        })
        console.log(res)
    }

    componentDidMount = () => {
        this.addData()
    }

    render() {
        return (
            <div className="App">
                <div style={{ width: '1024px', height: '700px', margin: '50px' }}>
                    <Paper className={this.props.root}>
                        <Table className={this.props.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>주소</TableCell>
                                    <TableCell align="right">이름</TableCell>
                                    <TableCell align="right">휴대폰 번호</TableCell>
                                    {/* <TableCell align="right">Fat (g)</TableCell>
                    <TableCell align="right">Carbs (g)</TableCell>
                    <TableCell align="right">Protein (g)</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.data.map(row => (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                {row.addr}
                                            </TableCell>
                                            <TableCell align="right">{row.name}</TableCell>
                                            <TableCell align="right">{`${row.num1}-${row.num2}-${row.num3}`}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </div>
        )
    }
}
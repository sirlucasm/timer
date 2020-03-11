import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button,
  TextField
} from '@material-ui/core';
import {
  Modal,
} from 'react-bootstrap';

import './../../style/Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configured: false,
      showModal: false,
      counting: false,
      setTime: 0,
      minutes: 0,
      seconds: 0,
      colors: {
        initialBG: '#1d76db',
        countingBG: '#b82727',
        finishBG: '#27b85c',
      },
      secondsChoosed: 0,
      minutesChoosed: 0
    }
  }

  setBgColor = () => {
    if(!this.state.setTime) return this.state.colors.initialBG
    else if(this.state.setTime === 1) return this.state.colors.countingBG
    else if(this.state.setTime === 2) return this.state.colors.finishBG
  }

  getMinutesChoosed = (minutesChoosed) => { this.setState({ minutesChoosed }) }
  getSecondsChoosed = (secondsChoosed) => { this.setState({ secondsChoosed }) }

  timerChoose = () => {
    if(!this.state.counting){
      this.setState({ 
        minutes: this.state.minutesChoosed, 
        seconds: this.state.secondsChoosed, 
        configured: true,
        showModal: false
      })
    }
  }

  playTimer = () => {
    this.setState({ counting: true, setTime: 1 })
    var counter = setInterval(() => {
      if(this.state.seconds > 0){
        this.setState({ seconds: this.state.seconds - 1 })
      }
      if(this.state.seconds===0) {
        if(this.state.minutes===0) {
          this.setState({ counting: false, setTime: 2 })
          clearInterval(counter);
        }else{
          this.setState({ minutes: this.state.minutes-1, seconds: 59 })
        }
      }      
    }, 1000)
  }

  stopCounter = () => {
    this.setState({
      counting: false,
      setTime: 2,
      minutes: 0,
      seconds: 0
    })
  }

  handleShow = () => this.setState({ showModal: true })
  handleClose = () => this.setState({ showModal: false })

  render() {   
    return (
      <div className="timer" style={{backgroundColor:this.setBgColor(),}}>
        <div className="row justify-content-center">
          <h2 className="my-4">React Timer</h2>
        </div>
        <div className="container timer_countdown">
          <div className="row justify-content-center">
            <div className="timer_number_edit">
              <strong>
                {this.state.minutes<10?'0'+this.state.minutes:this.state.minutes}
                :
                {this.state.seconds<10?'0'+this.state.seconds:this.state.seconds}
              </strong>
            </div>
          </div>
          <div className="row justify-content-center buttons_area">
            <div className="buttons_content">
              <div>
                {!this.state.counting?<Button className="rounded-circle" onClick={() => this.handleShow()}><i className="material-icons md-48">settings</i></Button>:null}
                {this.state.configured?<Button className="rounded-circle" onClick={() => this.playTimer()}><i className="material-icons md-48">{!this.state.counting?'play_arrow':'pause'}</i></Button>:null}
                {this.state.counting?<Button className="rounded-circle" onClick={() => this.stopCounter()}><i className="material-icons md-48">stop</i></Button>:null}
              </div>
            </div>
          </div>
        </div>
        <Modal show={this.state.showModal} onHide={this.handleClose} style={{ color: '#000', }}>
          <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <strong className="ml-2">Choose an time for countdown</strong>
            </div>
            <div className="row">
              <TextField className="time_choose ml-3 mr-1" id="standard-basic" label="min" type="number" onInput={(e) => this.getMinutesChoosed(e.target.value)} />
              <p className="mt-4">:</p>
              <TextField className="time_choose ml-2" id="standard-basic" label="sec" type="number" onInput={(e) => this.getSecondsChoosed(e.target.value)} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="contained" color="primary" onClick={() => this.timerChoose()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

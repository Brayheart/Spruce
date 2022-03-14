import "./modal.css";
import PropTypes from "prop-types";
import React, { useState } from 'react';
import Axios from "axios";

export default class Modal extends React.Component {

  state = {
    name: "test",
    email: 'test',
    address: 'test',
    city: 'test',
    state: 'test',
    zip: 'test',
    type: 'test',
    date: 'test',
    time: 'test'
  }

  addCustomer = () => {

    var timeSplit = this.state.time.split(":"),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }

    var time = hours + ':' + minutes + ' ' + meridian

    Axios.post("http://localhost:3001/create", {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      type: this.state.type,
      date: this.state.date,
      time: time
    }).then(() => {
      console.log('success')
    });
  };

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div  className='modal-container'>
        <div className='modal'>
        <h2>Create Booking</h2>
        <div className="content">

          <div>
            <div className='title'>Name</div>
            <input onChange={(event) => this.setState({name: event.target.value})} className='input-full' type="text" id="fname" name="fname" required></input>
            <div className='title'>Email</div>
            <input onChange={(event) => this.setState({email: event.target.value})} className='input-full' type="email" id="fname" name="fname"></input>
            <div className='title'>Street Address</div>
            <input onChange={(event) => this.setState({address: event.target.value})} className='input-full' type="text" id="fname" name="fname"></input>
            <div className='title'>City</div>
            <input onChange={(event) => this.setState({city: event.target.value})}  className='input-full' type="text" id="fname" name="fname"></input>
            <div style={{display: 'flex'}}>
              <div className='half' >
                <div className='title'>State</div>
                <input onChange={(event) => this.setState({state: event.target.value})}  className='input-half' type="text" id="fname" name="fname"></input>
              </div>
              <div className='half half2'>
                <div className='title'>Zip Code</div>
                <input onChange={(event) => this.setState({zip: event.target.value})}  className='input-half' type="number" id="fname" name="fname"></input>
              </div>
            </div>
          </div>
        <div>
          <div className='title'>Booking Type</div>
          <select onChange={(event) => this.setState({type: event.target.value})}>
              <option value="">-- Please Select an Option--</option>
              <option value="HouseKeeping">HouseKeeping</option>
              <option value="Dog walk">Dog walk</option>
          </select>

          <div className='title'>Booking Date</div>
          <input onChange={(event) => this.setState({date: event.target.value})}  className='input-full' type="date" id="fname" name="fname"></input>
          <div className='title'>Booking Time</div>
          <input onChange={(event) => this.setState({time: event.target.value})} className='input-full' type="time" id="fname" name="fname"></input>

          <div>
            <button onClick={() => {
              this.onClose();
              this.addCustomer();
              this.props.getCustomers();
            }} className='create-bookings button'>Create Booking</button>
          </div>
        </div>
        </div>
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

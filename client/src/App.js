import React from "react";
import Modal from "./Component/Modal.js";
import "./App.css";
import Axios from "axios";
import { ReactComponent as Svg } from './logo.svg';

class App extends React.Component {

  state = {
    show: false,
    customers: []
  };
  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

  getCustomers = () => {
    Axios.get("http://localhost:3001/customers").then((response) => {
      this.setState({ customers: response.data})
    });
  }

  componentDidMount = () => {
    this.getCustomers()
  }

  sortDate = () => {
    this.state.customers.sort((a, b) => (new Date(a.date)) - (new Date(b.date)))
  }

  dateConvert = () => {
    this.state.customers.map(el => {
      var date = new Date(el.date);
      var options = {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
      var sDay = date.toLocaleDateString("en-US", options);
      el.date = sDay
    })
  }

  render() {
    this.sortDate()
    this.dateConvert()
    return (
      <div className="App">

      <div className='nav'>
        <div className='svg'><Svg/></div>
      </div>


      <div className='header-container'>
        <div className='bookings'>Bookings</div>
        <button
          className='create-bookings'
          onClick={e => {
            this.showModal(e);
          }}
        >
          {" "}
          Create Booking{" "}
        </button>
      </div>

      <div className='table-container'>
        <table className='table'>
        <tbody>
          <tr>
            <th className='table-header'>Customer</th>
            <th className='table-header'>Email</th>
            <th className='table-header'>Address</th>
            <th className='table-header'>Booking Type</th>
            <th className='table-header'>Booking Date/Time</th>
          </tr>
          {this.state.customers.map(customer => {
            return (
              <tr>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.address}</td>
                <td>{customer.type}</td>
                <td>{customer.date + ' at ' + customer.time}</td>
              </tr>
            )
          })}
        </tbody>
        </table>
      </div>

       <Modal  getCustomers={this.getCustomers} onClose={this.showModal} show={this.state.show}></Modal>
      </div>
    );
  }
}

export default App;

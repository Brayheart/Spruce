import React from "react";
import Modal from "./Component/Modal.js";
import "./App.css";
import Axios from "axios";
import { ReactComponent as Svg } from './logo.svg';
import Posts from './Component/Posts'
import Pagination from './Component/Pagination';

class App extends React.Component {

  state = {
    show: false,
    currentPage: 1,
    postsPerPage: 10,
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
    // Get current posts
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.customers.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => this.setState({currentPage: pageNumber});

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

        <Posts posts={currentPosts}  />
        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.customers.length}
          paginate={paginate}
        />
        <Modal
          getCustomers={this.getCustomers}
          onClose={this.showModal}
          show={this.state.show}>
        </Modal>
    </div>
    );
  }
}

export default App;

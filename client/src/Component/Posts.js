import React from 'react';

const Posts = ({ posts }) => {
    return (
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
          {posts.map(customer => {
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
    )
};

export default Posts;

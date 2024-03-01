import React, { useState, useEffect } from 'react';
import Data from '../apis/Data';

function Custmers({ currentPage, sortBy, sortOrder }) {
  const [customers, setCustomers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Data.get(`?page=${currentPage}&searchTerm=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
        setCustomers(response.data.data.records);
        setTotalPages(response.data.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, searchTerm, sortBy, sortOrder]); // Update dependencies to include sortBy and sortOrder
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className="container">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or location"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.sno}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
              <td>{customer.date}</td>
              <td>{customer.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Custmers;

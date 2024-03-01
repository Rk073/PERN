import React, { useState, useEffect } from 'react';
import Custmers from '../components/Custmers';
import Data from '../apis/Data';

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [sortBy, setSortBy] = useState("date"); // Default sorting by date
  const [sortOrder, setSortOrder] = useState("ASC"); // Default sorting order

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Data.get("/", {
          params: { page: currentPage, sortBy, sortOrder } // Include sorting parameters
        });
        const { data } = response.data;
        setCustomers(data.records);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, sortBy, sortOrder]); // Update dependencies to include sortBy and sortOrder

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSortByDate = () => {
    setSortBy("date");
  };

  const handleSortByTime = () => {
    setSortBy("time");
  };

  // Function to toggle sorting order between ASC and DESC
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
  };

  return (
    <div className="row mt-5 ">
      <div className="col-12 text-center">
        <h1 >Welcome to our Customer Management System</h1>
        <p className="lead">This is the home page of our application.</p>
      </div>
      <div className="container">
    <div className="row mt-5">
      <div className="col-md-12 text-right">
        <div className="sorting">
          <button className="btn btn-primary mr-2" onClick={handleSortByDate}>Sort by Date</button>
          <button className="btn btn-primary mr-2" onClick={handleSortByTime}>Sort by Time</button>
          <button className="btn btn-primary" onClick={toggleSortOrder}>Toggle Sort Order</button>
        </div>
      </div>
    </div>
  </div>
      <Custmers currentPage={currentPage} sortBy={sortBy} sortOrder={sortOrder} />
      <div className='col-md-12 text-right'>
      <div className="pagination">
        <button
          className="btn btn-primary"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
}

export default Home;

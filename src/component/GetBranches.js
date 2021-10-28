import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import "./getBranches.css";
import ReactPaginate from "react-paginate";

const GetBranches = () => {
    //branchData state to store the api response
    const [branchData, setBranchData] = useState([]);
    //city state variable
    const [city, setCity] = useState(null);

    //fetching the api data using axios
    const getBranchData = async (cityName) => {
        try {
            const response = await axios.get(
                `https://vast-shore-74260.herokuapp.com/banks`,
                {
                    params: { city: cityName },
                }
            );
            setBranchData(response);
        } catch (error) {
            console.log(error);
        }
    };

    //destructing the data field from the response api
    const { data } = branchData;
    if (data && data.length > 0) {
        localStorage.setItem("apiCall", JSON.stringify(data));
    }

    

    //Using react-paginate for pagination
    //Pagination
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * perPage;
    let currentPageData;
    let pageCount;
    if (data) {
        currentPageData = data.slice(offset, offset + perPage).map((item) => {
            return (
                <tr key={item.ifsc}>
                    
                    <td>{item.bank_id}</td>
                    <td>{item.branch}</td>
                    <td>{item.bank_name}</td>
                    <td>{item.ifsc}</td>
                    <td>{item.address}</td>
                    <td>{item.city}</td>
                    <td>{item.district}</td>
                    <td>{item.state}</td>
                </tr>
            );
        });
        pageCount = Math.ceil(data.length / perPage);
    }

    //getting the search value from the search bar
    const handleSearch = (val) => {
        setCity(val.target.value.toUpperCase());
    };

    //handling the pagination
    const handleResultPerPage = (e) => {
        setPerPage(e.target.value);
    };
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    useEffect(() => {
        getBranchData(city);
    }, [city]);

    return (
        <div className="hero">
            <h1 className="heading">
                Bank Branches

            </h1>
            <div className="dataInputField">
                <div className="dropdownMenu">
                    <select id="city" name="city" onChange={handleSearch}>
                        <option value="none" selected disabled hidden>
                            Select a city
                        </option>
                        <option value="MUMBAI">Mumbai</option>
                        <option value="DELHI">Delhi</option>
                        <option value="JAIPUR">Jaipur</option>
                        <option value="LUCKNOW">Lucknow</option>
                        <option value="JODHPUR">Jodhpur</option>
                    </select>
                </div>
                <span>OR</span>
                <div className="searchInput">
                    <input
                        type="text"
                        id="ipBranch"
                        placeholder="Please Enter a city"
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {/* data */}
            <div className="branches">
                <h2>Showing results for the city: {city}</h2>

                <div>
                    <h3>Results per page:</h3>
                    <select
                        id="results"
                        name="results"
                        onChange={handleResultPerPage}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="60">60</option>
                        <option value="100">100</option>
                        <option value="150">150</option>
                        <option value="200">200</option>
                    </select>
                </div>

                <table>
                    <tr>
                        
                        <th>Bank Id</th>
                        <th>Branch</th>
                        <th>Bank Name</th>
                        <th>IFSC Code</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>District</th>
                        <th>State</th>
                    </tr>
                    {/* Show loading here */}

                    {data && data.length === 0 ? <Loader /> : currentPageData}
                </table>

                {/* Pagination */}
                <div className="pagination-container">
                    {data && data.length > 0 ? (
                        <ReactPaginate
                            previousLabel={"← Previous"}
                            nextLabel={"Next →"}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            previousLinkClassName={"pagination__link"}
                            nextLinkClassName={"pagination__link"}
                            disabledClassName={"pagination__link--disabled"}
                            activeClassName={"pagination__link--active"}
                        />
                    ) : (
                        " "
                    )}
                </div>
            </div>
        </div>
    );
};

export default GetBranches;

import React from 'react'
import Pagination from '@mui/material/Pagination';
import "../pagination/pagin.css"


  export default function CustomPagination({ setPage, numofpages=10}) {
    // Scroll to top when page changes
    const handlePageChange = (page) => {
      setPage(page);
      window.scroll(0, 0);
    };
  
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: 15,
        }}
      >
          <Pagination
            className='pagination'
            onChange={(e) => handlePageChange(e.target.textContent)}
            count={numofpages}
            color="secondary"
          />
      </div>
    );
  }
  
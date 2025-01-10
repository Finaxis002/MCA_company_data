

import React, { useEffect, useState } from 'react';

// API details
const baseURL = 'https://api.data.gov.in/resource/4dbe5667-7b6b-41d7-82af-211562424d9a';
const apiKey = '579b464db66ec23bdd000001c6a2e6f264a746b74ed2dcf79cde5b8c';
const limit = 5000; // Fetch 5000 records per request

const App = () => {
  const [data, setData] = useState([]); // Store fetched data
  const [filteredData, setFilteredData] = useState([]); // Store filtered data for search
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [offset, setOffset] = useState(0); // Pagination offset
  const [searchQuery, setSearchQuery] = useState(''); // User input for search
  const [hasMoreData, setHasMoreData] = useState(true); // Track if more data is available

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Construct API URL with pagination parameters
      const url = `${baseURL}?api-key=${apiKey}&format=json&limit=${limit}&offset=${offset}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const json = await response.json();
      const records = json.records || [];

      if (records.length === 0) {
        setHasMoreData(false); // No more data to fetch
        return;
      }

      // Append new data to the existing dataset
      const updatedData = [...data, ...records];
      setData(updatedData);
      setFilteredData(updatedData); // Update filtered data for search
      setOffset((prevOffset) => prevOffset + limit); // Update offset for the next batch

      console.log(`Fetched ${records.length} records from offset ${offset}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, []);

  // Handle Search Input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      // If search query is empty, reset to original data
      setFilteredData(data);
    } else {
      // Filter data locally based on company name
      const results = data.filter((record) =>
        record.CompanyName.toLowerCase().includes(query)
      );
      setFilteredData(results);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>MCA Company Master Data</h1>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by company name..."
          value={searchQuery}
          onChange={handleSearch}
          style={{ padding: '10px', width: '300px', fontSize: '16px' }}
        />
      </div>

      {isLoading && <p>Loading data...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!isLoading && !error && filteredData.length > 0 && (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>CIN</th>
              <th>Company Name</th>
              <th>ROC Code</th>
              <th>Category</th>
              <th>Sub-Category</th>
              <th>Registered_Office_Address</th>
              <th>Listing-status</th>
              <th>StateCode</th>
              <th>nic-code</th>
              <th>Industrial-Classification</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((record, index) => (
              <tr key={record.CIN}>
                <td>{record.CIN || 'N/A'}</td>
                <td>{record.CompanyName || 'N/A'}</td>
                <td>{record.CompanyROCcode || 'N/A'}</td>
                <td>{record.CompanyCategory || 'N/A'}</td>
                <td>{record.CompanySubCategory || 'N/A'}</td>
                <td>{record.Registered_Office_Address || 'N/A'}</td>
                <td>{record.Listingstatus || 'N/A'}</td>
                <td>{record.CompanyStateCode || 'N/A'}</td>
                <td>{record.nic_code || 'N/A'}</td>
                <td>{record.CompanyIndustrialClassification || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!isLoading && !error && filteredData.length === 0 && <p>No results found.</p>}

      {!isLoading && !error && hasMoreData && (
        <button
          onClick={() => fetchData(false)}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Load More Data
        </button>
      )}
    </div>
  );
};

export default App;




// import React, { useEffect, useState } from 'react';

// // API details
// const baseURL = 'https://api.data.gov.in/resource/4dbe5667-7b6b-41d7-82af-211562424d9a';
// const apiKey = '579b464db66ec23bdd000001c6a2e6f264a746b74ed2dcf79cde5b8c';
// const limit = 1000; // Fetch 1000 records per request

// const App = () => {
//   const [allData, setAllData] = useState([]); // Store entire dataset in memory
//   const [filteredData, setFilteredData] = useState([]); // Store filtered results for search
//   const [isLoading, setIsLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [searchQuery, setSearchQuery] = useState(''); // User input for search

//   const fetchAllData = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       let offset = 0;
//       let hasMoreData = true;
//       let dataset = [];

//       // Fetch all data in chunks
//       while (hasMoreData) {
//         const url = `${baseURL}?api-key=${apiKey}&format=json&limit=${limit}&offset=${offset}`;
//         const response = await fetch(url);

//         if (!response.ok) {
//           throw new Error(`Error fetching data: ${response.statusText}`);
//         }

//         const json = await response.json();
//         const records = json.records || [];

//         if (records.length === 0) {
//           hasMoreData = false; // Stop fetching if no more data
//         } else {
//           dataset = [...dataset, ...records];
//           offset += limit;
//         }

//         console.log(`Fetched ${records.length} records, total so far: ${dataset.length}`);
//       }

//       setAllData(dataset); // Store entire dataset in memory
//       console.log('Dataset fully loaded:', dataset.length);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllData(); // Fetch all data on component mount
//   }, []);

//   const handleSearch = () => {
//     if (searchQuery.trim() === '') {
//       alert('Please enter a search term!');
//       return;
//     }

//     const results = allData.filter((record) =>
//       record.CompanyName?.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     setFilteredData(results); // Update filtered data to display
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>MCA Company Master Data</h1>

//       {/* Search Bar */}
//       <div style={{ marginBottom: '20px' }}>
//         <input
//           type="text"
//           placeholder="Search by company name..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           style={{ padding: '10px', width: '300px', fontSize: '16px' }}
//         />
//         <button
//           onClick={handleSearch}
//           style={{
//             marginLeft: '10px',
//             padding: '10px 20px',
//             fontSize: '16px',
//             cursor: 'pointer',
//           }}
//         >
//           Search
//         </button>
//       </div>

//       {isLoading && <p>Loading entire dataset...</p>}
//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}

//       {!isLoading && filteredData.length > 0 && (
//         <table border="1" cellPadding="10" cellSpacing="0">
//           <thead>
//             <tr>
//               <th>CIN</th>
//               <th>Company Name</th>
//               <th>ROC Code</th>
//               <th>Category</th>
//               <th>Sub-Category</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((record, index) => (
//               <tr key={record.CIN}>
//                 <td>{record.CIN || 'N/A'}</td>
//                 <td>{record.CompanyName || 'N/A'}</td>
//                 <td>{record.CompanyROCcode || 'N/A'}</td>
//                 <td>{record.CompanyCategory || 'N/A'}</td>
//                 <td>{record.CompanySubCategory || 'N/A'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {!isLoading && filteredData.length === 0 && searchQuery && (
//         <p>No results found for "{searchQuery}"</p>
//       )}
//     </div>
//   );
// };

// export default App;

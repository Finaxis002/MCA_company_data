

// import React, { useState } from 'react';

// // API details
// const baseURL = 'https://api.data.gov.in/resource/4dbe5667-7b6b-41d7-82af-211562424d9a';
// const apiKey = '579b464db66ec23bdd000001c6a2e6f264a746b74ed2dcf79cde5b8c';

// const App = () => {
//   const [cin, setCin] = useState(''); // CIN entered by the user
//   const [data, setData] = useState(null); // Store the company data
//   const [isLoading, setIsLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error state

//   const handleSearch = async () => {
//     if (!cin.trim()) {
//       alert('Please enter a CIN number');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       // Construct the API URL with the CIN filter
//       const url = `${baseURL}?api-key=${apiKey}&format=json&filters[CIN]=${encodeURIComponent(cin)}`;

//       // Fetch data from the API
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`Error fetching data: ${response.statusText}`);
//       }

//       const json = await response.json();
//       if (json.records && json.records.length > 0) {
//         setData(json.records[0]); // Take the first record
//       } else {
//         setData(null);
//         setError('No company found for the given CIN number.');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Search Company by CIN</h1>

//       {/* Input for CIN */}
//       <div style={{ marginBottom: '20px' }}>
//         <input
//           type="text"
//           placeholder="Enter CIN number"
//           value={cin}
//           onChange={(e) => setCin(e.target.value)}
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

//       {/* Loading State */}
//       {isLoading && <p>Loading data...</p>}

//       {/* Error State */}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {/* Display Company Data */}
//       {data && !isLoading && !error && (
//         <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', width: '600px' }}>
//           <h2>Company Details</h2>
//           <p><strong>CIN:</strong> {data.CIN}</p>
//           <p><strong>Company Name:</strong> {data.CompanyName}</p>
//           <p><strong>ROC Code:</strong> {data.CompanyROCcode}</p>
//           <p><strong>Category:</strong> {data.CompanyCategory}</p>
//           <p><strong>Sub-Category:</strong> {data.CompanySubCategory}</p>
//           <p><strong>Status:</strong> {data.CompanyStatus}</p>
//           <p><strong>Registration Date:</strong> {data.CompanyRegistrationdate_date}</p>
//           <p><strong>Authorized Capital:</strong> {data.AuthorizedCapital}</p>
//           <p><strong>Paid-Up Capital:</strong> {data.PaidupCapital}</p>
//           <p><strong>Address:</strong> {data.Registered_Office_Address}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import './App.css';


// API details
const baseURL = 'https://api.data.gov.in/resource/4dbe5667-7b6b-41d7-82af-211562424d9a';
const apiKey = '579b464db66ec23bdd000001c6a2e6f264a746b74ed2dcf79cde5b8c';

const App = () => {
  const [cin, setCin] = useState(''); // CIN entered by the user
  const [companyName, setCompanyName] = useState(''); // Company Name entered by the user
  const [data, setData] = useState(null); // Store the company data
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleSearch = async () => {
    if (!cin.trim() && !companyName.trim()) {
      alert('Please enter a CIN number or Company Name');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Construct the API URL with the appropriate filter
      let url = `${baseURL}?api-key=${apiKey}&format=json`;
      if (cin.trim()) {
        url += `&filters[CIN]=${encodeURIComponent(cin)}`;
      }
      if (companyName.trim()) {
        url += `&filters[CompanyName]=${encodeURIComponent(companyName)}`;
      }

      // Fetch data from the API
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const json = await response.json();
      if (json.records && json.records.length > 0) {
        setData(json.records); // Store all matching records
      } else {
        setData(null);
        setError('No company found for the given CIN or Company Name.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 className='text-3xl font-bold'>Search Company by CIN or Company Name</h1>
       <div className='flex gap-2 mt-2'>

      
      {/* Input for CIN */}
      <div style={{ marginBottom: '20px' }} className='border-solid border-2 border-indigo-600'>
        <input
          type="text"
          placeholder="Enter CIN number"
          value={cin}
          onChange={(e) => setCin(e.target.value)}
          style={{ padding: '10px', width: '300px', fontSize: '16px', marginRight: '10px' }}
        />
      </div>

      {/* Input for Company Name */}
      <div style={{ marginBottom: '20px' }} className='border-solid border-2 border-indigo-600'>
        <input
          type="text"
          placeholder="Enter Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          style={{ padding: '10px', width: '300px', fontSize: '16px' }}
        />
      </div>
          
      {/* Search Button */}
      <button
        onClick={handleSearch}
        style={{
          fontSize: '16px',
          cursor: 'pointer',
        }}
        className='border-solid border-2 border-black-600 p-1'
      >
        Search
      </button>
      </div>
      {/* Loading State */}
      {isLoading && <p>Loading data...</p>}

      {/* Error State */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display Company Data */}
      {data && !isLoading && !error && (
        <div style={{ marginTop: '20px' }}>
          <h2>Company Details</h2>
          {data.map((record, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <p><strong>CIN:</strong> {record.CIN}</p>
              <p><strong>Company Name:</strong> {record.CompanyName}</p>
              <p><strong>ROC Code:</strong> {record.CompanyROCcode}</p>
              <p><strong>Category:</strong> {record.CompanyCategory}</p>
              <p><strong>Sub-Category:</strong> {record.CompanySubCategory}</p>
              <p><strong>Status:</strong> {record.CompanyStatus}</p>
              <p><strong>Registration Date:</strong> {record.CompanyRegistrationdate_date}</p>
              <p><strong>Authorized Capital:</strong> {record.AuthorizedCapital}</p>
              <p><strong>Paid-Up Capital:</strong> {record.PaidupCapital}</p>
              <p><strong>Address:</strong> {record.Registered_Office_Address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

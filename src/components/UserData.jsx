// import {nanoid} from 'nanoid'
// const UserData =({users})=>{
//          return(
//             <>
//             {
//                users.map((curUser)=>{
                   
//                     const{CIN,CompanyName,CompanyROCcode,CompanyCategory,CompanySubCategory}= curUser.records ;
//                     return(
//                     <tr key={nanoid()}>
//                      <td>{records.CIN}</td>
//                      <td>{records.CompanyName}</td>
//                      <td>{records.CompanyROCcode}</td>
//                      <td>{records.CompanyCategory}</td>
//                      <td>{records.CompanySubCategory}</td>
//                     </tr>
//                     )
//                })}
//             </>
//          )
// }
// export default UserData ;
import { useState } from "react";

const UserData = ({data}) =>{
   const [hasMoreData, setHasMoreData] = useState(true);

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
  
        setData((prevData) => [...prevData, ...records]); // Append new data to existing data
        setOffset((prevOffset) => prevOffset + limit); // Update offset for the next batch
  
        console.log(`Fetched ${records.length} records from offset ${offset}`);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    useEffect(() => {
        fetchData();
      }, []);

         return(
            <>
               <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>CIN</th>
                <th>Company Name</th>
                <th>ROC Code</th>
                <th>Category</th>
                <th>Sub-Category</th>
              </tr>
            </thead>
            <tbody>
              {data.map((record, index) => (
                <tr key={record.CIN}>
                  <td>{record.CIN || 'N/A'}</td>
                  <td>{record.CompanyName || 'N/A'}</td>
                  <td>{record.CompanyROCcode || 'N/A'}</td>
                  <td>{record.CompanyCategory || 'N/A'}</td>
                  <td>{record.CompanySubCategory || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {hasMoreData && (
            <button
              onClick={fetchData}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? 'Loading...' : 'Load More Data'}
            </button>
          )}
            </>
         )
}
 export default UserData;
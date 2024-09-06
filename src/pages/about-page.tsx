import React, { useEffect, useState } from "react";
import getTableOneDetailsService from "../services/get_data_api";

function PopulationData() {
  const [data, setData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const getDataResponse = async () => {
      const dataResponse = await getTableOneDetailsService();
      console.log("data", dataResponse);
      setData(dataResponse); // Set the fetched data
    };
    getDataResponse();
  }, []);

  // Check if the data is available before mapping
  if (!data || data.length === 0) {
    return <div>Loading data...</div>; // Display a loading message
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Statistical Area</th>
            <th>Age 0</th>
            <th>Age 1</th>
            <th>All Ages</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row["year"]}</td>
              <td>{row["statistical_area_level_3"]}</td>
              <td>{row["age_0"]}</td>
              <td>{row["age_1"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PopulationData;

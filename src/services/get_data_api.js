// // import axios from "axios";

// // const getTableOneDetailsService = async () => {
// //   let config = {
// //     method: "get",
// //     maxBodyLength: Infinity,
// //     url: "http://127.0.0.1:5000/api/data",
// //     headers: {},
// //   };

// //   axios
// //     .request(config)
// //     .then((response) => {
// //       return JSON.stringify(response.data);
// //     })
// //     .catch((error) => {
// //       console.log(error);
// //     });
// // };
// // export default getTableOneDetailsService;
// import axios from "axios";

// const getTableOneDetailsService = async () => {
//   let config = {
//     method: "get",
//     maxBodyLength: Infinity,
//     url: "http://127.0.0.1:5000/api/data",
//     headers: {},
//   };

//   try {
//     const response = await axios.request(config);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching population data:", error);
//     return null;
//   }
// };

// export default getTableOneDetailsService;

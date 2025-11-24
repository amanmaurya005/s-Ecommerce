// import axios from "axios";

// const instance = axios.create({
//   baseURL: "https://inventory-management-8mn8.onrender.com",
// });
// export default instance;



import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-ecommerce-ajb4.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
  
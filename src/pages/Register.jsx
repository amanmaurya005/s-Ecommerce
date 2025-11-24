import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../pages/Firebase";

function Register() {
  const [data, setData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(null);

  const navigate = useNavigate();

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsError(null);

    try {
      setIsSubmitting(true);

      // Firebase register
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      console.log("User created:", userCredential.user);

      navigate("/login");

    } catch (error) {
      console.error(error);
      setIsError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="form-container">
      {isError && <p style={{ color: "red" }}>{isError}</p>}

      <h2>Register into Ecommerce</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input name="name" value={data.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input name="username" value={data.username} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input name="phone" value={data.phone} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input name="email" value={data.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input name="password" type="password" value={data.password} onChange={handleChange} />
        </div>

        <button type="submit">
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>

      <p>Already Registered? <Link to="/login">Login Here</Link></p>
    </div>
  );
}

export default Register;







// import { useState } from "react";
// import instance from "../config/axiosConfig";
// import { Link, useNavigate } from "react-router-dom";

// function Register() {
//   const [data, setData] = useState({
//     name: "",
//     username: "",
//     phone: "",
//     email: "",
//     password: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isError, setIsError] = useState(null);
//   const navigate = useNavigate();

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       setIsSubmitting(true);
//       const response = await instance.post("/auth/register", data);
//       if (
//         response.status === 201 &&
//         response.message === "Data added successfully"
//       ) {
//         navigate("/login");
//       }
//     } catch (error) {
//       console.log(error);
//       setIsError(error.message);
//       setIsSubmitting(false);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <div className="form-container">
//       {isError && <p>{isError}</p>}
//       <h2>Register into Ecommerce</h2>
//       <div className="form-wrapper">
//         <form action="" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               placeholder="Enter Name"
//               name="name"
//               id="name"
//               value={data.name}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="username">Username</label>
//             <input
//               type="text"
//               placeholder="Enter Username"
//               name="username"
//               id="username"
//               value={data.username}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="phone">Phone</label>
//             <input
//               type="text"
//               placeholder="Enter Phone"
//               name="phone"
//               id="phone"
//               value={data.phone}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               placeholder="Enter Email"
//               name="email"
//               id="email"
//               value={data.email}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               name="password"
//               id="password"
//               value={data.password}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <button type="submit" className={isSubmitting ? "inProcess" : ""}>
//               {isSubmitting ? "Registering..." : "Register"}
//             </button>
//           </div>
//         </form>
//         <p>
//           Already Registered? <Link to="/login">Login Here</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;









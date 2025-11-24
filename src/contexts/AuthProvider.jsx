import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../pages/Firebase";
import { Navigate } from "react-router-dom";

const authContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading

  useEffect(() => {
    // Listen for firebase auth changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  async function logout() {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      return <Navigate to="/login" />;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <authContext.Provider value={{ isLoggedIn, logout }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

export default AuthProvider;






// import { createContext, useContext, useEffect, useState } from "react";
// import instance from "../config/axiosConfig";
// import { Navigate } from "react-router-dom";

// const authContext = createContext();

// function AuthProvider({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(null);

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   async function checkAuthStatus() {
//     console.log("inside authProvider");
//     try {
//       const response = await instance.get("/auth/authCheck", {
//         withCredentials: true,
//       });
//       setIsLoggedIn(true);
//     } catch (error) {
//       console.log(error);
//       setIsLoggedIn(false);
//     }
//   }

//   async function logout() {
//     try {
//       await instance.post(
//         "/auth/logout",
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       setIsLoggedIn(false);
//       <Navigate to="/login" />;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <authContext.Provider value={{ isLoggedIn, checkAuthStatus, logout }}>
//       {children}
//     </authContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(authContext);
// }

// export default AuthProvider;


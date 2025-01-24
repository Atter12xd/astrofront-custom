// import Cookies from "js-cookie";
// import React, { useEffect, useState } from "react";
// import Gravatar from "react-gravatar";
// import { BsPerson } from "react-icons/bs";

// type User = {
//   email: string;
//   firstName: string;
// };

// const fetchUser = async (): Promise<User | null> => {
//   try {
//     const mockUser = {
//       email: "example@example.com",
//       firstName: "",
//     };
//     return mockUser;
//   } catch (error) {
//     console.error("Error fetching user details:", error);
//     return null;
//   }
// };

// const NavUser = ({ pathname }: { pathname: string }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const userInfo = await fetchUser();
//         setUser(userInfo);
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };
//     getUser();
//   }, [pathname]);

//   const handleLogout = () => {
//     Cookies.remove("token");
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen((prev) => !prev);
//   };

//   return <div></div>;
// };

const NavUser = () => {
    return null; // Este componente no renderiza nada
  };
  
  export default NavUser;
  
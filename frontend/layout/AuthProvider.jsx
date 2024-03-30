/* eslint-disable react/prop-types */
import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const AuthProvider = (props) => {
  const [cookies] = useCookies();
  if (cookies.Api_key)
    return <React.Fragment>{props.children}</React.Fragment>;
  else return <Navigate to={"/login"} />;
};

export default AuthProvider;

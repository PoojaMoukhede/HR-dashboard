import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAPI } from '../Context'

export default function RegisterEmployee() {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
      email: "",
      password: "",
      confirm_password: "",
      Emp_ID:''
    });
    const handleChange = (e) => {
      setLogin((curr) => ({ ...curr, [e.target.name]: e.target.value }));
    };
    const { signUpUser } = useAPI();
    const UserLogin = () => {
      signUpUser(login);
    };
  return (
    <>
    
    </>
  )
}

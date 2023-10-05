import React, { useContext, useState, createContext } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const APIContext = createContext();

export function APIContextProvider({ children }) {
  // const URL = "https://dashboardbackend-production-9839.up.railway.app/";
  // const URL = "https://dashboardbackend-production-9839.up.railway.app/

  const URL = "https://dashboardbackend-production-9839.up.railway.app/"
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [employeeData , setEmployeedata]= useState([]);
  const [managerData , setManagerdata]= useState([]);
  const [currentMonthFuelExpensetotal, setCurrentMonthFuelExpensetotal] = useState(0);



  //Takes email password confirm_password and stores data
  const SignUpUrl = `${URL}empregister`; // for employee only

  // TAKES email Password gives Token
  const loginUrl = `${URL}login`;
  //add new employeesemployees
  // const addEmployeeURL = `${URL}Users`;
  const addManagerURL = `${URL}manager`;
  const CurrExpanseURL = `${URL}expanse/curr`
  const addHrURL = `${URL}register`
  
  //post user
  const signUpUser = (userData) => {
    console.log(userData);
    try {
      axios
        .post(SignUpUrl, userData)
        .then((res) => {
          console.log(res);
          setEmployeedata(userData)
          window.alert(`Registeration Completed`);
          // navigate("/login");
          
        })
        .catch((err) => {
          console.log(err);
          window.alert(`Registeration Failed`,err);
        });
    } catch (error) {
      window.alert(error.message);
    }
  };

  //Login USER
  const loginUser = (loginData) => {
    console.log(loginData);
    axios
      .post(loginUrl, loginData)
      .then((res) => {
        const myToken = res.data.token;
        console.log(myToken);
        localStorage.setItem("token", myToken);
        localStorage.setItem("email", loginData.email);
        navigate("/main");
        document.location.reload();
        setUserEmail(loginData.email);
      })
      .catch((err) => {
        console.log(err);
        // window.alert(`Login Failed`,err);
        window.alert(err);

      }
      );
  };
  // const loginUser = (loginData) => {
  //   console.log(loginData);
  //   axios
  //     .post(loginUrl, loginData)
  //     .then((res) => {
  //       const myToken = res.data.token;
  //       console.log(myToken);
  //       localStorage.setItem("token", myToken);
  //       localStorage.setItem("email", loginData.email);
        
  //       // const isSuperAdmin = loginData.email === 'superadmin@yopmail.com';
        
  //       // if (isSuperAdmin) {
  //       //   navigate("/managers");
  //       // } else {
  //       //   navigate("/main");
  //       // }
        
  //       document.location.reload();
  //       setUserEmail(loginData.email);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       window.alert(err);
  //     });
  // };
  
  
  // const onFormSubmit = (data) => { //emplopyee
  //   axios
  //     .post(addEmployeeURL, data)
  //     .then((res) => {
  //       const {
  //         Emp_ID,
  //         Emp_name,
  //         email,
  //         Emp_contact_No,
  //         Emp_department,
  //         Emp_city,
  //         Emp_state,
  //         Emp_DOB,
  //         Emp_joining_date,
  //         Emp_blood_group,
  //         Emp_qualification,
  //         Emp_expertise

  //       } = res.data;

  //       console.log(Emp_name,email,Emp_contact_No,Emp_department, Emp_city, Emp_state,Emp_DOB,Emp_joining_date,Emp_expertise
  //         ,Emp_qualification,Emp_blood_group );
  //       setEmployeedata(data)
      
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  const onFormSubmit21 = (data) => {   //managers
    axios
      .post(addManagerURL, data)
      .then((res) => {
        const {
          name,
          email,
          contact_no,
          city,
          state,
          blood_group,
        } = res.data;

        console.log(name,email,contact_no, city,state,blood_group);
        setManagerdata(data)
      
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onFormSubmitEdit = async(id, data) => { //emplopyee `${URL}putEmployee/${id}`
    console.log(" onformsubmitedit inside")
   await axios           
      .put(`https://dashboardbackend-production-9839.up.railway.app/Users/${id}`,data)
      // .put(`http://192.168.1.211:8000/employees/${id}`,data)

      // console.log("-------------")
      .then((res) => {
        const info = res.data;
        console.log(`info ${info}`);
        setEmployeedata(data)
        console.log(`id while fetching ${id}`)
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const fuelExpanseGet = () => {
    console.log();
    try {
      axios
        .get(CurrExpanseURL)
        .then((res) => {
          console.log(res);
        const moneyFromAPI = res.data[0].money;
        setCurrentMonthFuelExpensetotal(moneyFromAPI);
        console.log("Money from API:", moneyFromAPI);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const signUpHR = (userData) => {
    console.log(userData);
    try {
      axios
        .post(addHrURL, userData)
        .then((res) => {
          console.log(res);
          window.alert(`Registeration Completed`);

          // navigate("/login");
          
        })
        .catch((err) => {
          console.log(err);
          window.alert(`Registeration Failed`,err);
        });
    } catch (error) {
      window.alert(error.message);
    }
  };





  return (
    <APIContext.Provider
      value={{
        isLoading,
        setIsLoading,
        signUpUser,
        loginUser,
        userEmail,
        // onFormSubmit,
        onFormSubmit21,
        onFormSubmitEdit,
        fuelExpanseGet,
        signUpHR
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}

import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Icon } from "@iconify/react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useNavigate } from "react-router-dom";


export default function DropDown() {
  const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        sessionStorage.clear();
        localStorage.clear();
        window.location.replace("/login");
        navigate("/");
      }
  return (
    <Dropdown as={ButtonGroup} >
      <Button style={{backgroundColor:"#fafbfc",border:"none",color:"black",paddingTop:'0'}}>
        <Icon
          icon="healthicons:ui-user-profile"
          color="#24a1e9"
          style={{ fontSize: "2rem", marginRight: "0.5rem" }}
        />
        {localStorage.getItem("email").split("@")[0]}
      </Button>
      <Dropdown.Toggle split  id="dropdown-split-basic" style={{backgroundColor:"white",border:"none",color:"black"}} />

      <Dropdown.Menu>
        <Dropdown.Item href="/profile">Profile</Dropdown.Item>
        <Dropdown.Item   onClick={handleLogout} >Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

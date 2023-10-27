import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Icon } from "@iconify/react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useNavigate } from "react-router-dom";


export default function DropDown() {
  return (
    <Dropdown as={ButtonGroup} >
      <Button style={{backgroundColor:"#fafbfc",border:"none",color:"black",paddingTop:'0'}} href="/profile">
        
        <Icon
          icon="healthicons:ui-user-profile"
          color="#24a1e9"
          style={{ fontSize: "2rem", marginRight: "0.5rem" }}
        />
        {localStorage.getItem("email").split("@")[0]}
      </Button>
    </Dropdown>
  );
}

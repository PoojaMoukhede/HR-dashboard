import React from "react";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";

export default function BasicTemplate() {
  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <div className="row">
              {/* content */}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}





/* WEB URL

Employee URl  

 GET - https://dashboardbackend-production-9839.up.railway.app/
/get
 GET by ID - https://dashboardbackend-production-9839.up.railway.app/
/getemployee/:id
 POST - https://dashboardbackend-production-9839.up.railway.app/
/add
 PUT - https://dashboardbackend-production-9839.up.railway.app/
/putEmployee/:id
 DELETE - https://dashboardbackend-production-9839.up.railway.app/
/deleteEmployee/:id
 IMPORT -  https://dashboardbackend-production-9839.up.railway.app/
/importdata

ADMIN URL

  REGISTER POST - https://dashboardbackend-production-9839.up.railway.app/
/register
  LOGIN POST - https://dashboardbackend-production-9839.up.railway.app/
/login
  GET - https://dashboardbackend-production-9839.up.railway.app/
/getAdmin
  GET by ID - https://dashboardbackend-production-9839.up.railway.app/
/get/:id


EVENT URL
  GET - https://dashboardbackend-production-9839.up.railway.app/
/getevent
  POST - https://dashboardbackend-production-9839.up.railway.app/
/addevent
 
Employee URl  

 GET - https://dashboardbackend-production-9839.up.railway.app/
/getmanager
 GET by ID - https://dashboardbackend-production-9839.up.railway.app/
/getmanager/:id
 POST - https://dashboardbackend-production-9839.up.railway.app/
/addmanager
 PUT - https://dashboardbackend-production-9839.up.railway.app/
/put/:id
 DELETE - https://dashboardbackend-production-9839.up.railway.app/
/delete/:id
 IMPORT -  https://dashboardbackend-production-9839.up.railway.app/
/importmanager



  */
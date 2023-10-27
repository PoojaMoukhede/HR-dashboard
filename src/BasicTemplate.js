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

 GET - http://192.168.1.211:8080/

/get
 GET by ID - http://192.168.1.211:8080/

/getemployee/:id
 POST - http://192.168.1.211:8080/

/add
 PUT - http://192.168.1.211:8080/

/putEmployee/:id
 DELETE - http://192.168.1.211:8080/

/deleteEmployee/:id
 IMPORT -  http://192.168.1.211:8080/

/importdata

ADMIN URL

  REGISTER POST - http://192.168.1.211:8080/

/register
  LOGIN POST - http://192.168.1.211:8080/

/login
  GET - http://192.168.1.211:8080/

/getAdmin
  GET by ID - http://192.168.1.211:8080/

/get/:id


EVENT URL
  GET - http://192.168.1.211:8080/

/getevent
  POST - http://192.168.1.211:8080/

/addevent
 
Employee URl  

 GET - http://192.168.1.211:8080/

/getmanager
 GET by ID - http://192.168.1.211:8080/

/getmanager/:id
 POST - http://192.168.1.211:8080/

/addmanager
 PUT - http://192.168.1.211:8080/

/put/:id
 DELETE - http://192.168.1.211:8080/

/delete/:id
 IMPORT -  http://192.168.1.211:8080/

/importmanager



  */
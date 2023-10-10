import React, { useState } from "react";
import PolorChart from "../PolorChart";

export default function AttandancedepartmentWise() {
  
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const dummyData = [
    {
      name: "Charil Estrella",
      attendance: "present",
      department: "Accounting",
      date: "06-10-2023",
    },
    {
      name: "Sandro Hasell",
      attendance: "present",
      department: "Product Management",
    },
    {
      name: "Britt Chinge de Hals",
      attendance: "present",
      department: "Research and Development",
    },
    {
      name: "Jermaine Copcutt",
      attendance: "absent",
      department: "Business Development",
    },
    {
      name: "Calvin Haworth",
      attendance: "present",
      department: "Product Management",
    },
    {
      name: "Austin MacTerlagh",
      attendance: "present",
      department: "Accounting",
    },
    {
      name: "Janean Lisciandri",
      attendance: "present",
      department: "Training",
    },
    {
      name: "Charlot Shubotham",
      attendance: "present",
      department: "Engineering",
    },
    {
      name: "Aldrich Enderlein",
      attendance: "present",
      department: "Engineering",
    },
    {
      name: "Lawton Dumingo",
      attendance: "present",
      department: "Marketing",
    },
    {
      name: "Bonni Hartburn",
      attendance: "present",
      department: "Business Development",
    },
    {
      name: "Martyn Spier",
      attendance: "present",
      department: "Accounting",
    },
    {
      name: "Galvan MacGilrewy",
      attendance: "present",
      department: "Services",
    },
    {
      name: "Florina Lumsdaine",
      attendance: "absent",
      department: "Training",
    },
    {
      name: "Curry Tollmache",
      attendance: "absent",
      department: "Business Development",
    },
    {
      name: "Hyacinthia Challes",
      attendance: "present",
      department: "Research and Development",
    },
    {
      name: "Calvin Casarino",
      attendance: "present",
      department: "Sales",
    },
    {
      name: "Paton Wiggington",
      attendance: "absent",
      department: "Support",
    },
    {
      name: "Daisi Camidge",
      attendance: "absent",
      department: "Accounting",
    },
    {
      name: "Norrie Dummett",
      attendance: "absent",
      department: "Human Resources",
    },
    {
      name: "Barbi Winborn",
      attendance: "present",
      department: "Legal",
    },
    {
      name: "Erinn Ert",
      attendance: "absent",
      department: "Accounting",
    },
    {
      name: "Edeline Smorthwaite",
      attendance: "present",
      department: "Training",
    },
    {
      name: "Willamina Ruck",
      attendance: "present",
      department: "Legal",
    },
    {
      name: "Charlean Leetham",
      attendance: "absent",
      department: "Services",
    },
    {
      name: "Vernice Goodbarne",
      attendance: "present",
      department: "Product Management",
    },
    {
      name: "Raphael Stollsteiner",
      attendance: "absent",
      department: "Sales",
    },
    {
      name: "Kelley Huntley",
      attendance: "absent",
      department: "Human Resources",
    },
    {
      name: "Thaddus Ives",
      attendance: "absent",
      department: "Training",
    },
    {
      name: "Lorelle Heaney",
      attendance: "absent",
      department: "Business Development",
    },
    {
      name: "Aundrea Clews",
      attendance: "absent",
      department: "Sales",
    },
    {
      name: "Karleen Smitherman",
      attendance: "present",
      department: "Product Management",
    },
    {
      name: "Meredith Davydoch",
      attendance: "present",
      department: "Training",
    },
    {
      name: "Rasla Chilver",
      attendance: "absent",
      department: "Legal",
    },
    {
      name: "Merrilee Baseley",
      attendance: "present",
      department: "Training",
    },
    {
      name: "Hermon Baalham",
      attendance: "present",
      department: "Sales",
    },
    {
      name: "Lora Matejovsky",
      attendance: "absent",
      department: "Services",
    },
    {
      name: "Kitti Williamson",
      attendance: "absent",
      department: "Training",
    },
    {
      name: "Roger Congdon",
      attendance: "absent",
      department: "Legal",
    },
    {
      name: "Lazarus Bonallack",
      attendance: "absent",
      department: "Legal",
    },
    {
      name: "Marleah Handyside",
      attendance: "absent",
      department: "Research and Development",
    },
    {
      name: "Nicolais Ruse",
      attendance: "absent",
      department: "Sales",
    },
    {
      name: "James Eley",
      attendance: "present",
      department: "Research and Development",
    },
    {
      name: "Conni Houlridge",
      attendance: "present",
      department: "Training",
    },
    {
      name: "Duncan Forker",
      attendance: "absent",
      department: "Marketing",
    },
    {
      name: "Hortense Halbard",
      attendance: "absent",
      department: "Sales",
    },
    {
      name: "Olin Learie",
      attendance: "present",
      department: "Research and Development",
    },
    {
      name: "Krishnah MacRierie",
      attendance: "present",
      department: "Accounting",
    },
    {
      name: "Riannon Blench",
      attendance: "absent",
      department: "Human Resources",
    },
    {
      name: "Frayda Anfonsi",
      attendance: "absent",
      department: "Training",
    },
    {
      name: "Wain O'Grady",
      attendance: "present",
      department: "Human Resources",
    },
    {
      name: "Weider Nottingham",
      attendance: "absent",
      department: "Services",
    },
    {
      name: "Gary Lisett",
      attendance: "present",
      department: "Sales",
    },
    {
      name: "Georgy Vasey",
      attendance: "absent",
      department: "Product Management",
    },
    {
      name: "Rolph Quinnette",
      attendance: "absent",
      department: "Sales",
    },
    {
      name: "Saba Hessay",
      attendance: "absent",
      department: "Research and Development",
    },
    {
      name: "Maddalena Stinton",
      attendance: "present",
      department: "Legal",
    },
    {
      name: "Lucy Fitzsimmons",
      attendance: "present",
      department: "Services",
    },
    {
      name: "Meggie Massot",
      attendance: "present",
      department: "Engineering",
    },
    {
      name: "Lavina Maudlen",
      attendance: "present",
      department: "Sales",
    },
    {
      name: "Bradney Munnion",
      attendance: "present",
      department: "Legal",
    },
    {
      name: "Angy Sellek",
      attendance: "present",
      department: "Accounting",
    },
    {
      name: "Luce Pursey",
      attendance: "present",
      department: "Engineering",
    },
    {
      name: "Bennie Rose",
      attendance: "present",
      department: "Product Management",
    },
    {
      name: "Ainslie Mealham",
      attendance: "present",
      department: "Engineering",
    },
    {
      name: "Orsola Gotch",
      attendance: "absent",
      department: "Support",
    },
    {
      name: "Salomon Devita",
      attendance: "absent",
      department: "Legal",
    },
    {
      name: "Arlee Gravet",
      attendance: "present",
      department: "Support",
    },
    {
      name: "Lawton Boreland",
      attendance: "present",
      department: "Support",
    },
    {
      name: "Timothy Vanner",
      attendance: "present",
      department: "Sales",
    },
    {
      name: "Tiffi Rymour",
      attendance: "absent",
      department: "Training",
    },
    {
      name: "Linzy Dacca",
      attendance: "present",
      department: "Engineering",
    },
    {
      name: "Kleon Oliva",
      attendance: "present",
      department: "Services",
    },
    {
      name: "Marylou Crosse",
      attendance: "present",
      department: "Human Resources",
    },
    {
      name: "Eilis O'Hallagan",
      attendance: "present",
      department: "Marketing",
    },
    {
      name: "Gwendolen Kermannes",
      attendance: "absent",
      department: "Research and Development",
    },
    {
      name: "Beryl Norres",
      attendance: "absent",
      department: "Business Development",
    },
    {
      name: "Irwinn Cleen",
      attendance: "absent",
      department: "Training",
    },
    {
      name: "Wainwright Cossington",
      attendance: "absent",
      department: "Business Development",
    },
    {
      name: "Collen Scothron",
      attendance: "present",
      department: "Legal",
    },
    {
      name: "Robbert O'Rourke",
      attendance: "present",
      department: "Engineering",
    },
    {
      name: "Bucky Claughton",
      attendance: "present",
      department: "Business Development",
    },
    {
      name: "Boy Heinssen",
      attendance: "present",
      department: "Engineering",
    },
    {
      name: "Arny Breslane",
      attendance: "present",
      department: "Product Management",
    },
    {
      name: "Nadeen Stempe",
      attendance: "absent",
      department: "Training",
    },
    {
      name: "Sarene Dubber",
      attendance: "present",
      department: "Sales",
    },
    {
      name: "Kain Kellie",
      attendance: "present",
      department: "Product Management",
    },
    {
      name: "Dorise Scraney",
      attendance: "present",
      department: "Legal",
    },
    {
      name: "Matelda Jakel",
      attendance: "present",
      department: "Sales",
    },
    {
      name: "Tallie Mowat",
      attendance: "present",
      department: "Legal",
    },
    {
      name: "Stormy Levin",
      attendance: "present",
      department: "Product Management",
    },
    {
      name: "Giorgia Stetson",
      attendance: "present",
      department: "Human Resources",
    },
    {
      name: "Sylvan Broker",
      attendance: "present",
      department: "Support",
    },
    {
      name: "Guglielma Lindell",
      attendance: "present",
      department: "Support",
    },
  ];

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
  };

  // Extract unique departments from the dummyData
  const uniqueDepartments = [
    ...new Set(dummyData.map((item) => item.department)),
  ];
  const chart3Labels = uniqueDepartments;
  // Initialize an object to store department-wise counts
  const departmentCounts = {};

  // Calculate counts for each department
  uniqueDepartments.forEach((department) => {
    const departmentData = dummyData.filter(
      (item) => item.department === department
    );
    const absentCount = departmentData.filter(
      (item) => item.attendance === "absent"
    ).length;
    const presentCount = departmentData.filter(
      (item) => item.attendance === "present"
    ).length;
    departmentCounts[department] = { presentCount, absentCount };
  });

  return (
    <div>
      <div className="row">
        <div className="col-md-12 col-lg-8">
          <div className="mb-3 card">
            <div className="card-header-tab card-header">
              <div className="card-header-title">
                <i className="header-icon lnr lnr-rocket icon-gradient bg-asteroid">
                  {" "}
                </i>
                Daily Attandance Report Table
              </div>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade active show" id="tab-eg-55">
                <div className="widget-chart p-3">
                  <div style={{ height: "370px" }}>
                    <div
                      className="table-responsive"
                      style={{ height: "370px" }}
                    >
                      <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                        <thead>
                          <tr>
                            <th>Department</th>
                            <th className="text-center">Total</th>
                            <th className="text-center">Present</th>
                            <th className="text-center">Absent</th>
                          </tr>
                        </thead>
                        <tbody>
                          {uniqueDepartments.map((department) => (
                            <tr key={department}>
                              <td>
                                <div className="widget-content p-0">
                                  <div className="widget-content-wrapper">
                                    <div className="widget-content-left flex2">
                                      <div
                                        className="widget-heading"
                                        onClick={() =>
                                          handleDepartmentClick(department)
                                        }
                                      >
                                        {department}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="text-center text-muted">
                                {departmentCounts[department].presentCount +
                                  departmentCounts[department].absentCount}
                              </td>
                              <td className="text-center text-muted">
                                {departmentCounts[department].presentCount}
                              </td>
                              <td className="text-center text-muted">
                                {departmentCounts[department].absentCount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12 col-lg-4">
          <div className="mb-3 card">
            <div className="card-header-tab card-header-tab-animation card-header">
              <div className="card-header-title">
                <i className="header-icon lnr lnr-pie-chart icon-gradient bg-asteroid">
                  {" "}
                </i>
                Daily Attandance Report
              </div>
            </div>
            <div className="card-body">
              <div className="tab-content">
                <div className="tab-pane fade show active" id="tabs-eg-77">
                  <div
                    className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0"
                    style={{ height: "370px" }}
                  >
                    <PolorChart
                              series={[50,80,40,20,50,80,20,37,40,30,70]}
                              labels={chart3Labels}
                            />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react'

export default function AttandanceTable() {
    const workHoursData = [
        { date: '2023-09-01', PunchIn: "10:05", PunchOut: "07:15"},
        { date: '2023-09-02', PunchIn: "10:15", PunchOut: "07:00"},
        { date: '2023-09-03', PunchIn: "10:08", PunchOut: "07:15"},
        { date: '2023-09-04', PunchIn: "10:00", PunchOut: "05:12"},
        { date: '2023-09-05', PunchIn: "10:30", PunchOut: "08:15"},
        { date: '2023-09-06', PunchIn: "10:12", PunchOut: "07:15"},
        { date: '2023-09-07', PunchIn: "10:05", PunchOut: "07:15"},
        { date: '2023-09-08', PunchIn: "10:17", PunchOut: "07:00"},
        { date: '2023-09-09', PunchIn: "10:05", PunchOut: "07:15"},
        { date: '2023-09-10', PunchIn: "10:10", PunchOut: "07:15"},
        { date: '2023-09-11', PunchIn: "10:05", PunchOut: "08:15"},
        { date: '2023-09-12', PunchIn: "10:00", PunchOut: "07:15"},
        { date: '2023-09-13', PunchIn: "10:05", PunchOut: "07:15"},
        { date: '2023-09-14', PunchIn: "10:10", PunchOut: "07:15"},
        { date: '2023-09-15', PunchIn: "10:23", PunchOut: "07:15"},
        { date: '2023-09-16', PunchIn: "10:18", PunchOut: "07:15"},
        { date: '2023-09-17', PunchIn: "10:05", PunchOut: "07:00"},
        { date: '2023-09-18', PunchIn: "08:10", PunchOut: "07:15"},
        { date: '2023-09-19', PunchIn: "10:05", PunchOut: "07:15"},
        { date: '2023-09-20', PunchIn: "09:10", PunchOut: "07:15"},
        { date: '2023-09-21', PunchIn: "10:05", PunchOut: "07:15"},
        { date: '2023-09-22', PunchIn: "10:02", PunchOut: "07:15"},
        { date: '2023-09-23', PunchIn: "10:05", PunchOut: "07:15"},
        { date: '2023-09-24', PunchIn: "10:10", PunchOut: "08:15"},
        { date: '2023-09-25', PunchIn: "10:05", PunchOut: "07:00"},
        { date: '2023-09-26', PunchIn: "10:00", PunchOut: "07:15"},
        { date: '2023-09-27', PunchIn: "10:05", PunchOut: "07:15"},
        { date: '2023-09-28', PunchIn: "09:10", PunchOut: "07:15"},
        { date: '2023-09-29', PunchIn: "10:10", PunchOut: "06:30"},
        { date: '2023-09-30', PunchIn: "10:10", PunchOut: "07:15"},
        // Add more data for different days
      ];
  return (
    <>
            <div className="table-responsive">
          <table className="align-middle mb-0 table table-borderless table-striped table-hover">
            <thead>
              <tr>
              <th>DATE</th>
                <th className="text-center">Punch-In </th>
                <th className="text-center">Punch-Out</th>
              </tr>
            </thead>
            <tbody>
            {workHoursData.map((data) => {
                return(
<tr>
                <td>
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left flex2">
                          <div className="widget-heading">{data.date}</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center text-muted">{data.PunchIn}</td>
                  <td className="text-center text-muted">{data.PunchOut}</td>
                </tr>
                )
                     })}
            </tbody>
          </table>
        </div>
    </>
  )
}

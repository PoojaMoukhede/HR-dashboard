import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { ToastContainer, toast } from 'react-toastify';


export default function FullCalendarComponent() {
  // const toastInfo = () => toast.info('This is Toast Notification for Info');

  const handleDateClick = (arg) => {
    toast.info(`No events on ${arg.dateStr}`);
  };

  return (
    <>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <Header />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">
              <div className="row">
                <div className="App">
                  {/* <h1>Current Date/Month</h1> */}
                  <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    weekends={true}
                    dateClick={(e) => handleDateClick(e)}
                    events={[
                      { title: "event 1", date: "2023-09-07" },
                      { title: "event 2", date: "2023-09-18" },
                    ]}
                    eventContent={renderEventContent}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b style={{color:'red'}}>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

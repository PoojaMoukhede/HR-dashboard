import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

// const Event_get  = "http://localhost:8080/getevent";
// const Event_post  = "http://localhost:8080/postevent";

export default function FullCalendarComponent() {
  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
  });

  const handleDateClick = (arg) => {
    toast.info(`No events on ${arg.dateStr}`);
  };


  const handleAddEvent = () => {
    if (!formData.title || !formData.date || !formData.time) {
      toast.error("Please fill in all fields.");
      return;
    }
  
    const newEvent = {
      title: formData.title,
      date: `${formData.date}T${formData.time}:00`,
    };

    axios
      .post("http://localhost:8080/addevent", newEvent) 
      .then((response) => {
        const addedEvent = response.data;
  
        setEvents([...events, addedEvent]);
        setFormData({
          title: "",
          date: "",
          time: "",
        });
  
        toast.success("Event added successfully");
      })
      .catch((error) => {
        console.error("Error adding event:", error);
        toast.error("Error adding event. Please try again.");
      });
  };


  useEffect((e) => {   
    axios
      .get("http://localhost:8080/getevent")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <Header/>
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">
              <div className="row">
                <div className="App" style={{ backgroundColor: "white" }}>
                  <div
                    className="d-flex flex-row justify-content-center bg-night-sky mt-2 p-2 mb-2"
                    style={{ color: "white" }}
                  >
                    <form className="d-flex flex-row justify-content-center gap-4 mt-1">
                      <label>
                        Event Title:
                        <input
                          style={{
                            height: "2rem",
                            border: "none",
                            borderRadius: ".2rem",
                            background: "#edf0f2",
                          }}
                          className="ml-2 "
                          type="text"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                        />
                      </label>
                      <label>
                        Event Date:
                        <input
                          style={{
                            height: "2rem",
                            border: "none",
                            borderRadius: ".2rem",
                            background: "#edf0f2",
                          }}
                          type="date"
                          className="ml-2"
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                        />
                      </label>
                      <label>
                        Event Time:
                        <input
                          style={{
                            height: "2rem",
                            border: "none",
                            borderRadius: ".2rem",
                            background: "#edf0f2",
                          }}
                          type="time"
                          className="ml-2"
                          value={formData.time}
                          onChange={(e) =>
                            setFormData({ ...formData, time: e.target.value })
                          }
                        />
                      </label>
                    </form>
                    <button
                      onClick={handleAddEvent}
                      className="event ml-5 mt-1"
                      style={{
                        fontSize: "1rem",
                        height: "2rem",
                        border: "none",
                        color: "black",
                        background: "#edf0f2",
                        borderRadius: ".2rem",
                      }}
                    >
                      Add Event
                    </button>
                  </div>

                  <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    weekends={true}
                    dateClick={(e) => handleDateClick(e)}
                    events={events}
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
    
      <span style={{ color: "white" }}>
        {/* <b>{eventInfo.event.timeText}</b> */}
        <i className="text-uppercase ml-2">{eventInfo.event.title}</i>
      </span>
    </>
  );
}

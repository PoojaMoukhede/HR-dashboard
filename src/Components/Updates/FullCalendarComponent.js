import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import CustomModal from "./CustomModal";
import { FormGroup, Label, Input } from "reactstrap";
import { nanoid } from "nanoid";
import DateRangePicker from "react-bootstrap-daterangepicker";

// const Event_get  = "http://localhost:8080/getevent";
// const Event_post  = "http://localhost:8080/postevent";
let todayStr = new Date().toISOString().replace(/T.*$/, "");
export default function FullCalendarComponent() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const calendarRef = useRef(null);

  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const handleCloseModal = () => {
    handleClose();
    setModal(false);
  };

  // function handleWeekendsToggle() {
  //   setWeekendsVisible(!weekendsVisible);
  // }
  function handleDateSelect(selectInfo) {
    // console.log(selectInfo.view.type);
    if (selectInfo.view.type === "timeGridDay") {
      selectInfo.view.calendar.unselect();
      setState({ selectInfo, state: "create" });
      console.log("open modal create");
      setStart(selectInfo.start);
      setEnd(selectInfo.end);
      setModal(true);
    }
  }
  function renderEventContent(eventInfo) {
    return (
      <div>
        {/* <b>{eventInfo.timeText}</b> */}
        <i
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {eventInfo.event.title}
        </i>
      </div>
    );
  }
  function handleEventClick(clickInfo) {
    // console.log("open modal update, delete");
    setState({ clickInfo, state: "update" });
    // set detail
    setTitle(clickInfo.event.title);
    setStart(clickInfo.event.start);
    setEnd(clickInfo.event.end);

    setModal(true);
  }
  function handleEvents(events) {
    setCurrentEvents(events);
  }
  function handleEventDrop(checkInfo) {
    // console.log(checkInfo.event.start.toISOString());
    // checkInfo.revert();
    setState({ checkInfo, state: "drop" });
    setConfirmModal(true);
  }
  function handleEventResize(checkInfo) {
    // console.log(checkInfo);
    setState({ checkInfo, state: "resize" });
    setConfirmModal(true);
  }
  // function handleEdit() {
  //   // console.log(start, end);
  //   // state.clickInfo.event.setAllDay(true);

  //   state.clickInfo.event.setStart(start);
  //   state.clickInfo.event.setEnd(end);
  //   state.clickInfo.event.mutate({
  //     standardProps: { title },
  //   });
  //   handleClose();
  // }
  function handleSubmit() {
    // console.log(state.selectInfo.view.calendar);
    const newEvent = {
      // id: nanoid(),
      title,
      start: state.selectInfo?.startStr || start.toISOString(),
      end: state.selectInfo?.endStr || end.toISOString(),
      allDay: state.selectInfo?.allDay || false,
    };
    // console.log(newEvent);

    let calendarApi = calendarRef.current.getApi();
    // let calendarApi = selectInfo.view.calendar

    calendarApi.addEvent(newEvent);
    handleClose();
  }
  // function handleDelete() {
  //   // console.log(JSON.stringify(state.clickInfo.event));
  //   // console.log(state.clickInfo.event.id);
  //   state.clickInfo.event.remove();
  //   handleClose();
  // }
  function handleDelete() {
    const eventId = state.clickInfo.event.id; // Use the event's unique identifier
  
    axios
      .delete(`http://localhost:8080/delevent/${eventId}`)
      // .delete(`http://localhost:8000/events/${eventId}`)

      .then((response) => {
        const deleteEvent = formData.filter((row)=>row.id);
        setFormData(formData)
        // Handle success
        // Remove the event from the local state if necessary
        handleClose();
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        // Handle error
      });
  }
  function handleEdit() {
    const updatedEvent = {
      id: state.clickInfo.event.id, // Use the event's unique identifier
      title,
      start: start.toISOString(),
      end: end.toISOString(),
    };
  
    axios
      .put(`http://localhost:8080/addevent/${updatedEvent.id}`, updatedEvent)
      // .put(`http://localhost:8000/events/${updatedEvent.id}`, updatedEvent)

      .then((response) => {
        // Handle success
        // Close the modal and update the event in the local state if necessary
        handleClose();
      })
      .catch((error) => {
        console.error("Error updating event:", error);
        // Handle error
      });
  }
  function handleClose() {
    setTitle("");
    setStart(new Date());
    setEnd(new Date());
    setState({});
    setModal(false);
  }
  const [state, setState] = useState({});
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
      // .post("http://localhost:8000/events", newEvent)

      .then((response) => {
        const addedEvent = response.data;

        setEvents([...events, addedEvent]);
        setFormData({
          title: "",
          date: "",
          time: "",  //this is not in sql

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
        <Header />
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
                    ref={calendarRef}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    headerToolbar={{
                      left: "prev,today,next",
                      center: "title",
                      right: "dayGridMonth,timeGridDay",
                    }}
                    buttonText={{
                      today: "current",
                      month: "month",
                      week: "week",
                      day: "day",
                      list: "list",
                    }}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={weekendsVisible}
                    events={events}
                    eventContent={renderEventContent}
                    select={handleDateSelect}
                    eventClick={handleEventClick}
                    eventsSet={() => handleEvents(events)}
                    eventDrop={handleEventDrop}
                    eventResize={handleEventResize}
                    dateClick={handleDateClick}
                    eventAdd={(e) => {
                      console.log("eventAdd", e);
                    }}
                    eventChange={(e) => {
                      console.log("eventChange", e);
                    }}
                    eventRemove={(e) => {
                      console.log("eventRemove", e);
                    }}
                  />
                  {/* <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    weekends={true}
                    dateClick={(e) => handleDateClick(e)}
                    events={events}
                    eventContent={renderEventContent}
                  /> */}
                  <CustomModal
                    title={
                      state.state === "update" ? "Update Event" : "Add Event"
                    }
                    isOpen={modal}
                    toggle={handleCloseModal}
                    onCancel={handleCloseModal}
                    onSubmit={state.clickInfo ? handleEdit : handleSubmit}
                    submitText={state.clickInfo ? "Update" : "Save"}
                    onDelete={state.clickInfo && handleDelete}
                    deleteText="Delete"
                  >
                    <FormGroup>
                      <Label for="exampleEmail">Title</Label>
                      <Input
                        type="text"
                        name="title"
                        placeholder="with a placeholder"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">From - End</Label>
                      <DateRangePicker
                        initialSettings={{
                          locale: {
                            format: "M/DD hh:mm A",
                          },
                          startDate: start,
                          endDate: end,
                          timePicker: true,
                        }}
                        onApply={(event, picker) => {
                          setStart(new Date(picker.startDate));
                          setEnd(new Date(picker.endDate));
                        }}
                      >
                        <input className="form-control" type="text" />
                      </DateRangePicker>
                    </FormGroup>
                  </CustomModal>

                  <CustomModal
                    title={
                      state.state === "resize" ? "Resize Event" : "Drop Event"
                    }
                    isOpen={confirmModal}
                    toggle={() => {
                      state.checkInfo.revert();
                      setConfirmModal(false);
                    }}
                    onCancel={() => {
                      state.checkInfo.revert();
                      setConfirmModal(false);
                    }}
                    cancelText="Cancel"
                    onSubmit={() => setConfirmModal(false)}
                    submitText={"OK"}
                  >
                    Do you want to {state.state} this event?
                  </CustomModal>
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

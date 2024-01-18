import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./components.module.css";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [key, setKey] = useState(0)

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/appointments");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [key]);

  const handleEventClick = (clickedEvent) => {
    setShowModal(true);
    setSelectedEvent(clickedEvent);
  };

  const handleSelect = ({ start }) => {
    setShowModal(true);
    setSelectedDate(moment(start).startOf("day").toDate());
    setSelectedEvent(null);
  };

  const handleEventDelete = async () => {
    if (!selectedEvent || !selectedEvent.title) {
      return;
    }
    
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/appointments?full_name=${selectedEvent.title}`,
        {
          method: "DELETE",
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
  
      setEvents(prevEvents => prevEvents.filter(
        (event) => event.title !== selectedEvent.title
      ));
      setSelectedEvent(null);
      setShowModal(false);

      setKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  
  

  const renderHourBlocks = () => {
    const blocks = [];
    if (selectedDate) {
      for (let i = 9; i < 17; i++) {
        const startHour = moment(selectedDate).hour(i).toDate();
        const endHour = moment(selectedDate)
          .hour(i + 1)
          .toDate();
        blocks.push(
          <div
            key={i}
            className={styles.hourBlock}
            onClick={() => handleBlockSelection(startHour, endHour)}
            style={{ cursor: "pointer" }}
          >
            {moment(startHour).format("LT")} - {moment(endHour).format("LT")}
          </div>
        );
      }
    }
    return blocks;
  };

  const handleBlockSelection = async (startHour, endHour) => {
    console.log("Start Hour:", startHour);
    console.log("End Hour:", endHour);
    if (!fullName || !phoneNumber) {
      alert("Please fill in your name and phone number" );
      return;
    }

    setShowModal(false);

    const newEvent = {
      id: 0,
      start_time: moment(startHour).toDate(),
      end_time: moment(endHour).toDate(),
      full_name: fullName,
      phone_number: phoneNumber,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEvent),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create scheduled block");
      }
      setEvents(prevEvents => [...prevEvents, newEvent]);
    } catch (error) {
      console.error("Error creating scheduled block:", error);
    } finally {
      setFullName("");
      setPhoneNumber("");
    }
  };

  const CustomEvent = ({ event }) => {
    return (
      <div>
        <strong>{event.full_name}</strong>
      </div>
    );
  };

  return (
    <div style={{ height: "600px" }}>
      <Calendar
        key={key}
        localizer={localizer}
        events={events.map((event) => ({
          ...event,
          title: event.full_name,
          id: event.id,
          phone: event.phone_number
        }))}
        startAccessor="start_time"
        endAccessor="end_time"
        onSelectEvent={(event) => handleEventClick(event)}
        onSelectSlot={(slotInfo) => {
          handleSelect(slotInfo);
        }}
        selectable
        style={{
          margin: "20px",
          fontSize: "20px",
        }}
        defaultView="month"
        views={["month", "day"]}
        toolbar
        popup
        components={{
          event: CustomEvent,
          month: {
            header: ({ date, label }) => (
              <div className={styles.custom_month_header}>
                <span className={styles.custom_month_label}>{label}</span>
              </div>
            ),
          },
        }}
        eventPropGetter={(event, start, end, isSelected) => {
          let newStyle = {
            backgroundColor: "#3174ad",
            borderRadius: "5px",
            border: "none",
            color: "white",
            display: "block",
            height: "20px",
            fontSize: "12px", 
          };

          return {
            style: newStyle,
          };
        }}
      />
      {selectedEvent && showModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            zIndex: "999",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div>
            <span
              style={{ float: "right", cursor: "pointer" }}
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <h2>Event Details</h2>
            <p>
              <strong>Title:</strong> {selectedEvent.title}
            </p>
            <p>
              <strong>Start:</strong>{" "}
              {moment(selectedEvent.start_time).format("LLL")}
            </p>
            <p>
              <strong>End:</strong>{" "}
              {moment(selectedEvent.end_time).format("LLL")}
            </p>
            <p>
              <strong>Phone</strong> {selectedEvent.phone}
            </p>
            <button onClick={handleEventDelete}>Delete Event</button>
          </div>
        </div>
      )}
      {showModal && !selectedEvent && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            zIndex: "999",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div>
            <span
              style={{ float: "right", cursor: "pointer" }}
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <h2>Select Hour Block</h2>
            {renderHourBlocks()}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;

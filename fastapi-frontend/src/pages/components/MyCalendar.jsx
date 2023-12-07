import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './components.module.css'

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
  
    const handleSelect = ({ start }) => {
      setShowModal(true);
      setSelectedDate(moment(start).startOf('day').toDate());
    };
  
    const handleBlockSelection = (startHour, endHour) => {
      if (!fullName || !phoneNumber) {
        alert('Please fill in your name and phone number');
        return;
      }
  
      setShowModal(false);
      setEvents([
        ...events,
        {
          start: startHour,
          end: endHour,
          title: 'New Event',
          fullName,
          phoneNumber,
        },
      ]);
  
      // Clear the input fields after adding the event
      setFullName('');
      setPhoneNumber('');
    };
  
    const renderHourBlocks = () => {
      const blocks = [];
      if (selectedDate) {
        for (let i = 9; i < 17; i++) {
          const startHour = moment(selectedDate).hour(i).toDate();
          const endHour = moment(selectedDate).hour(i + 1).toDate();
          blocks.push(
            <div key={i}>
              <button
                onClick={() => handleBlockSelection(startHour, endHour)}
                disabled={!fullName || !phoneNumber} // Disable button if fields are empty
              >
                {moment(startHour).format('LT')} - {moment(endHour).format('LT')}
              </button>
            </div>
          );
        }
      }
      return blocks;
    };
  
    return (
      <div style={{ height: '600px'}}>
        <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={(slotInfo) => {
          console.log('onSelectSlot event:', slotInfo);
          handleSelect(slotInfo);
        }}
        selectable
        style={{ 
            margin: '20px',
            fontSize: "20px"    
    }}
        defaultView="month"
        views={['month']}
        toolbar
        popup
        components={{
          // Customize the month header
          month: {
            header: ({ date, label }) => (
              <div className={styles.custom_month_header}>
                <span className={styles.custom_month_label}>{label}</span>
              </div>
            ),
          },
        }}
      />
        {showModal && (
          <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    zIndex: '999',
                    padding: '20px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                  }}
          >
            <div>
              <span
                style={{ float: 'right', cursor: 'pointer' }}
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
  

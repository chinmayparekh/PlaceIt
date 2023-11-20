import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useSelector } from "react-redux";

const localizer = momentLocalizer(moment);

function OutlookCalendar(props) {
  const events = useSelector((state) => state.eventsReducer.events);

  return (
    <>
      <div>
        <h1>Calendar</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </>
  );
}

export default OutlookCalendar;

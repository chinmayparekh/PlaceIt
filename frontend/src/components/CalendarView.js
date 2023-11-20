import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useSelector } from "react-redux";

const localizer = momentLocalizer(moment);

function CalendarView(props) {
  const events = useSelector((state) => state.eventsReducer.events);

  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </>
  );
}

export default CalendarView;

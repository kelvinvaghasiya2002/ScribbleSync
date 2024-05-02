import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarComp() {
  const [date, changeDate] = useState(new Date());

  function changeValue(val) {
    changeDate(val)
  }
  return (
    <>
      <div>
        <Calendar
          value={date}
          onChange={changeValue}
        />
      </div>

      <div>
        <p>{date.toDateString()}</p>
      </div>
    </>
  )
}

export default CalendarComp
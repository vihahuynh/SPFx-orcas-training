import * as React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
// import resourceTimelinePlugin from '@fullcalendar/resource-timeline' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'

const FullCalendarComponent = () => {
  return (
    <FullCalendar
      // schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
      plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      }}
      events={[
        {
          title: 'All Day Event',
          start: '2022-11-01',
        },
        {
          title: 'Long Event',
          start: '2022-11-07',
          end: '2022-11-10'
        },
        {
          groupId: '999',
          title: 'Repeating Event',
          start: '2022-11-09T16:00:00'
        },
        {
          groupId: '999',
          title: 'Repeating Event',
          start: '2022-11-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2022-11-11',
          end: '2022-11-13'
        },
        {
          title: 'Meeting',
          start: '2022-11-12T10:30:00',
          end: '2022-11-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2022-11-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2022-11-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2022-11-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2022-11-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2022-11-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2022-11-28'
        }
      ]}
    />
  )
}

export default FullCalendarComponent
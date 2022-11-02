import * as React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import { createEventId } from './event-utils'
import { IFullCalendarProps } from '../../fullCalendar/components/IFullCalendarProps'
import CarRentingService from '../../../services/CarServices'
import ICarRenting from '../../../models/ICarRenting'

const FullCalendarResourceGroup = (props: IFullCalendarProps) => {
  const [resources, setResources] = React.useState([])
  const [events, setEvents] = React.useState([])

  React.useEffect(() => {
    const carRentingService = new CarRentingService(props.webPartCtx)
    carRentingService.get()
      .then(result => {
        const data = result.reduce((res, item: ICarRenting) => {
          if (!res.filter(i => i.title === item.Car.Title).length) {
            const customItem = {
              id: item.ID,
              title: item.Car.Title,
              eventColor: "orange"
            }
            return res.concat(customItem)
          }
          return res
        }, [])
        setResources(data)
        const eventsData = result.map(item => {
          return {
            id: createEventId(),
            title: item.Title,
            start: item.StartTime,
            end: item.EndTime,
            resourceId: data.filter(i => i.title === item.Car.Title)?.[0]?.id
          }
        })
        // console.log(INITIAL_EVENTS)
        console.log(eventsData)
        setEvents(eventsData)
      })
      .catch(err => console.log(err))
  }, [props.webPartCtx])
  // const [weekendsVisible, setWeekendVisible] = useState(true)
  // const [currentEvents, setCurrentEvent] = useState([])


  // const handleWeekendsToggle = () => {
  //   setWeekendVisible(prev => !prev)
  // }

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  const handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  // const handleEvents = (events) => {
  //   setCurrentEvent(events)
  // }

  if (!events.length || !resources.length) return <></>
  return (
    <div className='demo-app'>
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,resourceTimelineDay'
          }}
          initialView='resourceTimelineDay'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          initialEvents={events} // alternatively, use the `events` setting to fetch from a feed
          resources={resources}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
        // eventsSet={handleEvents}
        />
      </div>
    </div>
  )
}

// renderSidebar() {
//   return (
//     <div className='demo-app-sidebar'>
//       <div className='demo-app-sidebar-section'>
//         <h2>Instructions</h2>
//         <ul>
//           <li>Select dates and you will be prompted to create a new event</li>
//           <li>Drag, drop, and resize events</li>
//           <li>Click an event to delete it</li>
//         </ul>
//       </div>
//       <div className='demo-app-sidebar-section'>
//         <label>
//           <input
//             type='checkbox'
//             checked={this.state.weekendsVisible}
//             onChange={this.handleWeekendsToggle}
//           ></input>
//           toggle weekends
//         </label>
//       </div>
//       <div className='demo-app-sidebar-section'>
//         <h2>All Events ({this.state.currentEvents.length})</h2>
//         <ul>
//           {this.state.currentEvents.map(renderSidebarEvent)}
//         </ul>
//       </div>
//     </div>
//   )
// }

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  )
}

export default FullCalendarResourceGroup
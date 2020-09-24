import React from 'react'
import Event from './Event'

const EventList = ({events}) => {
  return (
    <>
      { events && events.map(event => {
        return (
            <Event key={event.id} event={event} />
        )
      })}  
    </>
  )
}

export default EventList;
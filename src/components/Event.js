import React from 'react';
import classNames from "classnames";

const Event = ({event}) => {
  return (
    <div className={classNames( 'title', event.eventType.toLowerCase() )} id={event.time} key={event.id} >
        <h1>{event.name}</h1>
        <h2> {event.startTime.slice(0,3)} @ {event.startTime.slice(17,21)} pm</h2>
        <p>{event.text}</p>
        {event.url ? <a className="link" href={event.url} target="_blank">{event.url}</a> : null}
    </div>
  )
}

export default Event;
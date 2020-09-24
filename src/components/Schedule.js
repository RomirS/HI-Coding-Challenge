import React from 'react';
import { Link } from "react-scroll";
import EventList from './EventList';

class Schedule extends React.Component {

    state = {
        loading: true,
        events: []
    }

    async componentDidMount() {
        const url = "https://api.hackillinois.org/event/";
        const res = await fetch(url);
        const data = await res.json();
        this.setState({loading: false, events: data.events});
    }

    render () {
        const { loading, events } = this.state;
        const times = [];
        events.sort((a, b) => {
            return a.startTime - b.startTime;
        });
        events.map(event => {
            let startDate = new Date(event.startTime);
            event.startTime = startDate.toString();
            let endDate = new Date(event.startTime);
            event.endTime = endDate.toString();

            event.description = event.description.toString();
            let i = event.description.indexOf('http');
            if ( i === -1  && !event.url ) event.url = null;
            else {
                event.url = event.description.slice(i);
                event.text = event.description.slice(0, i);
            }

            let indexTime = event.startTime.slice(17,21);
            if ( !times.includes(indexTime) ) {
                times.push(indexTime);
                event.time = indexTime;
            }
        });

        if (loading) {
            return <div>loading...</div>
        } else if (!events.length) {
            return <div>No events :(</div>
        }

        return (
            <>
                <div className="sidenav">
                    <h1 classname="day">Monday, January 19th</h1>
                    {times.map(time => (
                        <Link key={time} className="timeStamp" activeClass="active" to={time} spy={true} smooth={true} duration={200}>
                            {time} pm
                        </Link>
                    ))}
                </div>
                <div className="main">
                    <h1 className="minHeading">Monday, January 19th</h1>
                    <EventList events={events} />
                </div>
            </>
        );
    }
}

export default Schedule;

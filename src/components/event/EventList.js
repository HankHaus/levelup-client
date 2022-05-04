import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager.js"
import { useHistory } from 'react-router-dom'

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
    onClick={() => {
        history.push({ pathname: "/events/new" })
    }}
>Register New Event</button>
            {
                events.map(e => {
                    return <section key={`event--${e.id}`} className="event">
                        <div className="event__game">{e.game.title} organized by {e.organizer.user.username}</div>
                        <div className="event__time__date">being held at {e.time} on {e.date}</div>
                        <div className="event__description">{e.description}</div>
                        <button className="btn"
                            onClick={() => {
                                history.push({ pathname: `/events/edit/${e.id}` })
                            }}
                        >Edit Event</button>
                        <br></br>
                        <br></br>
                        <br></br>
                    </section>
                })
            }
        </article>
    )
}
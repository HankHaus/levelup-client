import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(e => {
                    return <section key={`event--${e.id}`} className="event">
                        <div className="event__game">{e.game.title} organized by {e.organizer.user.username}</div>
                        <div className="event__time__date">being held at {e.time} on {e.date}</div>
                        <div className="event__description">{e.description}</div>
                    </section>
                })
            }
        </article>
    )
}
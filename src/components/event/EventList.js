import React, { useEffect, useState } from "react"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "./EventManager.js"
import { useHistory } from 'react-router-dom'

export const EventList = (props) => {
    const [events, setEvents] = useState([])
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
                        <button className="btn"
                            onClick={() => {
                                const deleteEvent = (event) => {
                                    const requestOptions = {
                                        method: 'DELETE',
                                        headers: {
                                            "Content-Type": "application/json",
                                            "Authorization": `Token ${localStorage.getItem("lu_token")}`
                                        },
                                        body: JSON.stringify(event)
                                    };
                                    return fetch(`http://localhost:8000/events/${e.id}`, requestOptions)
                                }
                                deleteEvent()
                                    // .then(getEvents())
                                    .then(() => {
                                        history.push("/games")
                                    })
                                    .then(() => {
                                        history.push("/events")
                                    })
                            }}
                        >Delete Event</button>
                        {
                            e.joined
                                ? <button onClick={() => {
                                    leaveEvent(e.id)
                                        .then(() => getEvents())
                                        .then(() => {
                                            history.push("/games")
                                        })
                                        .then(() => {
                                            history.push("/events")
                                        })
                                }}>Leave Event</button>
                                : <button onClick={() => {
                                    joinEvent(e.id)
                                        .then(() => getEvents())
                                        .then(() => {
                                            history.push("/games")
                                        })
                                        .then(() => {
                                            history.push("/events")
                                        })
                                }}>Join Event</button>
                        }
                        <hr></hr>
                    </section>
                })
            }
        </article>
    )
}
import { useHistory } from 'react-router-dom'
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getGames } from '../game/GameManager';

export const EventEditForm = () => {
    const [event, assignEvent] = useState([])
    const [games, assignGames] = useState([])
    const { eventId } = useParams()
    const history = useHistory()
    useEffect(
        () => {
            return fetch(`http://localhost:8000/events/${eventId}`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("lu_token")}`
                }
            })
                .then(r => r.json())
                .then((data) => {
                    assignEvent(data)
                })
        }, [eventId]
    )

    useEffect(() => {
        getGames().then(data => assignGames(data))
    }, [])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = { ...event }
        copy[domEvent.target.name] = domEvent.target.value
        assignEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Update event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={event.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="text" name="date" required autoFocus className="form-control"
                        value={event.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="text" name="time" required autoFocus className="form-control"
                        value={event.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select name="game"

                        onChange={(e) => {
                            changeEventState(e)
                        }}
                    // defaultValue={game.game_type}
                    >
                        <option disabled hidden>Select Game...</option>
                        {
                            games.map(
                                (g) => {
                                    if (g.id === event.game?.id) {

                                        return (
                                            <option selected key={`g--${g.id}`} value={`${g.id}`}>
                                                {`${g.title}`}
                                            </option>
                                        )
                                    }
                                    else {
                                        return (<option key={`g--${g.id}`} value={`${g.id}`}>
                                            {`${g.title}`}
                                        </option>)
                                    }
                                }
                            )
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const updatedEvent = {
                        description: event.description,
                        date: event.date,
                        time: event.time,
                        game: parseInt(event.game)
                    }



                    const updateEvent = (event) => {
                        const requestOptions = {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Token ${localStorage.getItem("lu_token")}`
                            },
                            body: JSON.stringify(updatedEvent)
                        };
                        return fetch(`http://localhost:8000/events/${eventId}`, requestOptions)
                        // .then(response => response.json())
                    }


                    // Send POST request to your API
                    updateEvent(updatedEvent)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}
import { fetchIt } from "../../utils/Fetch"
export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createEvent = (event) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(event)
    };
    return fetch('http://localhost:8000/events', requestOptions)
        .then(response => response.json())
}

export const joinEvent = eventId => {
    // TODO: Write the POST fetch request to join and event
    return fetchIt(
        `http://localhost:8000/events/${eventId}/signup`,
        {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        },
        "POST"
    )
}

export const leaveEvent = eventId => {
    // TODO: Write the DELETE fetch request to leave an event
    return fetchIt(
        `http://localhost:8000/events/${eventId}/leave`,
        {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        },
        "DELETE"
    )
}
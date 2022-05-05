import { useHistory } from 'react-router-dom'
import { updateGame, getGameTypes } from './GameManager.js'
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export const GameEditForm = () => {
    const [game, assignGame] = useState([])
    const { gameId } = useParams()
    const [gameTypes, setGameTypes] = useState([])
    const history = useHistory() 
    useEffect(
        () => {
                return fetch(`http://localhost:8000/games/${gameId}`, {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("lu_token")}`
                    }
                })
                    .then(r => r.json())
                    .then((data) => {
                        assignGame(data)
                    })
        }, [gameId]
    )


    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = { ...game }
        copy[domEvent.target.name] = domEvent.target.value
        assignGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={game.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={game.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number Of Players: </label>
                    <input type="text" name="number_of_players" required autoFocus className="form-control"
                        value={game.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="text" name="skill_level" required autoFocus className="form-control"
                        value={game.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">Game Type: </label>
                    <select name="game_type"
                    
                        onChange={(e) => {
                            changeGameState(e)
                        }}
                        // defaultValue={game.game_type}
                        >
                        <option disabled hidden>Select Game Type...</option>
                        {
                            gameTypes.map(
                                (gt) => {
                                    if (gt.id === game.game_type?.id) {
                                        
                                        return (
                                            <option selected key={`gt--${gt.id}`} value={`${gt.id}`}>
                                                {`${gt.label}`}
                                            </option>
                                        )
                                    }
                                    else {
                                        return (<option key={`gt--${gt.id}`} value={`${gt.id}`}>
                                        {`${gt.label}`}
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

                    const updatedGame = {
                        maker: game.maker,
                        title: game.title,
                        number_of_players: parseInt(game.number_of_players),
                        skill_level: parseInt(game.skill_level),
                        game_type: parseInt(game.game_type)
                    }
                    


                    const updateGame = (game) => {
                        const requestOptions = {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Token ${localStorage.getItem("lu_token")}`
                            },
                            body: JSON.stringify(updatedGame)
                        };
                        return fetch(`http://localhost:8000/games/${gameId}`, requestOptions)
                            // .then(response => response.json())
                    }


                    // Send POST request to your API
                    updateGame(updatedGame)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}
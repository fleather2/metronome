import { useState, useEffect } from "react";

const Player = ({bpm, numBeats}) => {

    const [childPlayer, setChildPlayer] = useState();
    const [currentBeat, setCurrentBeat] = useState(1); 
    const [prevTime, setPrevTime] = useState(Date());

    let interval;
    useEffect( () => {
        interval = setInterval( () => {
            if (currentBeat >= numBeats) {
                setCurrentBeat(1);
            } else {
                setCurrentBeat(currentBeat + 1);
            }
        }, 60000/bpm);

        return () => clearInterval(interval);
    }, [currentBeat, bpm, numBeats]);
    
    return (<p>{currentBeat}</p>);
    
}

export default Player;
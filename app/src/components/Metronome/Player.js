import { useState, useEffect } from "react";


const Player = ({bpm, numBeats}) => {

    const [childPlayer, setChildPlayer] = useState();
    const [currentBeat, setCurrentBeat] = useState(1); 

    let interval;
    useEffect( () => {
        interval = setInterval( () => {
            setCurrentBeat(currentBeat + 1);
        }, 60000/bpm);

        return () => clearInterval(interval);
    }, [currentBeat, bpm]);
    
    return (<p>{currentBeat}</p>);
    
}

export default Player;
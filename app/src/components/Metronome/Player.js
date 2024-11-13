import { useState, useEffect } from "react";

function playTone(audioContext, freq, duration, vol) {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    gain.gain.value = 0;
    osc.frequency.value = freq;
    osc.start();

    setTimeout( () => {
        osc.stop();
    }, 75)
    return;
}

const Player = ({bpm, numBeats, audioContext}) => {

    const [currentBeat, setCurrentBeat] = useState(1); 
    const [prevTime, setPrevTime] = useState(Date.now());

    let interval;
    useEffect( () => {
        interval = setInterval( () => {
            const targetTime = prevTime + 60000/bpm;
            const now = Date.now();
            if (now >= targetTime) {
                // Increment the beat
                if (currentBeat >= numBeats) {
                    setCurrentBeat(1);
                    playTone(audioContext, 880, 50, 1);
                    
                } else {
                    setCurrentBeat(currentBeat + 1);
                    playTone(audioContext, 800, 50, 1);
                }
                setPrevTime(now);
            }
        }, 5);

        return () => clearInterval(interval);
    }, [currentBeat, bpm, numBeats]);
    
    return (<p>{currentBeat}</p>);
    
}

export default Player;
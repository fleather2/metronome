import { useState, useEffect } from "react";
import { animate } from "motion";
import { Container } from "@mui/material";
import "./beat.css";

function playTone(audioContext, freq, duration, vol) {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    gain.gain.value = vol;
    osc.frequency.value = freq;
    osc.start();
    gain.gain.setTargetAtTime(0, audioContext.currentTime + 0.01, 0.02)

    return;
}

const Player = ({bpm, numBeats, audioContext, doRunMetronome}) => {

    const [currentBeat, setCurrentBeat] = useState(1); 
    const [prevTime, setPrevTime] = useState(Date.now());

    let interval;
    useEffect( () => {
        interval = setInterval( () => {
            const targetTime = prevTime + 60000/bpm;
            const now = Date.now();
            if (now >= targetTime) {
                console.log(audioContext.state)
                // Increment the beat
                if (currentBeat >= numBeats) {
                    setCurrentBeat(1);
                    playTone(audioContext, 880, 50, .5);
                    
                } else {
                    setCurrentBeat(currentBeat + 1);
                    playTone(audioContext, 800, 50, .5);
                }
                setPrevTime(now);
            }
        }, 5);
        return () => clearInterval(interval);
    }, [currentBeat, numBeats]);
    
    return (
        <Container>
            <div className="beatCircle" />
            <p>{currentBeat}</p>
        </Container>
        ); 
}

export default Player;
import { useState, useEffect } from "react";
import { animate } from "motion";
import { Container, Button } from "@mui/material";
import "./beat.css";

let ac;
let oscNode; 
let gainNode;

const Player = ({bpm, numBeats}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    


    useEffect( () => {
        ac = new AudioContext();
        oscNode = ac.createOscillator();
        gainNode = ac.createGain();
        oscNode.connect(gainNode);
        gainNode.connect(ac.destination);
        oscNode.frequency.value = 880;
        gainNode.gain.value = 0;
        oscNode.start();
        console.log("Setup");
    }, [])

    const startMetronome = () => {
        if (!isPlaying) {
            ac.resume();
            setIsPlaying(true);
            let startTime = ac.currentTime;
            let beepDuration = 0.04;
            let beepInterval = 0.5;
            for (let i = 0; i < 1000; i ++) {
                gainNode.gain.setValueAtTime(0, startTime + i*beepInterval)
                gainNode.gain.setValueAtTime(1, startTime + i*beepInterval + 0.01)
                gainNode.gain.setValueAtTime(0, startTime + i*beepInterval + 0.01 + beepDuration)
            }
            console.log("Start");
        }
    }
    const stopMetronome = () => {
        if (isPlaying) {
            gainNode.gain.value = 0;
            gainNode.gain.cancelScheduledValues(ac.currentTime);
            setIsPlaying(false);
            console.log("Stop");
        }
    }

    return (
        <Container>
            <Button variant="contained" onClick={startMetronome}>Start</Button>
            <Button variant="contained" onClick={stopMetronome}>Stop</Button>
            <div className="beatCircle" />
        </Container>
        ); 
}

export default Player;
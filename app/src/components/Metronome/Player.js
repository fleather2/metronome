import { useState, useEffect, useRef} from "react";
import { animate } from "motion";
import { Container, Button } from "@mui/material";
import "./beat.css";

let ac;
let oscNode; 
let gainNode;

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

const Player = ({bpm, numBeats}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const hasPageBeenRendered = useRef(false);
    const [currentBeat, setCurrentBeat] = useState(0);
    const [beatTimes, setBeatTimes] = useState([]);

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
        hasPageBeenRendered.current = true;
        stopMetronome();
    }, [])

    useEffect ( () => {
        if (hasPageBeenRendered.current) {
            startMetronome();
        }
    }, [bpm])

    async function startMetronome() {
        await timeout(100);
        ac.resume();
        setIsPlaying(true);
        let startTime = ac.currentTime;
        gainNode.gain.cancelScheduledValues(ac.currentTime);
        let preBeep = 0.005;
        let beepDuration = 0.04;
        let beepInterval = 60/bpm;
        for (let i = 0; i < 1000; i ++) {
            gainNode.gain.setValueAtTime(0, startTime + i*beepInterval)
            gainNode.gain.linearRampToValueAtTime(1, startTime + i*beepInterval + preBeep)
            gainNode.gain.linearRampToValueAtTime(0, startTime + i*beepInterval + preBeep + beepDuration + 0.04)
            setBeatTimes( (beatTimes) => [...beatTimes, startTime + i*beepInterval])
            if (i % numBeats === 0) {
                oscNode.frequency.setValueAtTime(990, startTime + i*beepInterval);
                oscNode.frequency.setValueAtTime(880, startTime + i*beepInterval + preBeep + beepDuration + 0.04);
            }
        }
        console.log(beatTimes);
        console.log("Start");
    }

    async function stopMetronome() {
        gainNode.gain.value = 0;
        gainNode.gain.cancelScheduledValues(ac.currentTime);
        setIsPlaying(false);
        console.log("Stop");
    }

    // useEffect( () => {
    //     const intervalId = setInterval( () => {
    //         if (beatTimes[currentBeat] < ac.currentTime) {
    //             setCurrentBeat(currentBeat + 1);

    //         }
    //     }, 5);
    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, [beatTimes, currentBeat])

    return (
        <Container>
            <Button variant="contained" onClick={() => startMetronome()}>Start</Button>
            <Button variant="contained" onClick={stopMetronome}>Stop</Button>
            <div className="beatCircle" />
            <p>{currentBeat}</p>
        </Container>
        ); 
}

export default Player;
import { useState, useEffect, useRef} from "react";
import { animate } from "motion";
import { Container, Button } from "@mui/material";
import "./beat.css";

const Player = ({bpm, numBeats, audioContext, gainNode, beatSet}) => {
    const hasPageBeenRendered = useRef(false);
    const [beatList, setBeatList] = useState([]);
    const [play, setPlay] = useState(false);
    
    useEffect( () => {
        console.log(beatList);
    }, [beatList])

    let intervalDuration = 0.9;
    useEffect( () => {
        if (play) {
            const intervalId = setInterval( () => {
                const startTime = audioContext.currentTime;
                const noteInterval = 60/bpm;
                let nextNoteTime = noteInterval*(Math.floor(audioContext.currentTime/noteInterval)+1);

                while (nextNoteTime <= startTime + intervalDuration) {
                    audioContext.resume();
                    console.log("Scheduling note for", nextNoteTime);
                    const oscNode = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    gainNode.connect(audioContext.destination);
                    gainNode.gain.value = 0;
                    oscNode.connect(gainNode);

                    // Emphasize strong beats
                    const b = Math.round(nextNoteTime / noteInterval);
                    console.log("Beat num", b);
                    if (b % numBeats === 0) {
                        oscNode.frequency.value = 1000;
                    } else {
                        oscNode.frequency.value = 800;
                    }

                    oscNode.start(nextNoteTime);
                    gainNode.gain.setValueAtTime(0, nextNoteTime);
                    gainNode.gain.linearRampToValueAtTime(1, nextNoteTime + 0.005);
                    gainNode.gain.setValueAtTime(1, nextNoteTime + 0.05);
                    gainNode.gain.linearRampToValueAtTime(0, nextNoteTime + 0.055);
                    oscNode.stop(nextNoteTime + 0.055);
                    
                    const beat = {
                        beatTime: nextNoteTime,
                        beatNum: b
                    }
                    setBeatList((prevArray) => {
                        const newArray = [...prevArray, beat];
                        return newArray;
                    });
                    nextNoteTime += noteInterval;
                } 
            }, intervalDuration*1000)
            return () => {
                clearInterval(intervalId);
            }
        }
    }, [bpm, play])

    return (
        <Container>
            <Button onClick={() => setPlay(true)}>Start</Button>
            <Button onClick={() => setPlay(false)}>Stop</Button>
        </Container>
    )
}

export default Player;
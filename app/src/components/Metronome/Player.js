import { useState, useEffect, useRef} from "react";
import { animate } from "motion";
import { Container, Button } from "@mui/material";
import "./beat.css";

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

const Player = ({bpm, numBeats, audioContext, gainNode}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const hasPageBeenRendered = useRef(false);
    const [beatSchedule, setBeatSchedule] = useState([]);
    const [beatCounter, setBeatCounter] = useState(0);

    let intervalDuration = 0.9;
    useEffect( () => {
        setBeatSchedule([]);
        const intervalId = setInterval( () => {
            const startTime = audioContext.currentTime;
            
            let noteInterval = 60/bpm;
            let nextNoteTime = noteInterval*(Math.floor(audioContext.currentTime/noteInterval)+1);
            let newBeatSchedule = [];

            while (nextNoteTime <= startTime + intervalDuration) {
                audioContext.resume();
                console.log("Scheduling note for", nextNoteTime);
                const oscNode = audioContext.createOscillator();
                oscNode.connect(gainNode);
                
                newBeatSchedule.push({
                    noteTime: nextNoteTime,
                    beatCount: beatCounter
                })
                const a = beatSchedule.find((element) => element.beatTime === nextNoteTime);
                

                let b = ((nextNoteTime) % (noteInterval*4));
                if (Math.abs(b-0) < 0.01 || Math.abs(b-numBeats*noteInterval) < 0.01) {
                    oscNode.frequency.value = 1000;
                } else {
                    oscNode.frequency.value = 800;
                }
                console.log("Beat number:", b);

                oscNode.start(nextNoteTime);
                oscNode.stop(nextNoteTime + 0.05);
                nextNoteTime += noteInterval;
            }
        //console.log("Beat schedule", newBeatSchedule);
        

        }, intervalDuration*1000)
        return () => {
            clearInterval(intervalId);
        }
    }, [bpm])

    // useEffect( () => {
    //     const intervalId = setInterval( () => {
    //         console.log(beatSchedule);
    //     }, 1000)
    //     return () => {
           
    //     }

    // }, [])

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
            {/* <Button variant="contained" onClick={() => startMetronome()}>Start</Button>
            <Button variant="contained" onClick={stopMetronome}>Stop</Button> */}
            <div className="beatCircle" />
        </Container>
        ); 
}

export default Player;
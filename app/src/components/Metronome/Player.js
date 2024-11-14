import { useState, useEffect, useRef} from "react";
import { animate } from "motion";
import { Container, Button } from "@mui/material";
import "./beat.css";

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

const Player = ({bpm, numBeats, audioContext, gainNode, beatMap}) => {
    const hasPageBeenRendered = useRef(false);

    let intervalDuration = 0.9;
    useEffect( () => {
        const intervalId = setInterval( () => {
            const startTime = audioContext.currentTime;
            
            let noteInterval = 60/bpm;
            let nextNoteTime = noteInterval*(Math.floor(audioContext.currentTime/noteInterval)+1);

            while (nextNoteTime <= startTime + intervalDuration) {
                audioContext.resume();
                console.log("Scheduling note for", nextNoteTime);
                const oscNode = audioContext.createOscillator();
                oscNode.connect(gainNode);

                // Emphasize strong beats
                let b = Math.round(nextNoteTime / noteInterval);
                console.log("Beat num", b);
                if (b % numBeats === 0) {
                    oscNode.frequency.value = 1000;
                } else {
                    oscNode.frequency.value = 800;
                }

                oscNode.start(nextNoteTime);
                oscNode.stop(nextNoteTime + 0.05);
                nextNoteTime += noteInterval;
            }        

        }, intervalDuration*1000)
        return () => {
            clearInterval(intervalId);
        }
    }, [bpm])

}

export default Player;
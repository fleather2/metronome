import { useState, useEffect, useRef} from "react";
import { Container, Button, Stack} from "@mui/material";
let MAX_GAIN = 0.2;
const Player = ({bpm, numBeats, audioContext, currentBeat, setCurrentBeat}) => {
    const [play, setPlay] = useState(false);
    
    let intervalDuration = 0.9;
    useEffect( () => {
        if (play) {
            const intervalId = setInterval( () => {
                const startTime = audioContext.currentTime;
                const noteInterval = 60/bpm;
                let nextNoteTime = noteInterval*(Math.floor(audioContext.currentTime/noteInterval)+1);

                while (nextNoteTime <= startTime + intervalDuration) {
                    audioContext.resume();
                    //console.log("Scheduling note for", nextNoteTime);
                    const oscNode = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    gainNode.connect(audioContext.destination);
                    gainNode.gain.value = 0;
                    oscNode.connect(gainNode);

                    // Emphasize strong beats
                    const b = Math.round(nextNoteTime / noteInterval);
                    //console.log("Beat num", b);
                    if (b % numBeats === 0) {
                        oscNode.frequency.value = 1000;
                    } else {
                        oscNode.frequency.value = 800;
                    }

                    oscNode.start(nextNoteTime);
                    gainNode.gain.setValueAtTime(0, nextNoteTime);
                    gainNode.gain.linearRampToValueAtTime(MAX_GAIN, nextNoteTime + 0.005);
                    gainNode.gain.setValueAtTime(MAX_GAIN, nextNoteTime + 0.05);
                    gainNode.gain.linearRampToValueAtTime(0, nextNoteTime + 0.055);
                    oscNode.stop(nextNoteTime + 0.055);
                    
                    const beat = {
                        beatTime: nextNoteTime,
                        beatNum: b
                    }
                    nextNoteTime += noteInterval;
                    scheduleBeatChange(beat);
                } 
            }, intervalDuration*1000)
            return () => {
                clearInterval(intervalId);
            }
        }
    }, [bpm, play])

    function scheduleBeatChange(beat) {
        if (play) {
            console.log(beat, (beat.beatTime - audioContext.currentTime)*1000);
            setTimeout( () => {
                setCurrentBeat(beat.beatNum);
            }, (beat.beatTime - audioContext.currentTime)*1000)
        }
    }

    function startMetronome() {
        setCurrentBeat(0);
        audioContext.resume();
        setPlay(true);
    }

    function stopMetronome() {
        audioContext.suspend();
        setPlay(false);
    }

    return (
        <Container>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <Button variant="contained" onClick={() => startMetronome()}>Start</Button>
                <Button variant="contained" onClick={() => stopMetronome()}>Stop</Button>
            </Stack>
        </Container>
    )
}

export default Player;
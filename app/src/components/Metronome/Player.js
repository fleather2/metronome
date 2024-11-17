import { useState, useEffect, useRef} from "react";
import { animate } from "motion";
import { Container, Button } from "@mui/material";
import Dots from "./Dots";

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

const Player = ({bpm, numBeats, audioContext, gainNode, beatSet}) => {
    const hasPageBeenRendered = useRef(false);
    const [beatList, setBeatList] = useState([]);
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


    useEffect( () => {
        //console.log(beatList)
    }, [beatList])
    const [currentBeat, setCurrentBeat] = useState(0);
    const [nextBeat, setNextBeat] = useState();

    // useEffect ( () => {
    //     if (play) {
    //         let bl = beatList;
    //         for (let i = 0; i < bl.length; i++) {
    //             const startTime = audioContext.currentTime;
    //             console.log(i);
    //             if (bl.at(i).beatTime < audioContext.beatTime) {
    //                 setCurrentBeat(i);
    //             }
    //         }
    //     }
    // }, [beatList]);
    const [lastAudioContextTime, setLastAudioContextTime] = useState(0.0);
    useEffect( () => {
        //console.log(audioContext.currentTime);
        setLastAudioContextTime(audioContext.currentTime);
    }, [audioContext.currentTime])

 
    // useEffect( () => {
    //     if (play) {
    //         const intervalId = setInterval( () => {
    //             const startTime = audioContext.currentTime;
    //             let nextBeatIdx = beatList.findIndex(({beatTime}) => beatTime > startTime);
    //             if (nextBeatIdx != -1) {
    //                 setNextBeat(beatList[nextBeatIdx]);
    //                 beatList.splice(0, nextBeatIdx);
    //                 setBeatList(beatList);
    //             }
    //         }, 10);
    //     }
    // })

    // useEffect( () => {
    //     if (nextBeat) {
    //         console.log("Waiting to update beat", nextBeat);
    //         while (audioContext.currentTime < nextBeat.beatTime) {
    //         }
    //         setCurrentBeat(nextBeat.beatNum);
    //     }
    // }, [nextBeat])

    function startMetronome() {
        audioContext.suspend();
        setPlay(true);
    }

    function stopMetronome() {
        audioContext.resume();
        setPlay(false);
    }

    return (
        <Container>
            <Button variant="contained" onClick={() => startMetronome()}>Start</Button>
            <Button variant="contained" onClick={() => stopMetronome()}>Stop</Button>
            <Dots numBeats={numBeats} currentBeat={currentBeat}/>
            
            {currentBeat}
        </Container>
    )
}

export default Player;
import React, {useState, useEffect} from 'react';
import { Slider, Container, Stack, Button, TextField, InputAdornment, FormControl } from "@mui/material"
import BpmSelector from "./BpmSelector"
import Player from './Player';
import BeatCircles from './BeatCircles';

/*  TODO
3 parts:
1. beat selector (how many beats per measure + subdivisions)
2. Bpm Selector
3. Tap tempo tool 
*/
const MIN_BPM = 20;
const MAX_BPM = 400;
const DEFAULT_BPM = 120;
const NUM_BEATS = 4;
const audioContext = new AudioContext();


function Metronome() {
    const [bpm, setBpm] = useState(DEFAULT_BPM);
    const [currentBeat, setCurrentBeat] = useState(0);

    return (
        <Container>
            <Stack spacing={4} alignItems="center" justifyContent="center">
                <Player bpm={bpm} numBeats={NUM_BEATS} audioContext={audioContext} currentBeat={currentBeat} setCurrentBeat={setCurrentBeat}/>
                <BeatCircles numBeats={NUM_BEATS} currentBeat={currentBeat}/>
                <BpmSelector maxBpm={MAX_BPM} minBpm={MIN_BPM} bpm={bpm} setBpm={setBpm}/>
            </Stack>
        </Container>
    )
}

export default Metronome;
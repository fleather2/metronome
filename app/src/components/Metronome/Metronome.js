import React, {useState, useEffect} from 'react';
import { motion } from "framer-motion";
import { Slider, Container, Stack, Button, TextField, InputAdornment, FormControl } from "@mui/material"
import BpmSelector from "./BpmSelector"
import Player from './Player';
/*  TODO
3 parts:
1. beat selector (how many beats per measure + subdivisions)
2. Bpm Selector
3. Tap tempo tool 
*/
const MIN_BPM = 20;
const MAX_BPM = 500;
const DEFAULT_BPM = 120;
const NUM_BEATS = 4;



function Metronome() {
    const [bpm, setBpm] = useState(DEFAULT_BPM);
    const audioContext = new AudioContext();    
    const [doRunMetronome, setDoRunMetronome] = useState(true);

    return (
        <Container >
            <Player bpm={bpm} numBeats={NUM_BEATS}  audioContext={audioContext} doRunMetronome={doRunMetronome} setDoRunMetronome={setDoRunMetronome}/>
            <BpmSelector maxBpm={MAX_BPM} minBpm={MIN_BPM} bpm={bpm} setBpm={setBpm} audioContext={audioContext} doRunMetronome={doRunMetronome} setDoRunMetronome={setDoRunMetronome}/>
        </Container>
    )
}

export default Metronome;
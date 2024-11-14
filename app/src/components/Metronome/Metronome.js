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
const MAX_BPM = 400;
const DEFAULT_BPM = 120;
const NUM_BEATS = 4;


function Metronome() {
    const [bpm, setBpm] = useState(DEFAULT_BPM);
    
    return (
        <Container >
            < Player bpm={bpm} numBeats={NUM_BEATS}/>
            <BpmSelector maxBpm={MAX_BPM} minBpm={MIN_BPM} bpm={bpm} setBpm={setBpm}/>
        </Container>
    )
}

export default Metronome;
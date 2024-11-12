import React, {useState, useEffect} from 'react';
import { motion } from "framer-motion";
import { Slider, Container, Stack, Button, TextField, InputAdornment, FormControl } from "@mui/material"

/*  TODO
3 parts:
1. beat selector (how many beats per measure + subdivisions)
2. Bpm Selector
3. Tap tempo tool 
*/
const MIN_BPM = 20;
const MAX_BPM = 500;
const DEFAULT_BPM = 120;

function BpmSelector() {
    const [bpm, setBpm] = useState(DEFAULT_BPM);

    const updateBpm = (newBpm) => {
        if (isNaN(newBpm)) {
            console.error("Cannot change bpm to ", newBpm);
            return false;
        }
        if (newBpm > MAX_BPM) {
            setBpm(MAX_BPM);
            return true;
        } 
        if (newBpm < MIN_BPM) {
            setBpm(MIN_BPM);
            return true;
        }
        setBpm(newBpm);
        return true;
    }

    return (
        <Container>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={() => updateBpm(bpm + -10)}>-10</Button>
                <Button variant="contained" onClick={() => updateBpm(bpm + -5)}>-5</Button>
                <Button variant="contained" onClick={() => updateBpm(bpm + -1)}>-1</Button>
                <TextField 
                    id = "bpm-text-field" 
                    value={bpm}
                    onChange={(e) => { 
                        const v = e.target.value;
                        if (isNaN(v)) {
                            document.getElementById("bpm-text-field").label = "Dickle";
                        } else {
                            setBpm(v)
                        }
                         }}
                    onFocusCapture={() => console.log("Here")}
                    onBlur={() => console.log("here2")}
                />
                <Button variant="contained" onClick={() => updateBpm(bpm + 1)}>+1</Button>
                <Button variant="contained" onClick={() => updateBpm(bpm + 5)}>+5</Button>
                <Button variant="contained" onClick={() => updateBpm(bpm + 10)}>+10</Button>
            </Stack>
            <Slider 
                min={MIN_BPM}
                max={MAX_BPM}
                value={bpm}
                onChange={ (_, val) => setBpm(val) } // TODO we want to separate onChange forom onChangeCommitted, where we pause the metronome on onChange and replay it on onChangeCommitted
            />
        </Container>
    )
}

function Metronome() {
    return (
        <Container >
            <h1>Metronome here!</h1>
            <BpmSelector />
        </Container>
    )
}

export default Metronome;
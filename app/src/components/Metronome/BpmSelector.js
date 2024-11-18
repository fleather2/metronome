import React, {useState} from 'react';
import { Slider, Container, Stack, Button, TextField } from "@mui/material"

const BpmSelector = ({maxBpm, minBpm, bpm, setBpm}) => {

    const [tmpBpmText, setTmpBpmText] = useState(bpm);
    const [tmpBpmSlider, setTmpBpmSlider] = useState(bpm);

    const updateBpm = (newBpm) => {
        if (isNaN(newBpm)) {
            console.error("Cannot change bpm to ", newBpm);
            return false;
        }
        let b = newBpm;
        if (newBpm > maxBpm) {
            b = maxBpm
        } 
        if (newBpm < minBpm) {
            b = minBpm;
        }
        setBpm(b);
        setTmpBpmText(b);
        setTmpBpmSlider(b);
        return true;
    }

    return (
        <Container>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <Button variant="contained" onClick={() => updateBpm(bpm + -10)}>-10</Button>
                <Button variant="contained" onClick={() => updateBpm(bpm + -5)}>-5</Button>
                <Button variant="contained" onClick={() => updateBpm(bpm + -1)}>-1</Button>
                <TextField 
                    id = "bpm-text-field" 
                    value={tmpBpmText}
                    onChange={(e) => { 
                        const v = e.target.value;
                        setTmpBpmText(v);
                        }}
                    onBlur={() => {
                        updateBpm(tmpBpmText);
                    }}
                />
                <Button variant="contained" onClick={() => updateBpm(bpm + 1)}>+1</Button>
                <Button variant="contained" onClick={() => updateBpm(bpm + 5)}>+5</Button>
                <Button variant="contained" onClick={() => updateBpm(bpm + 10)}>+10</Button>
            </Stack>
            <Slider 
                min={minBpm}
                max={maxBpm}
                value={tmpBpmSlider}
                onChange={ (_, val) => {
                    setTmpBpmSlider(val);
                }} // TODO we want to separate onChange forom onChangeCommitted, where we pause the metronome on onChange and replay it on onChangeCommitted
                onChangeCommitted={ () => {
                    updateBpm(tmpBpmSlider);
                }}
            />
        </Container>
    )
}

export default BpmSelector;
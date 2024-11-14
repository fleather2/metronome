import React, {useState} from 'react';
import { Slider, Container, Stack, Button, TextField } from "@mui/material"

const BpmSelector = ({maxBpm, minBpm, bpm, setBpm}) => {

    const [tmpBpm, setTmpBpm] = useState(bpm);

    const updateBpm = (newBpm) => {
        setTmpBpm(newBpm);
        if (isNaN(newBpm)) {
            console.error("Cannot change bpm to ", newBpm);
            return false;
        }
        if (newBpm > maxBpm) {
            setBpm(maxBpm);
            return true;
        } 
        if (newBpm < minBpm) {
            setBpm(minBpm);
            return true;
        }
        setBpm(newBpm);
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
                    value={tmpBpm}
                    onChange={(e) => { 
                        const v = e.target.value;
                        setTmpBpm(v);
                        }}
                    onBlur={() => {
                        updateBpm(bpm);
                    }}
                />
                <Button variant="contained" onClick={() => updateBpm(bpm + 1)}>+1</Button>
                <Button variant="contained" onClick={() => updateBpm(bpm + 5)}>+5</Button>
                <Button variant="contained" onClick={() => updateBpm(bpm + 10)}>+10</Button>
            </Stack>
            <Slider 
                min={minBpm}
                max={maxBpm}
                value={tmpBpm}
                onChange={ (_, val) => {
                    setTmpBpm(val);
                }} // TODO we want to separate onChange forom onChangeCommitted, where we pause the metronome on onChange and replay it on onChangeCommitted
                onChangeCommitted={ () => {
                    updateBpm(tmpBpm);
                }}
            />
        </Container>
    )
}

export default BpmSelector;
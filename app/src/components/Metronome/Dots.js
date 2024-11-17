import { Container } from "@mui/material";
import "./beat.css";
import { useState, useEffect, useRef} from "react";


function Dots({numBeats, currentBeat}) {

    const BeatCircle = (idx) => {
        return (<div className="beatCircle" idx={idx}></div>)
    }

    useEffect( () => {
        if (currentBeat % 4 == 0) {
            console.log("Here")
        }
    }, [currentBeat])

    return (
        <Container>
            <BeatCircle />
        </Container>
    )
}

export default Dots;
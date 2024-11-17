import { Container } from "@mui/material";
import "./beat.css";

function BeatCircle (isCurrent) {
    console.log(isCurrent)
    if (isCurrent) {
        return (<div className="beatCircleFill"/>)
    } else{
        return (<div className="beatCircle"/>)
    }
}

function BeatCircles ({numBeats, currentBeat}) {
    let circles = [];
    for (let i = 0; i < numBeats; i++) {
        circles.push(BeatCircle(currentBeat % numBeats == i));
    }

    return (
        <Container>
            {currentBeat}
            {circles}
        </Container>
    )
}

export default BeatCircles;
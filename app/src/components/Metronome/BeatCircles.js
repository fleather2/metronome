import { Container, ListItem } from "@mui/material";
import Stack from "@mui/material/Stack";
import "./beat.css";

function BeatCircle (isCurrent, i) {
    if (isCurrent) {
        return (<div className="beatCircleFill" key={i}/>)
    } else{
        return (<div className="beatCircle" key={i}/>)
    }
}

function BeatCircles ({numBeats, currentBeat}) {
    let circles = [];
    for (let i = 0; i < numBeats; i++) {
        circles.push(BeatCircle(currentBeat % numBeats == i, i));
    }

    return (
        <Container>
            <Stack direction="row" spacing={5} alignItems="center" justifyContent="center">
                {circles}
            </Stack>
        </Container>
    )
}

export default BeatCircles;
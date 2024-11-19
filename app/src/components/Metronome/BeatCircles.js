import { Container, ListItem } from "@mui/material";
import Stack from "@mui/material/Stack";
import "./beat.css";

function BeatCircle (isCurrent, i) {
    return (
        <svg viewBox="0 0 100 100" style={{height: "50px"}} key={i}>
            <circle cx="50" cy="50" r="40" className={isCurrent ? "beatCircleFilled" : "beatCircle"}/>
        </svg>
    )
}

function BeatCircles ({numBeats, currentBeat}) {
    let circles = [];
    for (let i = 0; i < numBeats; i++) {
        circles.push(BeatCircle(currentBeat % numBeats == i, i));
    }

    return (
        <Container>
            <Stack direction="row" spacing={15} alignItems="center" justifyContent="center">
                {circles}
            </Stack>
        </Container>
    )
}

export default BeatCircles;
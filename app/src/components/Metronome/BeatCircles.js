import { Container, ListItem } from "@mui/material";
import Stack from "@mui/material/Stack";
import "./beat.css";

function BeatCircle (isCurrent, i) {
    return (
    <Container key={i}>
        <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="10" className={isCurrent ? "beatCircleFilled" : "beatCircle"}/>
        </svg>
    </Container >
    )
}

function BeatCircles ({numBeats, currentBeat}) {
    let circles = [];
    for (let i = 0; i < numBeats; i++) {
        circles.push(BeatCircle(currentBeat % numBeats == i, i));
    }

    return (
        <Container>
            <Stack direction="row" spacing={5}>
                {circles}
            </Stack>
        </Container>
    )
}

export default BeatCircles;
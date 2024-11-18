import { Container, ListItem } from "@mui/material";
import Stack from "@mui/material/Stack";
import "./beat.css";

function BeatCircle (isCurrent, i) {
    if (isCurrent) {
        return (
            <Container key={i}>
            <svg width="50%" height="50%" viewBox="0 0 50 50">
                <circle cx="50%" cy="50%" r="30%" className="beatCircleFilled"/>
            </svg>
            </Container >
            )
    } else{
        return (
            <Container key={i}>
            <svg width="50%" height="50%" viewBox="0 0 50 50">
                <circle cx="50%" cy="50%" r="30%" className="beatCircle"/>
            </svg>
            </Container >
            )
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
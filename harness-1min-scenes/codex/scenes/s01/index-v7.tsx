import { Composition, registerRoot } from "remotion";
import { S01v7, DURATION } from "./S01v7";

registerRoot(() => <Composition id="S01v7" component={S01v7}
  durationInFrames={DURATION} fps={30} width={1920} height={1080} />);

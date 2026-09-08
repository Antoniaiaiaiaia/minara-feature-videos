import { Composition, registerRoot } from "remotion";
import { S01v9, DURATION } from "./S01v9";

registerRoot(() => <Composition id="S01v9" component={S01v9}
  durationInFrames={DURATION} fps={30} width={1920} height={1080} />);

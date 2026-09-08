import { Composition, registerRoot } from "remotion";
import { S01v6, DURATION } from "./S01v6";

registerRoot(() => <Composition id="S01v6" component={S01v6}
  durationInFrames={DURATION} fps={30} width={1920} height={1080} />);

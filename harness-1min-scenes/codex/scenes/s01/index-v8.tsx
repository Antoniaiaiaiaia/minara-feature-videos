import { Composition, registerRoot } from "remotion";
import { S01v8, DURATION } from "./S01v8";

registerRoot(() => <Composition id="S01v8" component={S01v8}
  durationInFrames={DURATION} fps={30} width={1920} height={1080} />);

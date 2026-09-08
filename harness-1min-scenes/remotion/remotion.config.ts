import { Config } from "@remotion/cli/config";

// PNG frames: text edges stay exact until the final H.264 encode.
Config.setVideoImageFormat("png");
Config.setOverwriteOutput(true);
Config.setConcurrency(4);

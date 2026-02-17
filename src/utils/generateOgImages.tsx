import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

const REGULAR_FONT_PATH = resolve(
  process.cwd(),
  "src/assets/fonts/IBMPlexMono-Regular.ttf"
);
const BOLD_FONT_PATH = resolve(
  process.cwd(),
  "src/assets/fonts/IBMPlexMono-Bold.ttf"
);

const toArrayBuffer = (buffer: Buffer): ArrayBuffer =>
  buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  ) as ArrayBuffer;

const loadFonts = async () => {
  const fontRegular = await readFile(REGULAR_FONT_PATH).then(toArrayBuffer);
  const fontBold = await readFile(BOLD_FONT_PATH).then(toArrayBuffer);

  return { fontRegular, fontBold };
};

const { fontRegular, fontBold } = await loadFonts();

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: "IBM Plex Mono",
      data: fontRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "IBM Plex Mono",
      data: fontBold,
      weight: 600,
      style: "normal",
    },
  ],
};

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await satori(postOgImage(post), options);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(), options);
  return svgBufferToPngBuffer(svg);
}

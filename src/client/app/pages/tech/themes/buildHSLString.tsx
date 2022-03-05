export default function buildHSLString(
  hue: number,
  saturation: number,
  lightness: number,
): string {
  return `hsl(${hue}, ${Math.round(saturation)}%, ${Math.round(lightness)}%)`;
}

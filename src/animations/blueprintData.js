// Percentage coordinates (0-100) tracing a stylized wireframe reading of the
// OrderCraft cube mark. Pulled from the actual logo artwork's vertices, so
// the "logo drawing itself" during the transition is really your mark, not
// a generic placeholder shape.
export const LOGO_NODES = {
  top: { x: 50.4, y: 25.2 },
  leftUpper: { x: 25.8, y: 36.7 },
  rightUpper: { x: 75.1, y: 36.7 },
  leftLower: { x: 25.8, y: 52.4 },
  rightLower: { x: 75.1, y: 52.4 },
  bottom: { x: 48.6, y: 64.2 },
  innerTop: { x: 50, y: 33 },
  innerBottom: { x: 50, y: 47 },
  innerMeet: { x: 49, y: 58 },
};

export const LOGO_EDGES = [
  ["top", "leftUpper"],
  ["top", "rightUpper"],
  ["leftUpper", "leftLower"],
  ["rightUpper", "rightLower"],
  ["leftLower", "bottom"],
  ["rightLower", "bottom"],
  ["innerTop", "leftUpper"],
  ["innerTop", "rightUpper"],
  ["innerTop", "innerBottom"],
  ["innerBottom", "innerMeet"],
  ["innerMeet", "leftLower"],
  ["innerMeet", "rightLower"],
];

// Decorative construction lines for the deconstruction/collapse phases.
// Hand-placed and all axis-aligned on purpose: that lets the overlay
// animate them with transform (scaleX/scaleY) + opacity only, no
// width/height/top/left tweening, so this stays cheap at 60fps.
// Each is defined in % of the viewport.
export const CONSTRUCTION_LINES = [
  { axis: "h", top: 18, left: 8, w: 26 },
  { axis: "h", top: 18, left: 66, w: 26 },
  { axis: "h", top: 82, left: 8, w: 22 },
  { axis: "h", top: 82, left: 70, w: 22 },
  { axis: "v", left: 12, top: 30, h: 40 },
  { axis: "v", left: 88, top: 30, h: 40 },
  { axis: "v", left: 20, top: 10, h: 12 },
  { axis: "v", left: 80, top: 10, h: 12 },
  { axis: "v", left: 20, top: 78, h: 12 },
  { axis: "v", left: 80, top: 78, h: 12 },
  { axis: "h", top: 92, left: 38, w: 24 },
  { axis: "h", top: 8, left: 38, w: 24 },
];

export const CONSTRUCTION_LABELS = [
  { top: 15, left: 10, text: "OC—04" },
  { top: 15, left: 90, text: "GRID / 12", align: "right" },
  { top: 87, left: 10, text: "X:0 Y:0" },
  { top: 87, left: 90, text: "SCALE 1:1", align: "right" },
];

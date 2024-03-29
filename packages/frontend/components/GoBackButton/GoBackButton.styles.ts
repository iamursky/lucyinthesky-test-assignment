import { em, margin } from "csx";
import { style } from "typestyle";

export const text = style({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
});

export const icon = style({
  margin: margin(0, 8, 0, 0),
});

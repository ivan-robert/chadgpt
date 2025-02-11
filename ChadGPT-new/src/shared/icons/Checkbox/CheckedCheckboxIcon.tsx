import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const CheckedCheckbox = (props: SvgProps) => (
  <Svg
    fill={props.color ?? "#000000"}
    width={props.width ?? undefined}
    height={props.height ?? undefined}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </Svg>
);

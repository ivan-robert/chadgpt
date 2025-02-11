import { Path, Svg, SvgProps } from "react-native-svg";

export const SmallShowArrowIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 8 7" fill="none" {...props}>
    <Path
      d="M4.86603 6.5C4.48113 7.16667 3.51887 7.16667 3.13397 6.5L0.535898 2C0.150998 1.33333 0.632123 0.5 1.40192 0.5L6.59808 0.5C7.36788 0.5 7.849 1.33333 7.4641 2L4.86603 6.5Z"
      fill={props.color ?? "white"}
    />
  </Svg>
);

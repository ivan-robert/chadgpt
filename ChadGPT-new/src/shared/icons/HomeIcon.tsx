import { Path, Svg, SvgProps } from "react-native-svg";

export const HomeIcon = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 37 37" fill="none" {...props}>
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.13144 15.6112C7.70831 16.5312 7.70831 17.5778 7.70831 19.671V26.2082C7.70831 29.1152 7.70831 30.5687 8.6114 31.4718C9.49044 32.3509 10.891 32.3743 13.6458 32.3749V24.6667C13.6458 23.2629 14.7838 22.125 16.1875 22.125H20.8125C22.2162 22.125 23.3541 23.2629 23.3541 24.6667V32.3749C26.109 32.3743 27.5095 32.3509 28.3886 31.4718C29.2916 30.5687 29.2916 29.1152 29.2916 26.2082V19.671C29.2916 17.5778 29.2916 16.5312 28.8685 15.6112C28.4454 14.6912 27.6508 14.0101 26.0615 12.6478L24.5198 11.3264C21.6472 8.86418 20.2109 7.63306 18.5 7.63306C16.7891 7.63306 15.3528 8.86418 12.4802 11.3264L10.9385 12.6478C9.34921 14.0101 8.55457 14.6912 8.13144 15.6112ZM21.3541 32.3749V24.6667C21.3541 24.3675 21.1116 24.125 20.8125 24.125H16.1875C15.8883 24.125 15.6458 24.3675 15.6458 24.6667V32.3749H21.3541Z"
        fill={props.color ?? "#FFA573"}
      />
    </Svg>
  );
};

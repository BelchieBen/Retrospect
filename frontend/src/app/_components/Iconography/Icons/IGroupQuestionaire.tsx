import HelixPalette from "~/styles/palette";

export const IGroupQuestionaire = ({
  color = HelixPalette.neutral90,
  dataId,
  size = 24,
  style,
}: {
  color?: string;
  dataId?: string;
  size?: number;
  style?: React.CSSProperties;
}) => {
  return (
    <svg
      data-id={dataId}
      fill={color}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={style}
    >
      <path d="M2 3C2 2.44772 2.44772 2 3 2H5C5.55228 2 6 2.44772 6 3V5C6 5.55228 5.55228 6 5 6H3C2.44772 6 2 5.55228 2 5V3Z"></path>
      <path d="M8 4.99999H20V2.99899H8V4.99999Z"></path>
      <path d="M20 12H8V10H20V12Z"></path>
      <path
        d="M3 9C2.44772 9 2 9.44772 2 10V12C2 12.5523 2.44772 13 3 13H5C5.55228 13 6 12.5523 6 12V10C6 9.44772 5.55228 9 5 9H3ZM5 10H3V12H5V10Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path d="M11 19H8V17H11V19Z"></path>
      <path
        d="M3 16C2.44772 16 2 16.4477 2 17V19C2 19.5523 2.44772 20 3 20H5C5.55228 20 6 19.5523 6 19V17C6 16.4477 5.55228 16 5 16H3ZM5 17H3V19H5V17Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path
        d="M21 14H17L16 13H12V21C12 21.552 12.448 22 13 22H21C21.552 22 22 21.552 22 21V15C22 14.448 21.552 14 21 14ZM13.0002 21H21.0002V15H13.0002V21Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IGroupQuestionaire;

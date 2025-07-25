import HelixPalette from "../../../styles/palette";

export const IPlatformWeb = ({
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
      <path
        d="M2 4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V4ZM4 19V8H20V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19ZM19 4H12V6H20V5C20 4.44772 19.5523 4 19 4ZM8 4H11V6H8V4ZM5 4C4.44772 4 4 4.44772 4 5V6H7V4H5Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IPlatformWeb;

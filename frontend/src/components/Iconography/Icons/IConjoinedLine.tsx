import HelixPalette from "../../../styles/palette";

export const IConjoinedLine = ({
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
        d="M3 2C2.44772 2 2 2.44772 2 3V7C2 7.55228 2.44772 8 3 8H7C7.55228 8 8 7.55228 8 7V6H11L11 20H16V21C16 21.5523 16.4477 22 17 22H21C21.5523 22 22 21.5523 22 21V17C22 16.4477 21.5523 16 21 16H17C16.4477 16 16 16.4477 16 17V18H13L13 4H8V3C8 2.44772 7.55228 2 7 2H3ZM4 4V6H6V4H4ZM18 18V20H20V18H18Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IConjoinedLine;

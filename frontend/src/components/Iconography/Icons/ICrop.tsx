import HelixPalette from "../../../styles/palette";

export const ICrop = ({
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
        d="M5 4C5 3.44772 5.44772 3 6 3C6.55228 3 7 3.44772 7 4V5H18C18.5523 5 19 5.44772 19 6V17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H19V20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20V19H6C5.44772 19 5 18.5523 5 18V7H4C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5H5V4ZM7 7V16C7 16.5523 7.44772 17 8 17L17 17V8C17 7.44772 16.5523 7 16 7L7 7Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default ICrop;

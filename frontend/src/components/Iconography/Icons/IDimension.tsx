import HelixPalette from "../../../styles/palette";

export const IDimension = ({
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
        d="M7 3L4 7H6V16H3V18H6V21H8.001V18H17.001V20L21 17L17.001 14V16H8.001V7H10.001L7 3Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IDimension;

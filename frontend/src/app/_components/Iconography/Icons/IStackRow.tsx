import HelixPalette from "~/styles/palette";

export const IStackRow = ({
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
        d="M19 3H5C3.896 3 3 3.896 3 5V19C3 20.104 3.896 21 5 21H19C20.104 21 21 20.104 21 19V5C21 3.896 20.104 3 19 3ZM5 19H19V17H5V19ZM19 15H5V13H19V15ZM5 11H19V9H5V11ZM19 7H5V5H19V7Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IStackRow;

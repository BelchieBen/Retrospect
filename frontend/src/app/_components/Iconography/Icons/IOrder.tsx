import HelixPalette from "~/styles/palette";

export const IOrder = ({
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
        d="M8 2H4C2.896 2 2 2.896 2 4V8C2 9.104 2.896 10 4 10H8C9.104 10 10 9.104 10 8V4C10 2.896 9.104 2 8 2ZM4 8H8V4H4V8Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path
        d="M20 5H15V3L11 6L15 9V7H20V17H10V16C10 14.896 9.104 14 8 14H4C2.896 14 2 14.896 2 16V20C2 21.104 2.896 22 4 22H8C9.104 22 10 21.104 10 20V19H20C21.104 19 22 18.104 22 17V7C22 5.896 21.104 5 20 5ZM4 20H8V16H4V20Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IOrder;

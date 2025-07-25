import HelixPalette from "../../../styles/palette";

export const ILineChart = ({
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
        d="M13.121 12.293C13.308 12.107 13.565 12 13.828 12H17.277C17.624 12.595 18.262 13 19 13C20.104 13 21 12.105 21 11C21 9.896 20.104 9 19 9C18.262 9 17.624 9.405 17.277 10H13.828C13.027 10 12.273 10.312 11.707 10.879L5 17.586V3H3V21H21V19H6.414L13.121 12.293Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default ILineChart;

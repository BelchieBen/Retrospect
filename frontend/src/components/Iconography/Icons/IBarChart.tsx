import HelixPalette from "../../../styles/palette";

export const IBarChart = ({
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
      <path d="M5 19H21V21H3V3H5V19Z"></path>
      <path d="M10 17H7V9H10V17Z"></path>
      <path d="M15 17H12V5H15V17Z"></path>
      <path d="M20 17H17V13H20V17Z"></path>
    </svg>
  );
};

export default IBarChart;

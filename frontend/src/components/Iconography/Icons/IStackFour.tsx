import HelixPalette from "../../../styles/palette";

export const IStackFour = ({
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
      <path d="M20 7.00002H4V4.99902H20V7.00002Z"></path>
      <path d="M20 15H4V12.999H20V15Z"></path>
      <path d="M4 11H20V9H4V11Z"></path>
      <path d="M14 19H4V17H14V19Z"></path>
    </svg>
  );
};

export default IStackFour;

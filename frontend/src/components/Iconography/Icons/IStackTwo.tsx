import HelixPalette from "../../../styles/palette";

export const IStackTwo = ({
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
      <path d="M20 11H4V8.99902H20V11Z"></path>
      <path d="M14 15H4V13H14V15Z"></path>
    </svg>
  );
};

export default IStackTwo;

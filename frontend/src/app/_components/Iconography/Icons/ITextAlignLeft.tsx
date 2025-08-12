import HelixPalette from "~/styles/palette";

export const ITextAlignLeft = ({
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
      <path d="M16 7.00002H4V4.99902H16V7.00002Z"></path>
      <path d="M16 15H4V12.999H16V15Z"></path>
      <path d="M4 11H20V9H4V11Z"></path>
      <path d="M20 19H4V17H20V19Z"></path>
    </svg>
  );
};

export default ITextAlignLeft;

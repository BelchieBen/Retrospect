import HelixPalette from "../../../styles/palette";

export const ITextAlignOutdent = ({
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
      <path d="M4 7.00002H20V4.99902H4V7.00002Z"></path>
      <path d="M4 11.9998L8 15.0008V8.99982L4 11.9998Z"></path>
      <path d="M20 15H10V12.999H20V15Z"></path>
      <path d="M10 11H20V9H10V11Z"></path>
      <path d="M20 19H4V17H20V19Z"></path>
    </svg>
  );
};

export default ITextAlignOutdent;

import HelixPalette from "../../../styles/palette";

export const ITextAlignCentre = ({
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
      <path d="M18.001 7.00002H6V4.99902H18.001V7.00002Z"></path>
      <path d="M18 15H6V13H18V15Z"></path>
      <path d="M4 11H20V9H4V11Z"></path>
      <path d="M20 19H4V17H20V19Z"></path>
    </svg>
  );
};

export default ITextAlignCentre;

import HelixPalette from "../../../styles/palette";

export const ITableAddRowTop = ({
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
      <path d="M17.001 4.50009L22 2.00009V6.99909L17.001 4.50009Z"></path>
      <path d="M16 6H3V3H16V6Z"></path>
      <path d="M3 16H6V13H3V16Z"></path>
      <path d="M11 16H8V13H11V16Z"></path>
      <path d="M13 16H16V13H13V16Z"></path>
      <path d="M21 16H18V13H21V16Z"></path>
      <path d="M3 21H6V18H3V21Z"></path>
      <path d="M11 21H8V18H11V21Z"></path>
      <path d="M13 21H16V18H13V21Z"></path>
      <path d="M21 21H18V18H21V21Z"></path>
      <path d="M3 11H6V8H3V11Z"></path>
      <path d="M11 11H8V8H11V11Z"></path>
      <path d="M13 11H16V8H13V11Z"></path>
      <path d="M21 11H18V8H21V11Z"></path>
    </svg>
  );
};

export default ITableAddRowTop;

import HelixPalette from "../../../styles/palette";

export const ITableAddColumnLeft = ({
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
      <path d="M6 16H3V3H6V16Z"></path>
      <path d="M4.5 17L7 22H2L4.5 17Z"></path>
      <path d="M8 6H11V3H8V6Z"></path>
      <path d="M11 11H8V8H11V11Z"></path>
      <path d="M8 16H11V13H8V16Z"></path>
      <path d="M11 21H8V18H11V21Z"></path>
      <path d="M18 6H21V3H18V6Z"></path>
      <path d="M21 11H18V7.99899H21V11Z"></path>
      <path d="M18 16H21V13H18V16Z"></path>
      <path d="M21 21H18V18H21V21Z"></path>
      <path d="M13 6H16.001V3H13V6Z"></path>
      <path d="M16 11H13V8H16V11Z"></path>
      <path d="M13 16H16V13H13V16Z"></path>
      <path d="M16.001 21H13V18H16.001V21Z"></path>
    </svg>
  );
};

export default ITableAddColumnLeft;

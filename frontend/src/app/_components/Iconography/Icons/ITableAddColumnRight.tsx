import HelixPalette from "~/styles/palette";

export const ITableAddColumnRight = ({
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
      <path d="M3 6H6V3H3V6Z"></path>
      <path d="M8 6H11V3H8V6Z"></path>
      <path d="M21 16H18V3H21V16Z"></path>
      <path d="M21.9995 22H17.0005L19.4995 17L21.9995 22Z"></path>
      <path d="M11 11H8V8H11V11Z"></path>
      <path d="M8 16H11V13H8V16Z"></path>
      <path d="M11 21H8V18H11V21Z"></path>
      <path d="M6 11H3V7.99899H6V11Z"></path>
      <path d="M3 16H6V13H3V16Z"></path>
      <path d="M6 21H3V18H6V21Z"></path>
      <path d="M13 6H16V3H13V6Z"></path>
      <path d="M16 11H13V8H16V11Z"></path>
      <path d="M13 16H16V13H13V16Z"></path>
      <path d="M16 21H13V18H16V21Z"></path>
    </svg>
  );
};

export default ITableAddColumnRight;

import HelixPalette from "~/styles/palette";

export const ITableDeleteRow = ({
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
      <path d="M18 6H21V3H18V6Z"></path>
      <path d="M16 11H3V8H16V11Z"></path>
      <path d="M6 21H3V18H6V21Z"></path>
      <path d="M13 21H16V18H13V21Z"></path>
      <path d="M11 21H8V18H11V21Z"></path>
      <path d="M16 6H13V3H16V6Z"></path>
      <path d="M8 6H11V3H8V6Z"></path>
      <path d="M6 6H3V3H6V6Z"></path>
      <path d="M18 16H21V13H18V16Z"></path>
      <path d="M21 21H18V18H21V21Z"></path>
      <path d="M13 16H16V13H13V16Z"></path>
      <path d="M11 16H8V13H11V16Z"></path>
      <path d="M3 16H6V13H3V16Z"></path>
      <path d="M17.7135 6.99921L19.4995 8.78521L21.2855 6.99921L21.9995 7.71421L20.2145 9.50021L21.9995 11.2852L21.2855 12.0002L19.4995 10.2142L17.7135 12.0002L17.0005 11.2852L18.7855 9.50021L17.0005 7.71421L17.7135 6.99921Z"></path>
    </svg>
  );
};

export default ITableDeleteRow;

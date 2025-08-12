import HelixPalette from "~/styles/palette";

export const ITableDeleteColumn = ({
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
      <path d="M9.49951 3.78609L11.2855 2.00009L12.0005 2.71509L10.2145 4.50009L12.0005 6.28609L11.2855 6.99909L9.49951 5.21409L7.71451 6.99909L6.99951 6.28609L8.78651 4.50009L6.99951 2.71509L7.71451 2.00009L9.49951 3.78609Z"></path>
      <path d="M3 6H6V3H3V6Z"></path>
      <path d="M11 21H8V8H11V21Z"></path>
      <path d="M21 21H18V18H21V21Z"></path>
      <path d="M18 11H21V8H18V11Z"></path>
      <path d="M21 16H18V13H21V16Z"></path>
      <path d="M6 11H3V8H6V11Z"></path>
      <path d="M3 16H6V13H3V16Z"></path>
      <path d="M6 21H3V18H6V21Z"></path>
      <path d="M13 6H16V3H13V6Z"></path>
      <path d="M21 6H18V3H21V6Z"></path>
      <path d="M13 11H16V8H13V11Z"></path>
      <path d="M16 16H13V13H16V16Z"></path>
      <path d="M13 21H16V18H13V21Z"></path>
    </svg>
  );
};

export default ITableDeleteColumn;

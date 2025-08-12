import HelixPalette from "~/styles/palette";

export const IOrganisation = ({
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
      <path d="M5 16H7V18H5V16Z"></path>
      <path d="M14 16H16V18H14V16Z"></path>
      <path d="M17 16H19V18H17V16Z"></path>
      <path d="M8 16H10V18H8V16Z"></path>
      <path d="M5 6H7V8H5V6Z"></path>
      <path d="M14 6H16V8H14V6Z"></path>
      <path d="M17 6H19V8H17V6Z"></path>
      <path d="M8 6H10V8H8V6Z"></path>
      <path d="M11 6H13V8H11V6Z"></path>
      <path d="M5 11H7V13H5V11Z"></path>
      <path d="M14 11H16V13H14V11Z"></path>
      <path d="M17 11H19V13H17V11Z"></path>
      <path d="M8 11H10V13H8V11Z"></path>
      <path d="M11 11H13V13H11V11Z"></path>
      <path d="M11 16H13V20H11V16Z"></path>
      <path
        d="M4 4V20H20V4H4ZM3 2C2.44772 2 2 2.44772 2 3V21C2 21.5523 2.44772 22 3 22H21C21.5523 22 22 21.5523 22 21V3C22 2.44772 21.5523 2 21 2H3Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IOrganisation;

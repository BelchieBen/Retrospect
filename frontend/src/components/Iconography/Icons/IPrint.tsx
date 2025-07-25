import HelixPalette from "../../../styles/palette";

export const IPrint = ({
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
      <path d="M9 16H14.999V15H9V16Z"></path>
      <path d="M9 18H13V16.999H9V18Z"></path>
      <path
        d="M20 6H18V4C18 2.896 17.104 2 16 2H8C6.896 2 6 2.896 6 4V6H4C2.896 6 2 6.896 2 8V16C2 17.104 2.896 18 4 18H6V20C6 21.104 6.896 22 8 22H16C17.104 22 18 21.104 18 20V18H20C21.104 18 22 17.104 22 16V8C22 6.896 21.104 6 20 6ZM16 6H8V4H16V6ZM20 16H18V12H6V16H4V8H20V16ZM8 20H16V14H8V20Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IPrint;

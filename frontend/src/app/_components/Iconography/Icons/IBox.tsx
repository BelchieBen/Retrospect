import HelixPalette from "~/styles/palette";

export const IBox = ({
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
      <path d="M16 12V15H8V12H16Z"></path>
      <path
        d="M20 3C21.104 3 22 3.896 22 5V8C22 9.104 21.104 10 20 10V19C20 20.104 19.104 21 18 21H6C4.896 21 4 20.104 4 19V10C2.896 10 2 9.104 2 8V5C2 3.896 2.896 3 4 3H20ZM6 19H18V10H6V19ZM4 5V8H20V5H4Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IBox;

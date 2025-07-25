import HelixPalette from "../../../styles/palette";

export const IClipboard = ({
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
      <path d="M14 16H8V14H14V16Z"></path>
      <path d="M16 12H8V10H16V12Z"></path>
      <path
        d="M14.5859 2C14.8509 2 15.105 2.10499 15.293 2.29297L17 4H18C19.104 4 20 4.896 20 6V20C20 21.104 19.104 22 18 22H6C4.896 22 4 21.104 4 20V6C4 4.896 4.896 4 6 4H7L8.70703 2.29297C8.89503 2.10499 9.14908 2 9.41406 2H14.5859ZM6 6V20H18V6H6Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IClipboard;

import HelixPalette from "../../../styles/palette";

export const IUser = ({
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
      <path
        d="M12 2C9.239 2 7 4.239 7 7C7 9.761 9.239 12 12 12C14.762 12 17 9.761 17 7C17 4.239 14.762 2 12 2ZM12 4C13.654 4 15 5.346 15 7C15 8.654 13.654 10 12 10C10.346 10 9 8.654 9 7C9 5.346 10.346 4 12 4Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path
        d="M20 18C20 15.791 18.209 14 16 14H8C5.791 14 4 15.791 4 18V22H20V18ZM16 16C17.103 16 18 16.897 18 18V20H6V18C6 16.897 6.897 16 8 16H16Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IUser;

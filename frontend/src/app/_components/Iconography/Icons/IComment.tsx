import HelixPalette from "~/styles/palette";

export const IComment = ({
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
      <path d="M15 9H9C8.44771 9 8 8.55225 8 8C8 7.44775 8.44771 7 9 7H15C15.5523 7 16 7.44775 16 8C16 8.55225 15.5523 9 15 9Z"></path>
      <path d="M12 11H9C8.44771 11 8 11.4478 8 12C8 12.5522 8.44771 13 9 13H12C12.5523 13 13 12.5522 13 12C13 11.4478 12.5523 11 12 11Z"></path>
      <path
        d="M2 4C2 2.896 2.896 2 4 2H20C21.104 2 22 2.896 22 4V16C22 17.104 21.104 18 20 18H16L12 22L8 18H4C2.896 18 2 17.104 2 16V4ZM15.172 16H20V4H4V16H8.829L12 19.172L15.172 16Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IComment;

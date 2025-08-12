import HelixPalette from "~/styles/palette";

export const IReviews = ({
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
        d="M5 7C5 4.239 7.239 2 10 2C12.761 2 15 4.239 15 7C15 9.761 12.761 12 10 12C7.239 12 5 9.761 5 7ZM13 7C13 5.346 11.654 4 10 4C8.346 4 7 5.346 7 7C7 8.654 8.346 10 10 10C11.654 10 13 8.654 13 7Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path d="M4 20V18C4 16.897 4.897 16 6 16H14C14.707 16 15.326 16.371 15.682 16.926L17.062 15.454C16.328 14.573 15.236 14 14 14H6C3.791 14 2 15.791 2 18V22H12.592L10.717 20H4Z"></path>
      <path d="M15.333 20.223L21.167 14L22 14.889L15.333 22L12 18.444L12.834 17.556L15.333 20.223Z"></path>
    </svg>
  );
};

export default IReviews;

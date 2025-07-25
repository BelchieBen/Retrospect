import HelixPalette from "../../../styles/palette";

export const IBell = ({
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
        d="M17 8C17 9.713 18.026 15.097 19.886 18.49C20.258 19.169 19.665 20 18.9 20H14C14 21.104 13.104 22 12 22C10.896 22 10 21.104 10 20H5.10004C4.33504 20 3.74204 19.169 4.11404 18.49C5.97404 15.097 7.00004 9.713 7.00004 8C7.00004 5.574 8.72804 3.555 11.02 3.099C11.0187 3.08302 11.0144 3.06829 11.0101 3.05368C11.0051 3.03627 11 3.01902 11 3C11 2.448 11.448 2 12 2C12.552 2 13 2.448 13 3C13 3.01902 12.995 3.03627 12.9899 3.05368C12.9857 3.06829 12.9814 3.08302 12.98 3.099C15.271 3.555 17 5.574 17 8ZM6.57715 18H17.4231C15.8291 14.362 15.0001 9.757 15.0001 8C15.0001 6.346 13.6541 5 12.0001 5C10.3461 5 9.00015 6.346 9.00015 8C9.00015 9.757 8.17115 14.362 6.57715 18Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IBell;

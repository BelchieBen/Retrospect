import HelixPalette from "../../../styles/palette";

export const IBellFill = ({
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
      <path d="M19.886 18.49C18.026 15.097 17 9.713 17 8C17 5.574 15.271 3.555 12.98 3.099C12.983 3.064 13 3.035 13 3C13 2.448 12.552 2 12 2C11.448 2 11 2.448 11 3C11 3.035 11.017 3.064 11.02 3.099C8.72804 3.555 7.00004 5.574 7.00004 8C7.00004 9.713 5.97404 15.097 4.11404 18.49C3.74204 19.169 4.33504 20 5.10004 20H10C10 21.104 10.896 22 12 22C13.104 22 14 21.104 14 20H18.9C19.665 20 20.258 19.169 19.886 18.49Z"></path>
    </svg>
  );
};

export default IBellFill;

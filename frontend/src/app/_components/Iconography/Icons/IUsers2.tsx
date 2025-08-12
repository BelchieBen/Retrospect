import HelixPalette from "~/styles/palette";

export const IUsers2 = ({
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
      <path d="M12 3C14.209 3 16 4.791 16 7C16 9.209 14.209 11 12 11C9.791 11 8 9.209 8 7C8 4.791 9.791 3 12 3Z"></path>
      <path d="M7.962 13.062C7.868 12.464 7.374 12 6.75 12H3.25L3.12225 12.0065C2.49219 12.0705 2 12.6031 2 13.25V16H6V21H18V16H22V13C22 12.4477 21.5523 12 21 12H17C16.4477 12 16 12.4477 16 13L16.0005 13.0501C15.8388 13.0172 15.6714 13 15.5 13H8.5L8.31696 13.0074C8.19622 13.0171 8.078 13.036 7.962 13.062Z"></path>
      <path d="M5 7C6.104 7 7 7.896 7 9C7 10.104 6.104 11 5 11C3.896 11 3 10.104 3 9C3 7.896 3.896 7 5 7Z"></path>
      <path d="M19 11C20.1046 11 21 10.1046 21 9C21 7.89543 20.1046 7 19 7C17.8954 7 17 7.89543 17 9C17 10.1046 17.8954 11 19 11Z"></path>
    </svg>
  );
};

export default IUsers2;

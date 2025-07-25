import HelixPalette from "../../../styles/palette";

export const IClipboard2 = ({
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
      <path d="M16.4095 11.2947C16.8047 10.8994 16.8045 10.2584 16.4092 9.86308C16.0139 9.46775 15.3729 9.46775 14.9776 9.86308L14.9632 9.87774L9.25138 15.5896L9.9759 16.3141C10.3664 16.7046 10.9996 16.7046 11.3901 16.3141L16.4095 11.2947Z"></path>
      <path d="M9.27064 12.7461L10.6825 14.158L9.25138 15.5896L7.81929 14.158C7.42421 13.7626 7.42456 13.1216 7.8198 12.7263C8.21514 12.331 8.8561 12.331 9.25143 12.7263C9.25794 12.7328 9.26435 12.7394 9.27064 12.7461Z"></path>
      <path
        d="M8.707 2.293C8.895 2.105 9.149 2 9.414 2H14.586C14.851 2 15.105 2.105 15.293 2.293L17 4H18C19.104 4 20 4.896 20 6V20C20 21.104 19.104 22 18 22H6C4.896 22 4 21.104 4 20V6C4 4.896 4.896 4 6 4H7L8.707 2.293ZM18 20H6V6H18V20Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IClipboard2;

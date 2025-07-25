import HelixPalette from "../../../styles/palette";

export const ILock = ({
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
      <path d="M13 15C13 14.4477 12.5523 14 12 14C11.4477 14 11 14.4477 11 15V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V15Z"></path>
      <path
        d="M6 7C6 4.23858 8.23858 2 11 2H13C15.7614 2 18 4.23858 18 7V9C19.1046 9 20 9.89543 20 11V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V11C4 9.89543 4.89543 9 6 9V7ZM15.8182 9H8.18182V7C8.18182 5.34315 9.52496 4 11.1818 4H12.8182C14.475 4 15.8182 5.34315 15.8182 7V9ZM7 11C6.44772 11 6 11.4477 6 12V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V12C18 11.4477 17.5523 11 17 11H7Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default ILock;

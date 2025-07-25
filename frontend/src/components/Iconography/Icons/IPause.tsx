import HelixPalette from "../../../styles/palette";

export const IPause = ({
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
      <path d="M10 8C10.5523 8 11 8.44772 11 9V15C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15V9C9 8.44772 9.44772 8 10 8Z"></path>
      <path d="M14 8C14.5523 8 15 8.44772 15 9V15C15 15.5523 14.5523 16 14 16C13.4477 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8Z"></path>
      <path
        d="M12 2C6.477 2 2 6.477 2 12C2 17.522 6.477 22 12 22C17.522 22 22 17.522 22 12C22 6.477 17.522 2 12 2ZM12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IPause;

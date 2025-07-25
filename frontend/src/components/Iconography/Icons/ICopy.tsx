import HelixPalette from "../../../styles/palette";

export const ICopy = ({
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
        d="M8 4C8 2.89543 8.89543 2 10 2H19C20.1046 2 21 2.89543 21 4V16C21 17.1046 20.1046 18 19 18H16V20C16 21.1046 15.1046 22 14 22H5C3.89543 22 3 21.1046 3 20V8C3 6.89543 3.89543 6 5 6H8V4ZM10 14.8667C10 15.419 10.4477 15.8667 11 15.8667H18C18.5523 15.8667 19 15.419 19 14.8667V5.13333C19 4.58105 18.5523 4.13333 18 4.13333H11C10.4477 4.13333 10 4.58105 10 5.13333V14.8667ZM8 8.13333H6C5.44772 8.13333 5 8.58105 5 9.13333V18.8667C5 19.419 5.44772 19.8667 6 19.8667H13C13.5523 19.8667 14 19.419 14 18.8667V18H10C8.89543 18 8 17.1046 8 16V8.13333Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default ICopy;

import HelixPalette from "../../../styles/palette";

export const IVideoCamera = ({
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
        d="M4 5C2.896 5 2 5.896 2 7V17C2 18.104 2.896 19 4 19H14C15.104 19 16 18.104 16 17V7C16 5.896 15.104 5 14 5H4ZM4 17H14V7H4V17Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path d="M17.2428 8.85435C17.0921 8.94471 17 9.10746 17 9.2831V14.7169C17 14.8925 17.0921 15.0553 17.2428 15.1457L21.2428 17.5457C21.576 17.7456 22 17.5056 22 17.1169V6.8831C22 6.49445 21.576 6.25439 21.2428 6.45435L17.2428 8.85435Z"></path>
    </svg>
  );
};

export default IVideoCamera;

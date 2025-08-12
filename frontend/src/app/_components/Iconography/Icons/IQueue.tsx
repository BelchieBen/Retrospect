import HelixPalette from "~/styles/palette";

export const IQueue = ({
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
      <path d="M7 3H17C17.5523 3 18 3.44772 18 4C18 4.55228 17.5523 5 17 5H7C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3Z"></path>
      <path d="M17 7H7C6.44772 7 6 7.44772 6 8C6 8.55228 6.44772 9 7 9H17C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7Z"></path>
      <path d="M22 10C22 9.44772 21.5523 9 21 9C20.4477 9 20 9.44772 20 10V19H4V10C4 9.44772 3.55228 9 3 9C2.44772 9 2 9.44772 2 10V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V10Z"></path>
      <path d="M17 15H7C6.44772 15 6 15.4477 6 16C6 16.5523 6.44772 17 7 17H17C17.5523 17 18 16.5523 18 16C18 15.4477 17.5523 15 17 15Z"></path>
      <path d="M7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11Z"></path>
    </svg>
  );
};

export default IQueue;

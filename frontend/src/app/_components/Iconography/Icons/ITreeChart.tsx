import HelixPalette from "~/styles/palette";

export const ITreeChart = ({
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
        d="M19 15H20C21.104 15 22 15.896 22 17V20C22 21.104 21.104 22 20 22H16C14.896 22 14 21.104 14 20V17C14 15.896 14.896 15 16 15H17V13H7V15H8C9.104 15 10 15.896 10 17V20C10 21.104 9.104 22 8 22H4C2.896 22 2 21.104 2 20V17C2 15.896 2.896 15 4 15H5V13C5 11.896 5.896 11 7 11H11V9H10C8.896 9 8 8.104 8 7V4C8 2.896 8.896 2 10 2H14C15.104 2 16 2.896 16 4V7C16 8.104 15.104 9 14 9H13V11H17C18.104 11 19 11.896 19 13V15ZM20 20H16V17H20V20ZM4 20H8V17H4V20ZM14 7H10V4H14V7Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default ITreeChart;

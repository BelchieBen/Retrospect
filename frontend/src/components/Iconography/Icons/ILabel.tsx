import HelixPalette from "../../../styles/palette";

export const ILabel = ({
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
        d="M9 7C9 8.10457 8.10457 9 7 9C5.89543 9 5 8.10457 5 7C5 5.89543 5.89543 5 7 5C8.10457 5 9 5.89543 9 7ZM8 7C8 7.55228 7.55228 8 7 8C6.44772 8 6 7.55228 6 7C6 6.44772 6.44772 6 7 6C7.55228 6 8 6.44772 8 7Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path
        d="M2 3C2 2.44772 2.44772 2 3 2H10.4424C10.9666 2 11.4699 2.20583 11.8439 2.57319L21.7005 12.255C22.097 12.6444 22.0998 13.2825 21.7068 13.6755L13.6755 21.7068C13.2825 22.0998 12.6444 22.097 12.255 21.7005L2.57319 11.8439C2.20583 11.4699 2 10.9666 2 10.4424V3ZM4 4L10.1118 4.03696C10.3722 4.03853 10.6217 4.14164 10.8073 4.32436L19.5 12.8831L12.8831 19.5L4.32444 10.8072C4.14173 10.6217 4.03862 10.3721 4.03704 10.1117L4 4Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default ILabel;

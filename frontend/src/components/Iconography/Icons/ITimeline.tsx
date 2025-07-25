import HelixPalette from "../../../styles/palette";

export const ITimeline = ({
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
      <path d="M12 8C10.896 8 10 8.896 10 10C10 11.104 10.896 12 12 12C13.104 12 14 11.104 14 10C14 8.896 13.104 8 12 8Z"></path>
      <path d="M17 16V14H7V16H17Z"></path>
      <path
        d="M20 4H4C2.896 4 2 4.896 2 6V18C2 19.104 2.896 20 4 20H20C21.104 20 22 19.104 22 18V6C22 4.896 21.104 4 20 4ZM4 6V18H20V6H4Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default ITimeline;

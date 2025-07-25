import HelixPalette from "../../../styles/palette";

export const IProgress = ({
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
      <path d="M6 10H18L14 14H6V10Z"></path>
      <path
        d="M20 6H4C2.896 6 2 6.896 2 8V16C2 17.104 2.896 18 4 18H20C21.104 18 22 17.104 22 16V8C22 6.896 21.104 6 20 6ZM4 16H20V8H4V16Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IProgress;

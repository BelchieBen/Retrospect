import HelixPalette from "../../../styles/palette";

export const IPlaceMiddle = ({
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
      <path d="M3 7.00002H11V4.99902H3V7.00002Z"></path>
      <path d="M21.0005 15.0008L17.0005 11.9998L21.0005 8.99982V15.0008Z"></path>
      <path d="M15 13H3V11H15V13Z"></path>
      <path d="M11 19H3V17H11V19Z"></path>
    </svg>
  );
};

export default IPlaceMiddle;

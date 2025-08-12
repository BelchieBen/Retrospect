import HelixPalette from "~/styles/palette";

export const IPlaceTop = ({
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
      <path d="M17 6.00082L21 2.99982V8.99982L17 6.00082Z"></path>
      <path d="M15 7.00002H3V4.99902H15V7.00002Z"></path>
      <path d="M3 13H11V11H3V13Z"></path>
      <path d="M11 19H3V17H11V19Z"></path>
    </svg>
  );
};

export default IPlaceTop;

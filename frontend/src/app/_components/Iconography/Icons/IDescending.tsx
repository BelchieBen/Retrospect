import HelixPalette from "~/styles/palette";

export const IDescending = ({
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
      <path d="M11 7.00002H21V4.99902H11V7.00002Z"></path>
      <path d="M11 15H17V13H11V15Z"></path>
      <path d="M19 11H11V9H19V11Z"></path>
      <path d="M11 19H15V17H11V19Z"></path>
      <path d="M5 15.0006V4.99957H7V15.0006H9.001L6 18.9996L3 15.0006H5Z"></path>
    </svg>
  );
};

export default IDescending;

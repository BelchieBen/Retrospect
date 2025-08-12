import HelixPalette from "~/styles/palette";

export const ILineWeight = ({
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
      <path d="M4 4H20V6H4V4Z"></path>
      <path d="M4 8H20V12H4V8Z"></path>
      <path d="M20 14H4V20H20V14Z"></path>
    </svg>
  );
};

export default ILineWeight;

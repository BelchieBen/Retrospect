import HelixPalette from "../../../styles/palette";

export const ITriangleSide = ({
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
      <path d="M19.7586 9.85243C21.4138 10.8069 21.4138 13.1931 19.7586 14.1476L6.72414 21.6641C5.06897 22.6185 3 21.4255 3 19.5165L3 4.4835C3 2.57455 5.06897 1.38145 6.72414 2.33593L19.7586 9.85243Z"></path>
    </svg>
  );
};

export default ITriangleSide;

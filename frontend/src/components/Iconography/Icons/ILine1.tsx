import HelixPalette from "../../../styles/palette";

export const ILine1 = ({
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
      <path d="M3 12.5C3 12.2239 3.22386 12 3.5 12H20.5C20.7761 12 21 12.2239 21 12.5C21 12.7761 20.7761 13 20.5 13H3.5C3.22386 13 3 12.7761 3 12.5Z"></path>
    </svg>
  );
};

export default ILine1;

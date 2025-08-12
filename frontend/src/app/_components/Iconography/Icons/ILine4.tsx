import HelixPalette from "~/styles/palette";

export const ILine4 = ({
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
      <path d="M3 11C3 10.4477 3.44772 10 4 10H20C20.5523 10 21 10.4477 21 11V13C21 13.5523 20.5523 14 20 14H4C3.44772 14 3 13.5523 3 13V11Z"></path>
    </svg>
  );
};

export default ILine4;

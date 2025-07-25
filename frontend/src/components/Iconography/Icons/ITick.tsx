import HelixPalette from "../../../styles/palette";

export const ITick = ({
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
      <path d="M8.99973 15.8879L19.4995 4.9996L20.9995 6.5556L9 19.0004L3 12.7774L4.5 11.2224L8.99973 15.8879Z"></path>
    </svg>
  );
};

export default ITick;

import HelixPalette from "~/styles/palette";

export const ILineDiagonal = ({
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
      <path d="M3.70696 20.6776C3.31643 20.2871 3.31643 19.654 3.70696 19.2634L19.2633 3.70708C19.6538 3.31655 20.287 3.31655 20.6775 3.70708C21.068 4.0976 21.068 4.73077 20.6775 5.12129L5.12117 20.6776C4.73065 21.0682 4.09748 21.0682 3.70696 20.6776Z"></path>
    </svg>
  );
};

export default ILineDiagonal;

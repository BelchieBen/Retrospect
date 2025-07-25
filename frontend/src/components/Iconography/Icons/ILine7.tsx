import HelixPalette from "../../../styles/palette";

export const ILine7 = ({
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
      <path d="M3 11C3 9.89543 3.89543 9 5 9H19C20.1046 9 21 9.89543 21 11V14C21 15.1046 20.1046 16 19 16H5C3.89543 16 3 15.1046 3 14V11Z"></path>
    </svg>
  );
};

export default ILine7;

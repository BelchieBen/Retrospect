import HelixPalette from "~/styles/palette";

export const ILine5 = ({
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
      <path d="M3 12C3 10.8954 3.89543 10 5 10H19C20.1046 10 21 10.8954 21 12V13C21 14.1046 20.1046 15 19 15H5C3.89543 15 3 14.1046 3 13V12Z"></path>
    </svg>
  );
};

export default ILine5;

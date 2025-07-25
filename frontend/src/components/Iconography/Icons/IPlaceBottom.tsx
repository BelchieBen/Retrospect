import HelixPalette from "../../../styles/palette";

export const IPlaceBottom = ({
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
      <path d="M3 7H11V5H3V7Z"></path>
      <path d="M21.0005 21.0003L17.0005 18.0003L21.0005 14.9993V21.0003Z"></path>
      <path d="M15 19H3V17H15V19Z"></path>
      <path d="M11 13H3V11H11V13Z"></path>
    </svg>
  );
};

export default IPlaceBottom;

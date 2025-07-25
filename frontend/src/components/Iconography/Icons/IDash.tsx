import HelixPalette from "../../../styles/palette";

export const IDash = ({
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
      <path d="M7 13H17V11H7V13Z" clipRule="evenodd" fillRule="evenodd"></path>
    </svg>
  );
};

export default IDash;

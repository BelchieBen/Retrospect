import HelixPalette from "~/styles/palette";

export const IText = ({
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
      <path d="M4 5V7.001H8V19H9.999V7.001H14V5H4Z"></path>
      <path d="M14 12.3333V11H20V12.3333H17.6667V19H16.3333V12.3333H14Z"></path>
    </svg>
  );
};

export default IText;

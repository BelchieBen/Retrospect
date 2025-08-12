import HelixPalette from "~/styles/palette";

export const ITextSize = ({
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
      <path d="M3.99951 8.00079L6.99951 3.99979L10.0005 8.00079H7.99951V16.0008H10.0005L6.99951 19.9998L3.99951 16.0008H5.99951V8.00079H3.99951Z"></path>
      <path d="M11 7.00069V4.99969H21V7.00069H16.999V18.9997H15V7.00069H11Z"></path>
    </svg>
  );
};

export default ITextSize;

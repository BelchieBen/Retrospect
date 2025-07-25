import HelixPalette from "../../../styles/palette";

export const IFirst = ({
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
      <path d="M8 7C8.55228 7 9 7.44772 9 8V16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16V8C7 7.44772 7.44772 7 8 7Z"></path>
      <path d="M15.3867 7.20996C15.779 6.90494 16.3465 6.93248 16.707 7.29297L16.79 7.38672C17.0951 7.77901 17.0675 8.34655 16.707 8.70703L13.415 12L16.707 15.293L16.79 15.3867C17.0951 15.779 17.0675 16.3465 16.707 16.707C16.3165 17.0976 15.6835 17.0976 15.293 16.707L11.293 12.707L11.21 12.6133C10.9049 12.221 10.9325 11.6535 11.293 11.293L15.293 7.29297L15.3867 7.20996Z"></path>
    </svg>
  );
};

export default IFirst;
